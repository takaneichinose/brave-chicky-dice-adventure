import { Object3D, Object3DEventMap } from 'three';
import { degToRad, randFloat } from 'three/src/math/MathUtils.js';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';

export type GrassSettings = {
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

export const grassSettings: GrassSettings = {
  count: 200,
  x: {
    min: -4.5,
    max: 4.5,
  },
  z: {
    min: -3.5,
    max: 1.75,
  },
};

export const grass: Object3D<Object3DEventMap>[] = [];

export const createGrass = (): void => {
  if (modelData.grass === null) {
    throw new Error('Object cannot be null');
  }

  const tmpGrass: Object3D<Object3DEventMap> =
    modelData.grass.scene.clone(true);
  grass.push(tmpGrass);

  modelsGroup.add(tmpGrass);

  tmpGrass.position.set(
    randFloat(grassSettings.x.min, grassSettings.x.max),
    0,
    randFloat(grassSettings.z.min, grassSettings.z.max),
  );
  tmpGrass.rotation.set(0, randFloat(degToRad(0), degToRad(360)), 0);
};
