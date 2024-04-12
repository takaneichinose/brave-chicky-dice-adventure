import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Fog,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

import * as TWEEN from '@tweenjs/tween.js';

import { animations } from '@/constants/actors';
import {
  ambientLightSettings,
  cameraSetings,
  directionalLightSettings,
  fogSettings,
  rendererSettings,
} from '@/constants/settings';
import { chickyAnimation, chickyMixer } from '@/actors/chicky';
import { ghostAnimation, ghostMixer } from '@/actors/ghost';
import { CommandTurn } from '@/enums/game';
import { diceMixer } from '@/objects/dice';
import { addModels } from '@/utils/models';

import { setCommandTurn } from '@/controls';
import { createHud } from '@/hud';

export const modelsGroup: Group = new Group();

const screen: HTMLDivElement = document.querySelector(
  '#screen',
) as HTMLDivElement;
const canvas: HTMLCanvasElement = document.querySelector(
  '#canvas',
) as HTMLCanvasElement;

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(
  cameraSetings.fov,
  screen.clientWidth / screen.clientHeight,
  cameraSetings.near,
  cameraSetings.far,
);
const clock: Clock = new Clock();

let renderer: WebGLRenderer;

/**
 * Create the ThreeJS renderer
 */
const createRenderer = (): void => {
  renderer = new WebGLRenderer({
    canvas,
    antialias: rendererSettings.antialias,
    alpha: rendererSettings.alpha,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(screen.clientWidth, screen.clientHeight);

  renderer.shadowMap.enabled = rendererSettings.shadowMap.enabled;
  renderer.shadowMap.type = rendererSettings.shadowMap.type;
};

/**
 * Create ThreeJS DirectionalLight and AmbientLight objects
 */
const createLighting = (): void => {
  // Ambient light
  const ambientLight: AmbientLight = new AmbientLight(
    ambientLightSettings.color,
    ambientLightSettings.intensity,
  );

  scene.add(ambientLight);

  // Directional light
  const directionalLight: DirectionalLight = new DirectionalLight(
    directionalLightSettings.color,
    directionalLightSettings.intensity,
  );

  directionalLight.position.set(
    directionalLightSettings.position.x,
    directionalLightSettings.position.y,
    directionalLightSettings.position.z,
  );
  directionalLight.castShadow = directionalLightSettings.castShadow;
  directionalLight.shadow.bias = directionalLightSettings.shadow.bias;
  directionalLight.shadow.mapSize = directionalLightSettings.shadow.mapSize;
  directionalLight.shadow.camera.near =
    directionalLightSettings.shadow.camera.near;
  directionalLight.shadow.camera.far =
    directionalLightSettings.shadow.camera.far;

  scene.add(directionalLight);
};

/**
 * Create ThreeJS fog
 */
const createFog = (): void => {
  const fog = new Fog(fogSettings.color, fogSettings.near, fogSettings.far);

  scene.fog = fog;
};

/**
 * Resize the window
 */
const resize = (): void => {
  camera.aspect = screen.clientWidth / screen.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(screen.clientWidth, screen.clientHeight);
};

/**
 * Initialise ThreeJS objects
 */
export const initialize = (): void => {
  createHud();

  camera.position.set(
    cameraSetings.position.x,
    cameraSetings.position.y,
    cameraSetings.position.z,
  );

  createRenderer();
  createLighting();
  createFog();
};

/**
 * Create the scene
 */
export const create = (): void => {
  resize();

  try {
    scene.add(modelsGroup);

    addModels(modelsGroup);

    chickyAnimation(animations.Idle);
    ghostAnimation(animations.Idle);
  } catch (error: unknown) {
    alert('There is an error while rendering an object');

    console.error(error);

    return;
  }

  setCommandTurn(CommandTurn.Player);
};

/**
 * Update the scene
 */
export const update = (): void => {
  requestAnimationFrame(update);

  const delta: number = clock.getDelta();

  chickyMixer?.update(delta);
  ghostMixer?.update(delta);
  diceMixer?.update(delta);

  renderer.render(scene, camera);

  TWEEN.update();
};

/**
 * Window resize event handler
 */
window.addEventListener('resize', (): void => {
  resize();
});
