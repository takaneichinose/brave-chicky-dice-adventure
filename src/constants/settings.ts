import { Euler, LoopOnce, LoopRepeat, Vector3 } from 'three';

import { degToRad } from 'three/src/math/MathUtils.js';

import { Camera } from '@react-three/fiber';
import { Animation, AnimationLoop } from '@/types/actor';
import { MinMax, Position } from '@/types/asset';
import { Command } from '@/enums/game';

//#region ThreeJS Settings

export const CAMERA = {
  near: 0.1,
  far: 10,
  position: new Vector3(0, 0.15, 1.75),
} as Camera;

export const AMBIENT_INTENSITY = 1;

export const DIRECTIONAL_COLOR = 0xffffff;

export const DIRECTIONAL_LIGHT = new Vector3(-3, 4, 3);

export const FOG_COLOR = 0x065ab5;

export const FOG_NEAR = 3;

export const FOG_FAR = 5;

//#endregion

//#region Game Settings

export const DEFAULT_PLAYER_HP = 50;

export const DEFAULT_ENEMY_HP = 10;

export const STARTING_FLOOR = 1;

export const MODEL_GROUP_SETTINGS: Position = {
  position: new Vector3(0, -0.5, 0),
  rotation: new Euler(0, 0, 0),
};

export const STAGE_SCALE = new Vector3(4, 1, 4);

export const DICE_MIN_VALUE = 1;

export const DICE_MAX_VALUE = 6;

export const COMMAND_LIST = [
  Command.Skip,
  Command.Defend,
  Command.Attack,
  Command.Heal,
];

export const ABLE_COMMAND = [
  0, // None
  0, // Skip
  2, // Defend
  3, // Attack
  5, // Heal
];

//#endregion

//#region Trees

export const TREES_X: MinMax = {
  min: -5,
  max: 5,
};

export const TREES_Z: MinMax = {
  min: -4.5,
  max: -0.75,
};

export const TREE1_COUNT: number = 8;

export const TREE2_COUNT: number = 8;

//#endregion

//#region Bush

export const BUSH_X: MinMax = {
  min: -5,
  max: 5,
};

export const BUSH_Z: MinMax = {
  min: -4.5,
  max: -0.75,
};

export const BUSH_COUNT: number = 4;

//#endregion

//#region Grass

export const GRASS_X: MinMax = {
  min: -4.5,
  max: 4.5,
};

export const GRASS_Z: MinMax = {
  min: -3.5,
  max: 1.75,
};

export const GRASS_COUNT: number = 200;

//#endregion

//#region Stone

export const STONE_X: MinMax = {
  min: -5,
  max: 5,
};

export const STONE_Z: MinMax = {
  min: -4.5,
  max: -0.75,
};

export const STONE_COUNT: number = 4;

//#endregion

//#region Dice

export const DICE_SETTINGS: Position = {
  position: new Vector3(0, 0, 0),
  rotation: new Euler(0, 0, 0),
};

export const DICE_FADE_TIME = 500;

//#endregion

//#region Actors

export const CHICKY_SETTINGS: Position = {
  position: new Vector3(-1.25, 0, 0),
  rotation: new Euler(0, degToRad(90), 0),
};

export const GHOST_SETTINGS: Position = {
  position: new Vector3(1.25, 0, 0),
  rotation: new Euler(0, degToRad(-90), 0),
};

export const CHARACTER_ANIMATION: Animation = {
  Attack: 'Attack',
  Guard: 'Guard',
  Idle: 'Idle',
  Walk: 'Walk',
  Skip: 'Skip',
  Jump: 'Jump',
  Faint: 'Faint',
};

export const CHARACTER_ANIMATION_LOOP: AnimationLoop = {
  Attack: LoopOnce,
  Guard: LoopOnce,
  Idle: LoopRepeat,
  Walk: LoopRepeat,
  Skip: LoopOnce,
  Jump: LoopOnce,
  Faint: LoopOnce,
};

//#endregion
