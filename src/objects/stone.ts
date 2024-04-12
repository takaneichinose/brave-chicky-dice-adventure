import { Object3D, Object3DEventMap } from 'three';
import { degToRad, randFloat } from 'three/src/math/MathUtils.js';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';

export type StoneSettings = {
  count: number;
  x: {
    min: number;
    max: number;
  };
  z: {
    min: number;
    max: number;
  };
};

export const stoneSettings: StoneSettings = {
  count: 4,
  x: {
    min: -5,
    max: 5,
  },
  z: {
    min: -4.5,
    max: -0.75,
  },
};

export const stone: Object3D<Object3DEventMap>[] = [];

export const createStone = (): void => {
  if (modelData.stone === null) {
    throw new Error('Object cannot be null');
  }

  const tmpStone: Object3D<Object3DEventMap> =
    modelData.stone.scene.clone(true);
  stone.push(tmpStone);

  modelsGroup.add(tmpStone);

  tmpStone.position.set(
    randFloat(stoneSettings.x.min, stoneSettings.x.max),
    0,
    randFloat(stoneSettings.z.min, stoneSettings.z.max),
  );
  tmpStone.rotation.set(0, randFloat(degToRad(0), degToRad(360)), 0);
};
