import { Euler, Vector3 } from 'three';

export interface IAssetData {
  name: string;
  model: string;
}

export interface IAsset {
  bush: string;
  chicky: string;
  ghost: string;
  grass: string;
  stage: string;
  stone: string;
  tree: string;
  tree2: string;
}

export interface ISettings {
  position: Vector3;
  rotation: Euler;
}

export interface IMinMax {
  min: number;
  max: number;
}
