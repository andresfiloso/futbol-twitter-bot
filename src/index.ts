import { processLiveEvents } from './jobs/process-live-events';
import { bootstrap } from './bootstrap';

(async () => {
  await bootstrap();
  processLiveEvents({ league_name: 'Primera Nacional' });
})();
