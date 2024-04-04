import { Gltf, useGLTF } from '@react-three/drei';

import { ASSETS } from '@/constants/asset';
import { STAGE_SCALE } from '@/constants/settings';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.stage);

export const Stage = () => {
  return <Gltf src={model} scale={STAGE_SCALE} castShadow receiveShadow />;
};

useGLTF.preload(model);
