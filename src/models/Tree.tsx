import { Euler } from 'three';

import { Gltf, useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';

import { ASSETS } from '@/constants/asset';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.tree);

type TreeProps = {
  position: Vector3;
  rotation: Euler;
};

export const Tree = ({ position, rotation }: TreeProps) => {
  return (
    <Gltf
      src={model}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
};

useGLTF.preload(model);
