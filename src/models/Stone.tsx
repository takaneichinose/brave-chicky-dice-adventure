import { Gltf, useGLTF } from '@react-three/drei';

import { Euler, Vector3 } from 'three';

import { ASSETS } from '@/constants/asset';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.stone);

export interface IStoneProps {
  position: Vector3;
  rotation: Euler;
}

export const Stone = ({ position, rotation }: IStoneProps) => {
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
