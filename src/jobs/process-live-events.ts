import { readJsonFile, writeObjectToFile } from '../lib/file';
import { upsertLiveEvent } from '../services/live-event';
import { getLiveEvents } from '../services/promiedos';
import { createTweet, generateTweetContent } from '../services/twitter';

interface GetLiveEventsProps {
  league_name?: string;
}

export const processLiveEvents = async ({
  league_name,
}: GetLiveEventsProps = {}) => {
  const liveEvents = await getLiveEvents({ league_name });

  if (!liveEvents.length) {
    console.log('No live events found');
    return;
  }

  const upsertedLiveEvents = await Promise.all(
    liveEvents.map((liveEvent) => upsertLiveEvent(liveEvent))
  );

  const newLiveEvents = upsertedLiveEvents.filter(
    (liveEvent) => liveEvent.inserted
  );

  if (!newLiveEvents.length) {
    console.log('No new live events found');
    return;
  }

  for (const liveEvent of newLiveEvents) {
    createTweet(generateTweetContent(liveEvent.liveEvent));
  }
};
