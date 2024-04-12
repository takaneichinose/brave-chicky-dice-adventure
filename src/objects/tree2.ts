import { Object3D, Object3DEventMap } from 'three';
import { degToRad, randFloat } from 'three/src/math/MathUtils.js';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';

export type Tree2Settings = {
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

export const tree2Settings: Tree2Settings = {
  count: 8,
  x: {
    min: -5,
    max: 5,
  },
  z: {
    min: -4.5,
    max: -0.75,
  },
};

export const tree2: Object3D<Object3DEventMap>[] = [];

export const createTree2 = (): void => {
  if (modelData.tree2 === null) {
    throw new Error('Object cannot be null');
  }

  const tmpTree2: Object3D<Object3DEventMap> =
    modelData.tree2.scene.clone(true);
  tree2.push(tmpTree2);

  modelsGroup.add(tmpTree2);

  tmpTree2.position.set(
    randFloat(tree2Settings.x.min, tree2Settings.x.max),
    0,
    randFloat(tree2Settings.z.min, tree2Settings.z.max),
  );
  tmpTree2.rotation.set(0, randFloat(degToRad(0), degToRad(360)), 0);
};
