import React, { lazy } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import {
  AMBIENT_INTENSITY,
  CAMERA,
  DIRECTIONAL_LIGHT,
  FOG_COLOR,
  FOG_FAR,
  FOG_NEAR,
  DIRECTIONAL_COLOR,
  MODEL_GROUP_SETTINGS,
  TREE1_COUNT,
  TREE2_COUNT,
  GRASS_COUNT,
  TREES_X,
  TREES_Z,
  GRASS_X,
  GRASS_Z,
  BUSH_COUNT,
  BUSH_X,
  BUSH_Z,
  STONE_COUNT,
  STONE_X,
  STONE_Z,
} from '@/constants/settings';
import { useAddObjects } from '@/hooks/useAddObjects';
import { Chicky } from '@/models/Chicky';
import { Bush } from '@/models/Bush';
import { Ghost } from '@/models/Ghost';
import { Grass } from '@/models/Grass';
import { Tree } from '@/models/Tree';
import { Tree2 } from '@/models/Tree2';
import { Stage } from '@/models/Stage';
import { Stone } from '@/models/Stone';
import { ISettings } from '@/types/asset';

const Preload = lazy(() => import('@/pages/Preload'));

const BraveChickyDiceAdventure = () => {
  const tree1List: Array<ISettings> = useAddObjects({
    count: TREE1_COUNT,
    objectX: TREES_X,
    objectZ: TREES_Z,
  });
  const tree2List: Array<ISettings> = useAddObjects({
    count: TREE2_COUNT,
    objectX: TREES_X,
    objectZ: TREES_Z,
  });
  const bushList: Array<ISettings> = useAddObjects({
    count: BUSH_COUNT,
    objectX: BUSH_X,
    objectZ: BUSH_Z,
  });
  const grassList: Array<ISettings> = useAddObjects({
    count: GRASS_COUNT,
    objectX: GRASS_X,
    objectZ: GRASS_Z,
  });
  const stoneList: Array<ISettings> = useAddObjects({
    count: STONE_COUNT,
    objectX: STONE_X,
    objectZ: STONE_Z,
  });

  return (
    <Canvas shadows camera={CAMERA}>
      <React.Suspense fallback={<Preload />}>
        <ambientLight intensity={AMBIENT_INTENSITY} />
        <directionalLight
          color={DIRECTIONAL_COLOR}
          position={DIRECTIONAL_LIGHT}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-normalBias={0.1}
        />
        <group position={MODEL_GROUP_SETTINGS.position}>
          {tree1List.map((setting: ISettings, index) => (
            <Tree
              position={setting.position}
              rotation={setting.rotation}
              key={index}
            />
          ))}
          {tree2List.map((setting: ISettings, index) => (
            <Tree2
              position={setting.position}
              rotation={setting.rotation}
              key={index}
            />
          ))}
          {bushList.map((setting: ISettings, index) => (
            <Bush
              position={setting.position}
              rotation={setting.rotation}
              key={index}
            />
          ))}
          {grassList.map((setting: ISettings, index) => (
            <Grass
              position={setting.position}
              rotation={setting.rotation}
              key={index}
            />
          ))}
          {stoneList.map((setting: ISettings, index) => (
            <Stone
              position={setting.position}
              rotation={setting.rotation}
              key={index}
            />
          ))}
          <Stage />
          <Chicky />
          <Ghost />
        </group>
        <fog attach="fog" color={FOG_COLOR} near={FOG_NEAR} far={FOG_FAR} />
        <OrbitControls />
      </React.Suspense>
    </Canvas>
  );
};

export default BraveChickyDiceAdventure;
