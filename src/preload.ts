import { GLTF } from 'three/examples/jsm/Addons.js';

import { labels } from '@/constants/labels';
import { modelList, modelsExt, modelsPath } from '@/constants/models';
import { modelData } from '@/storage/models';
import { loadModel } from '@/utils/models';

const preloadWindow: HTMLDivElement = document.querySelector(
  '#preload_window',
) as HTMLDivElement;

/**
 * Creates the elements for the preload then add to the DOM
 * @returns {HTMLSpanElement} Preload span element for the loaded value
 */
const createPreloadElement = (): HTMLSpanElement => {
  preloadWindow.className =
    'bg-pico-1 size-full center-element absolute-top-left';

  const preloadContainer: HTMLDivElement = document.createElement('div');
  preloadContainer.className = 'text-common';

  const loadingLabel: HTMLSpanElement = document.createElement('span');
  loadingLabel.innerText = labels.en.preload.loading + ' ';

  const loading: HTMLSpanElement = document.createElement('span');

  preloadContainer.append(loadingLabel, loading);

  preloadWindow.append(preloadContainer);

  return loading;
};

/**
 * Preloading all the assets then add those to the storage
 */
export const preload = async (): Promise<void> => {
  const text = createPreloadElement();
  const total: number = Object.keys(modelList).length;

  let progress: number = 0;

  try {
    for (const key in modelList) {
      const model: string = (modelList as Record<string, string>)[key];
      const gtlf: GLTF = await loadModel(`${modelsPath}/${model}.${modelsExt}`);

      (modelData as Record<string, GLTF>)[model] = gtlf;

      progress++;

      text.innerText = (
        Math.round((progress / total) * 10000) / 100
      ).toString();
    }

    preloadWindow.classList.add(
      'opacity-0',
      'transition-opacity',
      'duration-500',
      'ease-out',
    );
  } catch (ex) {
    console.error(ex);
  }
};

preloadWindow.addEventListener('transitionend', (): void => {
  preloadWindow.remove();
});
