import { create, initialize, update } from '@/game';
import { preload } from '@/preload';

import '@/style.css';

(async (): Promise<void> => {
  initialize();

  await preload();

  create();
  update();
})();
