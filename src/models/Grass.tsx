import { Gltf, useGLTF } from '@react-three/drei';

import { Euler, Vector3 } from 'three';

import { ASSETS } from '@/constants/asset';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.grass);

export interface IGrassProps {
  position: Vector3;
  rotation: Euler;
}

export const Grass = ({ position, rotation }: IGrassProps) => {
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