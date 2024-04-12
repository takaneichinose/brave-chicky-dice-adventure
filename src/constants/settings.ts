import { PCFShadowMap, Vector2, Vector3 } from 'three';

import {
  AmbientLightSettings,
  CameraSettings,
  DirectionalLightSettings,
  FogSettings,
  ModelsGroupSettings,
  RendererSettings,
} from '@/types/settings';

export const fps: number = 1000 / 60;

export const cameraSetings: CameraSettings = {
  fov: 75,
  near: 0.1,
  far: 10,
  position: new Vector3(0, 0.15, 1.75),
};

export const rendererSettings: RendererSettings = {
  antialias: false,
  alpha: true,
  shadowMap: {
    enabled: true,
    type: PCFShadowMap,
  },
};

export const directionalLightSettings: DirectionalLightSettings = {
  color: 0xffffff,
  intensity: 1,
  position: new Vector3(-3, 4, 3),
  castShadow: true,
  shadow: {
    bias: -0.004,
    mapSize: new Vector2(1024, 1024),
    camera: {
      near: 0.1,
      far: 10,
    },
  },
};

export const ambientLightSettings: AmbientLightSettings = {
  color: 0xffffff,
  intensity: 0.5,
};

export const fogSettings: FogSettings = {
  color: 0x065ab5,
  near: 3,
  far: 5,
};

export const modelsGroupSettings: ModelsGroupSettings = {
  position: new Vector3(0, -0.5, 0),
};

export const defaultPlayerHp: number = 50;

export const defaultComputerHp: number = 10;

export const computerHpIterationPerFloor: number = 5;
