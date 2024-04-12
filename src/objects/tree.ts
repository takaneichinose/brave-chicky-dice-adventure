import { Object3D, Object3DEventMap } from 'three';
import { degToRad, randFloat } from 'three/src/math/MathUtils.js';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';

export type TreeSettings = {
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

export const treeSettings: TreeSettings = {
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

export const tree: Object3D<Object3DEventMap>[] = [];

export const createTree = (): void => {
  if (modelData.tree === null) {
    throw new Error('Object cannot be null');
  }

  const tmpTree: Object3D<Object3DEventMap> = modelData.tree.scene.clone(true);
  tree.push(tmpTree);

  modelsGroup.add(tmpTree);

  tmpTree.position.set(
    randFloat(treeSettings.x.min, treeSettings.x.max),
    0,
    randFloat(treeSettings.z.min, treeSettings.z.max),
  );
  tmpTree.rotation.set(0, randFloat(degToRad(0), degToRad(360)), 0);
};
