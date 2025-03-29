import { connectToMongoDB } from './lib/db';
import { ENV } from './lib/env';

export const bootstrap = async () => {
  console.log('Bootstrapping');
  console.log('X_ENABLED', ENV.X_ENABLED);

  await connectToMongoDB();
};
