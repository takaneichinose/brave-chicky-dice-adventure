import { ShadowMapType, Vector2, Vector3 } from 'three';

export type CameraSettings = {
  fov: number;
  near: number;
  far: number;
  position: Vector3;
};

export type RendererSettings = {
  antialias: boolean;
  alpha: boolean;
  shadowMap: {
    enabled: boolean;
    type: ShadowMapType;
  };
};

export type DirectionalLightSettings = {
  color: number;
  intensity: number;
  position: Vector3;
  castShadow: boolean;
  shadow: {
    bias: number;
    mapSize: Vector2;
    camera: {
      near: number;
      far: number;
    };
  };
};

export type AmbientLightSettings = {
  color: number;
  intensity: number;
};

export type FogSettings = {
  color: number;
  near: number;
  far: number;
};

export type ModelsGroupSettings = {
  position: Vector3;
};
