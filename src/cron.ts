import { CronJob } from 'cron';
import { ENV } from './lib/env';
import { processLiveEvents } from './jobs/process-live-events';

console.log('CRON IS UP', ENV.CRON_SCHEDULE);
console.log('X_ENABLED', ENV.X_ENABLED);

const job = new CronJob(
  ENV.CRON_SCHEDULE,
  () => {
    console.log('STARTING CRON JOB');
    processLiveEvents({ league_name: 'Liga Profesional Argentina' });
  },
  null,
  false,
  'America/Argentina/Buenos_Aires'
);

job.start();
