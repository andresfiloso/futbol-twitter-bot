import { LiveEventModel } from '../models/event';
import { LiveEvent } from './promiedos';

type UpsertLiveEventResult = {
  inserted: boolean;
  updated: boolean;
  liveEvent: LiveEvent;
};

export const upsertLiveEvent = async (
  liveEvent: LiveEvent
): Promise<UpsertLiveEventResult> => {
  const result = await LiveEventModel.findOneAndUpdate(
    { key: liveEvent.key },
    { $set: liveEvent },
    { upsert: true, new: false }
  );

  if (!result) {
    console.log('Inserted new live-event');
    return { inserted: true, updated: false, liveEvent };
  } else {
    return { inserted: false, updated: true, liveEvent };
  }
};
