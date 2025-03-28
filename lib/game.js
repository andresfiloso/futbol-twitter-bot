import { GAME_STATUS } from "./constants.js";

export const isLiveGame = game => game.status.name === GAME_STATUS.FIRST_HALF.NAME || game.status.name === GAME_STATUS.SECOND_HALF.NAME || game.status.name === GAME_STATUS.HALF_TIME.NAME
