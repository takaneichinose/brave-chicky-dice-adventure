import { GLTF } from 'three/examples/jsm/Addons.js';

export type Models = {
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

export type ModelData = {
  bush: GLTF | null;
  chicky: GLTF | null;
  dice: GLTF | null;
  ghost: GLTF | null;
  grass: GLTF | null;
  stage: GLTF | null;
  stone: GLTF | null;
  tree: GLTF | null;
  tree2: GLTF | null;
};
