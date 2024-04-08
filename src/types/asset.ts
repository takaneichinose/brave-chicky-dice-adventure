import { Euler, Vector3 } from 'three';

export type AssetType = {
  bush: string;
  chicky: string;
  dice: string;
  ghost: string;
  grass: string;
  stage: string;
  stone: string;
  tree: string;
  tree2: string;
};

export type Position = {
  position: Vector3;
  rotation: Euler;
};

export type MinMax = {
  min: number;
  max: number;
};
