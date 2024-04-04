import { Euler, Vector3 } from 'three';

import { degToRad } from 'three/src/math/MathUtils.js';

import { Camera } from '@react-three/fiber';
import { IAnimation } from '@/utils/character';
import { IMinMax, ISettings } from '@/types/asset';

export const CAMERA = {
  near: 0.1,
  far: 10,
  position: new Vector3(0, 0.15, 1.75),
} as Camera;

export const AMBIENT_INTENSITY = 1;

export const DIRECTIONAL_COLOR = 0xffffff;

export const DIRECTIONAL_LIGHT = new Vector3(-3, 4, 3);

export const FOG_COLOR = 0xffffff;

export const FOG_NEAR = 3;

export const FOG_FAR = 5;

export const MODEL_GROUP_SETTINGS: ISettings = {
  position: new Vector3(0, -0.5, 0),
  rotation: new Euler(0, 0, 0),
};

export const STAGE_SCALE = new Vector3(4, 1, 4);

// Trees

export const TREES_X: IMinMax = {
  min: -5,
  max: 5,
};

export const TREES_Z: IMinMax = {
  min: -4.5,
  max: -0.75,
};

export const TREE1_COUNT: number = 8;

export const TREE2_COUNT: number = 8;

// Bush

export const BUSH_X: IMinMax = {
  min: -5,
  max: 5,
};

export const BUSH_Z: IMinMax = {
  min: -4.5,
  max: -0.75,
};

export const BUSH_COUNT: number = 4;

// Grass

export const GRASS_X: IMinMax = {
  min: -5,
  max: 5,
};

export const GRASS_Z: IMinMax = {
  min: -4.5,
  max: 0.75,
};

export const GRASS_COUNT: number = 150;

// Stone

export const STONE_X: IMinMax = {
  min: -5,
  max: 5,
};

export const STONE_Z: IMinMax = {
  min: -4.5,
  max: -0.75,
};

export const STONE_COUNT: number = 4;

// Actors

export const CHICKY_SETTINGS: ISettings = {
  position: new Vector3(-1.25, 0, 0),
  rotation: new Euler(0, degToRad(90), 0),
};

export const GHOST_SETTINGS: ISettings = {
  position: new Vector3(1.25, 0, 0),
  rotation: new Euler(0, degToRad(-90), 0),
};

export const CHARACTER_ANIMATION: IAnimation = {
  Attack: 'Attack',
  Guard: 'Guard',
  Idle: 'Idle',
  Walk: 'Walk',
};
