import React, { useState } from 'react';

import { randInt } from 'three/src/math/MathUtils.js';

import { Canvas } from '@react-three/fiber';

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
  STARTING_FLOOR,
  DEFAULT_ENEMY_HP,
  DEFAULT_PLAYER_HP,
  DICE_MIN_VALUE,
  DICE_MAX_VALUE,
} from '@/constants/settings';
import { useAddObjects } from '@/hooks/useAddObjects';
import { Chicky } from '@/models/Chicky';
import { Bush } from '@/models/Bush';
import { Dice } from '@/models/Dice';
import { Ghost } from '@/models/Ghost';
import { Grass } from '@/models/Grass';
import { Tree } from '@/models/Tree';
import { Tree2 } from '@/models/Tree2';
import { Stage } from '@/models/Stage';
import { Stone } from '@/models/Stone';
import { Position } from '@/types/asset';

import CommandWindow from '@/components/CommandWindow';
import DiceWindow from '@/components/DiceWindow';
import Hud from '@/components/Hud';
import Scene from '@/components/Scene';
import Screen from '@/components/Screen';
import Preload from '@/pages/Preload';

const BraveChickyDiceAdventure = () => {
  const [playerHP, setPlayerHP] = useState<number>(DEFAULT_PLAYER_HP);
  const [enemyHP, setEnemyHP] = useState<number>(DEFAULT_ENEMY_HP);
  const [floor, setFloor] = useState<number>(STARTING_FLOOR);
  const [diceWindowShown, setDiceWindowShown] = useState<boolean>(true);
  const [diceValue, setDiceValue] = useState<number | undefined>();
  const [commandWindowShown, setCommandWindowShown] = useState<boolean>(false);

  const tree1List: Array<Position> = useAddObjects({
    count: TREE1_COUNT,
    objectX: TREES_X,
    objectZ: TREES_Z,
  });
  const tree2List: Array<Position> = useAddObjects({
    count: TREE2_COUNT,
    objectX: TREES_X,
    objectZ: TREES_Z,
  });
  const bushList: Array<Position> = useAddObjects({
    count: BUSH_COUNT,
    objectX: BUSH_X,
    objectZ: BUSH_Z,
  });
  const grassList: Array<Position> = useAddObjects({
    count: GRASS_COUNT,
    objectX: GRASS_X,
    objectZ: GRASS_Z,
  });
  const stoneList: Array<Position> = useAddObjects({
    count: STONE_COUNT,
    objectX: STONE_X,
    objectZ: STONE_Z,
  });

  const handleOnDiceRoll = () => {
    setDiceWindowShown(false);

    const diceValue = randInt(DICE_MIN_VALUE, DICE_MAX_VALUE);

    setDiceValue(diceValue);
  };

  const handleDiceRollEndEvent = () => {
    setCommandWindowShown(true);
  };

  const handleDoCommand = (command: string) => {
    console.log(command);
  };

  return (
    <Screen>
      <React.Suspense fallback={<Preload />}>
        <Scene>
          <Canvas shadows camera={CAMERA}>
            <ambientLight intensity={AMBIENT_INTENSITY} />
            <directionalLight
              color={DIRECTIONAL_COLOR}
              position={DIRECTIONAL_LIGHT}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-normalBias={0.1}
            />
            <group position={MODEL_GROUP_SETTINGS.position}>
              {tree1List.map((setting: Position, index) => (
                <Tree
                  position={setting.position}
                  rotation={setting.rotation}
                  key={index}
                />
              ))}
              {tree2List.map((setting: Position, index) => (
                <Tree2
                  position={setting.position}
                  rotation={setting.rotation}
                  key={index}
                />
              ))}
              {bushList.map((setting: Position, index) => (
                <Bush
                  position={setting.position}
                  rotation={setting.rotation}
                  key={index}
                />
              ))}
              {grassList.map((setting: Position, index) => (
                <Grass
                  position={setting.position}
                  rotation={setting.rotation}
                  key={index}
                />
              ))}
              {stoneList.map((setting: Position, index) => (
                <Stone
                  position={setting.position}
                  rotation={setting.rotation}
                  key={index}
                />
              ))}
              <Stage />
              <Chicky />
              <Ghost />
              <Dice value={diceValue} onRollEnd={handleDiceRollEndEvent} />
            </group>
            <fog attach="fog" color={FOG_COLOR} near={FOG_NEAR} far={FOG_FAR} />
          </Canvas>
          <Hud playerHP={playerHP} enemyHP={enemyHP} floor={floor} />
          <DiceWindow shown={diceWindowShown} onDiceRoll={handleOnDiceRoll} />
          <CommandWindow
            shown={commandWindowShown}
            value={diceValue}
            doCommand={handleDoCommand}
          />
        </Scene>
      </React.Suspense>
    </Screen>
  );
};

export default BraveChickyDiceAdventure;
