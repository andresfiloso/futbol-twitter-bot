import { EVENT } from '../lib/constants';
import { ENV } from '../lib/env';
import { twitterClient } from '../lib/twitter';
import { LiveEvent } from './promiedos';

export const createTweet = async (text: string) => {
  if (!ENV.X_ENABLED) {
    console.log('Twitter is disabled');
    return;
  }
  const client = twitterClient();
  client.v2.tweet(text);
  console.log('Tweet created > ', text);
};

export const generateTweetContent = ({
  event_type,
  event_texts,
  team1,
  team2,
  event_time,
}: LiveEvent): string => {
  const eventLabel = {
    [EVENT.GOAL.TYPE]: '⚽️ Gol de ',
    [EVENT.YELLOW_CARD.TYPE]: '🟨 Tarjeta Amarilla para ',
    [EVENT.RED_CARD.TYPE]: '🟥 Tarjeta Roja para ',
  };

  const text = `${eventLabel[event_type]}${event_texts[0]} en el partido ${team1} vs ${team2} a los ${event_time}`;
  return text;
};
