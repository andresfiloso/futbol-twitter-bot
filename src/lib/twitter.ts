import { TwitterApi } from 'twitter-api-v2';
import { ENV } from './env';

export const twitterClient = () =>
  new TwitterApi({
    appKey: ENV.X_APP_KEY,
    appSecret: ENV.X_APP_SECRET,
    accessToken: ENV.X_ACCESS_TOKEN,
    accessSecret: ENV.X_ACCESS_SECRET,
  });
