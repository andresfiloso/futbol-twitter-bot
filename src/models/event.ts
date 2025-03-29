import { Schema, model } from 'mongoose';

export type LiveEvent = {
  key: string;
  game_id: string;
  game_url: string;
  team1: string;
  team2: string;
  event_time: string;
  event_type: number;
  event_team_name: string;
  event_team_slug: string;
  event_texts: string[];
  event_player_jersey_num: number;
};

const LiveEventSchema = new Schema({
  key: { type: String, required: true },
  game_id: { type: String, required: true },
  game_url: { type: String },
  team1: { type: String },
  team2: { type: String },
  event_time: { type: String },
  event_type: { type: Number },
  event_team_name: { type: String },
  event_team_slug: { type: String },
  event_texts: { type: [String] },
  event_player_jersey_num: { type: Number },
});

LiveEventSchema.index({ key: 1 }, { unique: true });

export const LiveEventModel = model<LiveEvent>('Buy', LiveEventSchema);
