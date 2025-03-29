import { EVENT, PROMIEDOS_BASE_URL } from '../lib/constants';
import { isLiveGame } from '../lib/game';
import { promiedosApiClient } from '../lib/promiedos';
import { PromiedosStatus } from '../types/promiedos';

const client = promiedosApiClient(PROMIEDOS_BASE_URL);

type GetLiveGamesProps = {
  league_name?: string;
};

export type GetLiveGamesResponse = {
  id: string;
  status: PromiedosStatus;
};

export const getLiveGames = async ({ league_name }: GetLiveGamesProps = {}) => {
  const todayGames = await client.getTodayGames();

  return todayGames.leagues
    .filter((league) => (league_name ? league.name === league_name : true))
    .flatMap((league) =>
      league.games.map(({ id, status }) => ({
        id,
        status,
      }))
    )
    .filter(isLiveGame);
};

type GetLiveEventsProps = {
  league_name?: string;
};

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

export const getLiveEvents = async ({
  league_name,
}: GetLiveEventsProps = {}): Promise<LiveEvent[]> => {
  const liveGames = await getLiveGames({ league_name });

  const liveGameDetails = await Promise.all(
    liveGames.map((game) => client.getGameCenter(game.id))
  );

  const eventTypes = [
    EVENT.GOAL.TYPE,
    EVENT.YELLOW_CARD.TYPE,
    EVENT.RED_CARD.TYPE,
  ];

  return liveGameDetails.flatMap(({ game }) => {
    const teams = game.teams;

    if (!game.events) return [];

    return game.events
      .flatMap((event) => event.rows)
      .flatMap((row) => row.events)
      .filter((event) => eventTypes.includes(event.type))
      .map((event) => {
        const game_id = game.id;
        const game_url = game.url_name;
        const team1 = teams[0].name;
        const team2 = teams[1].name;
        const event_time = event.time;
        const event_type = event.type;
        const event_texts = event.texts;
        const event_team_name =
          event.team === 1 ? teams[0].name : teams[1].name;
        const event_team_slug =
          event.team === 1 ? teams[0].url_name : teams[1].url_name;
        const event_player_jersey_num = event.player_jersey_num;
        const key = `${game_id}-${event_time}-${event_type}-${event_team_slug}-${event.player_jersey_num}`;

        return {
          key,
          game_id,
          game_url,
          team1,
          team2,
          event_time,
          event_type,
          event_team_name,
          event_team_slug,
          event_texts,
          event_player_jersey_num,
        };
      });
  });
};
