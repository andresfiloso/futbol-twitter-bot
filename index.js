import { EVENTS_TYPES, PROMIEDOS_BASE_URL } from "./lib/constants.js";
import { readJsonFile, writeObjectToFile } from "./lib/file.js";
import { isLiveGame } from "./lib/game.js";
import { promiedosApiClient } from "./lib/promiedos.js";
import { twitterClient } from "./lib/twitter.js";

import { CronJob } from 'cron';

const createTweet = async (text) => {
    const client = twitterClient();
    client.v2.tweet(text);
    console.log('Tweet created > ', text);
}



const getLiveEvents = async ({ league_name } = {}) => {

    const alreadyStoredEvents = readJsonFile('./data/live-events/events.json', { defaultValue: {} });

    const client = promiedosApiClient(PROMIEDOS_BASE_URL);
    const todayGames = await client.getTodayGames();


    const todayGamesParsed = todayGames.leagues.filter(league => league_name ? league.name === league_name : true).flatMap(league => league.games.map(({
        id, status,
    }) => ({
        id,
        status
    })))

    const liveGames = todayGamesParsed.filter(isLiveGame);

    if (liveGames.length === 0) {
        console.log('No live games',)
        return;
    }

    console.log('liveGames', liveGames.length);

    const liveGameDetails = await Promise.all(liveGames.map(game => client.getGameCenter(game.id)));

    const eventTypes = [EVENTS_TYPES.GOAL.TYPE, EVENTS_TYPES.YELLOW_CARD.TYPE, EVENTS_TYPES.RED_CARD.TYPE];

    // Process the games array
    const serialized = liveGameDetails.flatMap(({ game }) => {

        const teams = game.teams;

        if (!game.events) return [];

        return game.events
            .flatMap(event => event.rows)  // Flatten all rows from events
            .flatMap(row => row.events)    // Flatten all events within each row
            .filter(event => eventTypes.includes(event.type))  // Filter by event types 1, 4, 5
            .map(event => ({
                id: game.id,
                url: game.url_name,
                team1: teams[0].name,
                team2: teams[1].name,
                event: {
                    time: event.time,
                    type: event.type,
                    team_name: event.team === 1 ? teams[0].name : teams[1].name,
                    team_slug: event.team === 1 ? teams[0].url_name : teams[1].url_name,
                    texts: event.texts,
                    player_jersey_num: event.player_jersey_num
                }
            }));
    });


    const currentEvents = serialized.reduce((acc, event) => {
        const key = `${event.id}-${event.event.time}-${event.event.type}-${event.event.team_slug}-${event.event.player_jersey_num}`;
        acc[key] = event;
        return acc;
    }, {});


    for (const key in currentEvents) {
        if (!alreadyStoredEvents[key]) {
            console.log('NOTIFY NEW EVENT', key);
            // createTweet(buildTweetContent(currentEvents[key]))
        }
    }

    writeObjectToFile('./data/live-events/events.json', currentEvents, { pretty: true });
}

const buildTweetContent = ({ team1, team2, event }) => {

    const { time, type, texts, } = event;

    const eventLabel = {
        [EVENTS_TYPES.GOAL.TYPE]: '⚽️ Gol de ',
        [EVENTS_TYPES.YELLOW_CARD.TYPE]: '🟨 Tarjeta Amarilla para ',
        [EVENTS_TYPES.RED_CARD.TYPE]: '🟥 Tarjeta Roja para '
    }

    const text = `${eventLabel[type]}${texts[0]} en el partido ${team1} vs ${team2} a los ${time} del ${type === EVENTS_TYPES.GOAL.TYPE ? 'primer' : 'segundo'} tiempo.`
    return text;
}

// const CRON_SCHEDULE = '* * * * *';


// new CronJob(
//     CRON_SCHEDULE, // cronTime
//     function () {
//         console.log('You will see this message every', CRON_SCHEDULE);
//         getLiveEvents({ league_name: 'Liga Profesional Argentina' })
//     }, // onTick
//     null, // onComplete
//     true, // start
//     'America/Argentina/Buenos_Aires' // timeZone
// );

getLiveEvents({ league_name: 'Liga Profesional Argentina' })