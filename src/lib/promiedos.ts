import {
  PromiedosGameCenterResponse,
  PromiedosTodayGamesResponse,
} from '../types/promiedos';

export const promiedosApiClient = (baseUrl: string) => {
  return {
    getTodayGames: async (): Promise<PromiedosTodayGamesResponse> => {
      const response = await fetch(`${baseUrl}/games/today`);
      const data = await response.json();
      return data;
    },
    getGameCenter: async (
      gameId: string
    ): Promise<PromiedosGameCenterResponse> => {
      const response = await fetch(`${baseUrl}/gamecenter/${gameId}`);
      const data = await response.json();
      return data;
    },
  };
};
