import { MODEL_EXT, MODELS_PATH } from '@/constants/asset';

/**
 * Get the full path of the model.
 * @param {string} assetName Name of the model
 * @returns {string} Full path of the model
 */
export const getModelPath = (assetName: string): string => {
  return `${MODELS_PATH}/${assetName}.${MODEL_EXT}`;
};
