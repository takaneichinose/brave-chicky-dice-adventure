import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as LightingSettings from '../Constants/LightingSettings';
import * as RendererSettings from '../Constants/RendererSettings';
import {
  camera,
  canvas,
  renderer,
  scene,
  setCanvas,
  setControls,
  setRenderer,
} from './Game';

// TODO: Delete the ambient light. I might not need this anymore
/**
 * This will add the lighting to the scene
 */
export function createLighting(): void {
  const { color: ambientColor, intensity: ambientIntensity } =
    LightingSettings.Ambient;
  const {
    color: directionalColor,
    intensity: directionalIntensity,
    x: directionalX,
    y: directionalY,
    z: directionalZ,
    castShadow,
    Shadow,
  } = LightingSettings.Directional;

  const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
  const directionalLight = new THREE.DirectionalLight(
    directionalColor,
    directionalIntensity,
  );

  directionalLight.position.set(directionalX, directionalY, directionalZ);
  directionalLight.castShadow = castShadow;
  directionalLight.shadow.camera.near = Shadow.Camera.near;
  directionalLight.shadow.camera.far = Shadow.Camera.far;
  directionalLight.shadow.bias = Shadow.bias;

  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(directionalLight.target);
}

/**
 * This will set the value of the renderer
 */
export function createRenderer(): void {
  setRenderer(
    new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: RendererSettings.antialias,
      alpha: RendererSettings.alpha,
    }),
  );

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = RendererSettings.ShadowMap.enabled;
  renderer.shadowMap.type = RendererSettings.ShadowMap.type;
}

/**
 * Create the orbit controls
 */
export function createControls(): void {
  setControls(new OrbitControls(camera, canvas));
}

/**
 * Create the canvas element
 * @param {string} canvasId ID attribute of the canvas element
 */
export function createCanvas(canvasId: string): void {
  const tmpCanvas: HTMLCanvasElement | null = document.getElementById(
    canvasId,
  ) as HTMLCanvasElement | null;

  if (tmpCanvas == null) {
    throw new Error(`Canvas ${canvasId} is not existing`);
  }

  setCanvas(tmpCanvas);
}
