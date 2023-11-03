import {
  finishedEventName,
  progressEventName,
  startEventName,
} from '../Constants/Events';

import { emit } from './Events';
import { loadModel } from './Models';

/**
 * Preload all the assets in the list
 * @param {Record<string,string>[]} assets List of assets
 */
export async function preload(assets: Record<string, string>[]): Promise<void> {
  emit(startEventName, {
    count: assets.length,
  });

  let index = 0;

  for (const asset of assets) {
    await loadModel(asset.path);

    index++;

    emit(progressEventName, {
      loaded: index,
    });
  }

  emit(finishedEventName, {
    count: assets.length,
  });
}
