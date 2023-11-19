import {
  finishedEventName,
  progressEventName,
  startEventName,
} from '../Constants/Events';
import { ModelData } from '../Types/Models';

import { emit } from './Events';
import { setModels } from './Game';
import { loadModel } from './Models';

/**
 * Preload all the assets in the list
 * @param {Record<string,string>[]} assets List of assets
 */
export async function preload(assets: Record<string, string>[]): Promise<void> {
  const models: Record<string, ModelData> = {};

  emit(startEventName, {
    count: assets.length,
  });

  let index = 0;

  for (const asset of assets) {
    models[asset.name] = await loadModel(asset.path);

    index++;

    emit(progressEventName, {
      loaded: index,
    });
  }

  setModels(models);

  emit(finishedEventName, {
    count: assets.length,
  });
}
