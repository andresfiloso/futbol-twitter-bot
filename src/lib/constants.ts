export const PROMIEDOS_BASE_URL = 'https://api.promiedos.com.ar';

export const GAME_STATUS = {
  SCHEDULED: {
    ENUM: 1,
    NAME: 'Prog.',
  },
  FIRST_HALF: {
    ENUM: 2,
    NAME: 'Primer Tiempo',
  },
  HALF_TIME: {
    ENUM: 2,
    NAME: 'Entretiempo',
  },
  SECOND_HALF: {
    ENUM: 2,
    NAME: 'Segundo Tiempo',
  },
  FINISHED: {
    ENUM: 3,
    NAME: 'Finalizado',
  },
};

export const EVENT = {
  GOAL: {
    TYPE: 1,
    NAME: 'Gol',
  },
  GOAL_OWN: {
    TYPE: 2,
    NAME: 'Gol en contra',
  },
  YELLOW_CARD: {
    TYPE: 4,
    NAME: 'Tarjeta Amarilla',
  },
  RED_CARD: {
    TYPE: 6,
    NAME: 'Tarjeta Roja',
  },
};
