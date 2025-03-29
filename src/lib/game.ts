import { PromiedosStatus } from '../types/promiedos.js';
import { GAME_STATUS } from './constants.js';

export const isLiveGame = ({ status }: { status: PromiedosStatus }) =>
  status.name === GAME_STATUS.FIRST_HALF.NAME ||
  status.name === GAME_STATUS.SECOND_HALF.NAME ||
  status.name === GAME_STATUS.HALF_TIME.NAME;
