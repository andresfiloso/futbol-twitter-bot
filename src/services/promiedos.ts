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
  id: string;
  url: string;
  team1: string;
  team2: string;
  event_time: string;
  event_type: number;
  event_team_name: string;
  event_team_slug: string;
  event_player_jersey_num: number;
  event_texts: string[];
};

export const getLiveEvents = async ({
  league_name,
}: GetLiveEventsProps = {}): Promise<Record<string, LiveEvent>> => {
  const liveGames = await getLiveGames({ league_name });

  const liveGameDetails = await Promise.all(
    liveGames.map((game) => client.getGameCenter(game.id))
  );

  const eventTypes = [
    EVENT.GOAL.TYPE,
    EVENT.YELLOW_CARD.TYPE,
    EVENT.RED_CARD.TYPE,
  ];

  return liveGameDetails
    .flatMap(({ game }) => {
      const teams = game.teams;

      if (!game.events) return [];

      return game.events
        .flatMap((event) => event.rows)
        .flatMap((row) => row.events)
        .filter((event) => eventTypes.includes(event.type))
        .map((event) => ({
          id: game.id,
          url: game.url_name,
          team1: teams[0].name,
          team2: teams[1].name,
          event_time: event.time,
          event_type: event.type,
          event_team_name: event.team === 1 ? teams[0].name : teams[1].name,
          event_team_slug:
            event.team === 1 ? teams[0].url_name : teams[1].url_name,
          event_texts: event.texts,
          event_player_jersey_num: event.player_jersey_num,
        }));
    })
    .reduce((acc: Record<string, LiveEvent>, event) => {
      const key = `${event.id}-${event.event_time}-${event.event_type}-${event.event_team_slug}-${event.event_player_jersey_num}`;
      acc[key] = event;
      return acc;
    }, {});
};
