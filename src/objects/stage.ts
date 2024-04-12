import { Object3D, Object3DEventMap, Vector3 } from 'three';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';

export type StageSettings = {
  scale: Vector3;
};

export const settings: StageSettings = {
  scale: new Vector3(4, 1, 4),
};

export let stage: Object3D<Object3DEventMap> | null = null;

export const createStage = (): void => {
  if (modelData.stage === null) {
    throw new Error('Object cannot be null');
  }

  stage = modelData.stage.scene;

  modelsGroup.add(stage);

  stage.scale.set(settings.scale.x, settings.scale.y, settings.scale.z);
};
