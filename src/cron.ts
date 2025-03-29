import { CronJob } from 'cron';
import { ENV } from './lib/env';
import { processLiveEvents } from './jobs/process-live-events';
import { bootstrap } from './bootstrap';

(async () => {
  await bootstrap();

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
  console.log('CRON IS UP', ENV.CRON_SCHEDULE);
})();
