import { readJsonFile, writeObjectToFile } from '../lib/file';
import { getLiveEvents } from '../services/promiedos';
import { createTweet, generateTweetContent } from '../services/twitter';

interface GetLiveEventsProps {
  league_name?: string;
}

export const processLiveEvents = async ({
  league_name,
}: GetLiveEventsProps = {}) => {
  const lastLiveEvents = readJsonFile('./data/live-events/events.json');

  const liveEvents = await getLiveEvents({ league_name });

  // check if the event is already stored
  // if not, create a tweet before storing it
  for (const key in liveEvents) {
    if (!lastLiveEvents[key]) {
      console.log('new event founded', key);
      createTweet(generateTweetContent(liveEvents[key]));
    }
  }

  writeObjectToFile('./data/live-events/events.json', liveEvents, {
    pretty: true,
  });
};
