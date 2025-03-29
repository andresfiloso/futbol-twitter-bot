
export type PromiedosGoal = {
    player_name: string;
    player_sname: string;
    time: number;
    time_to_display: string;
}

export type PromiedosStatus = {
    enum: number;
    name: string;
    short_name: string;
    symbol_name: string;
}

export type PromiedosTvNetwork = {
    id: string;
    name: string;
}

export type PromiedosOdd = {
    name: string;
    value: number;
    trend: number;
}

export type PromiedosTeam = {
    name: string;
    short_name: string;
    url_name: string;
    id: string;
    country_id: string;
    colors: {
        color: string;
        text_color: string;
    }
    red_cards: number;
    goals: PromiedosGoal[];
}


export type PromiedosTodayGame = {
    id: string;
    stage_round_name: string;
    winner: 1 | 2 | -1;
    teams: PromiedosTeam[];
    url_name: string;
    scores: number[];
    status: PromiedosStatus;
    start_time: string;
    game_time: number;
    game_time_to_display: string;
    game_time_status_to_display: string;
    tv_networks: PromiedosTvNetwork[];
    main_odds: {
        options: PromiedosOdd[];
    }
}

export type PromiedosLeague = {
    name: string;
    id: string;
    url_name: string;
    country_name: string;
    games: PromiedosTodayGame[];
}

export type PromiedosTodayGamesResponse = {
    leagues: PromiedosLeague[]
}


export type GameInfo = {
    name: string;
    value: string;
}

export type GameStatistic = {
    name: string;
    values: string[];
    percentages: number[];
}


export type GameEventRowEvent = {
    type: number;
    time: string;
    team: 1 | 2;
    texts: string[];
    player_jersey_num: number;
}

export type GameEventRow = {
    time: string;
    events: GameEventRowEvent[];
}

export type GameEvent = {
    name: string;
    show_stage_title: boolean;
    is_penalties_stage: boolean;
    scores: number[];
    rows: GameEventRow[];
}

export type PromiedosGameCenter = {
    id: string;
    league: PromiedosLeague;
    stage_round_name: string;
    winner: 1 | 2 | -1;
    teams: PromiedosTeam[];
    url_name: string;
    scores: number[];
    status: PromiedosStatus;
    start_time: string;
    game_time: number;
    game_time_to_display: string;
    game_time_status_to_display: string;
    players: any;
    prediction: any;
    live_odds: any;
    game_info: GameInfo[];
    events: GameEvent[];
    statistics: GameStatistic[];
    head_to_head: any;
    recent_form: any;
    standings: any;
}

export type PromiedosGameCenterResponse = {
    TTL: number;
    cache_time: number;
    game: PromiedosGameCenter;
}