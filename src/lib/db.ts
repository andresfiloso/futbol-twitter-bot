import * as mongoose from 'mongoose';
import { ENV } from './env';

export function connectToMongoDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Connecting to MongoDB');
    mongoose
      .connect(ENV.MONGO_URI)
      .then(() => {
        console.log('MongoDB connected');
        resolve();
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        reject(error);
      });
  });
}
