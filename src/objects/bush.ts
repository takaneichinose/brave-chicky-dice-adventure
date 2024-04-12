import { Object3D, Object3DEventMap } from 'three';
import { degToRad, randFloat } from 'three/src/math/MathUtils.js';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';

export type BushSettings = {
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

export const bushSettings: BushSettings = {
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

export const bush: Object3D<Object3DEventMap>[] = [];

export const createBush = (): void => {
  if (modelData.bush === null) {
    throw new Error('Object cannot be null');
  }

  const tmpBush: Object3D<Object3DEventMap> = modelData.bush.scene.clone(true);
  bush.push(tmpBush);

  modelsGroup.add(tmpBush);

  tmpBush.position.set(
    randFloat(bushSettings.x.min, bushSettings.x.max),
    0,
    randFloat(bushSettings.z.min, bushSettings.z.max),
  );
  tmpBush.rotation.set(0, randFloat(degToRad(0), degToRad(360)), 0);
};
