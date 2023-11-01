import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as CameraSettings from '../Constants/CameraSettings';
import * as LightingSettings from '../Constants/LightingSettings';
import * as RendererSettings from '../Constants/RendererSettings';

import { getScreenRatio } from './Screen';
import { addModel } from './Models';
import { emit } from './Events';

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  CameraSettings.FOV as number,
  getScreenRatio(),
  CameraSettings.near,
  CameraSettings.far,
);
const clock: THREE.Clock = new THREE.Clock();

let canvas: HTMLCanvasElement;
let controls: OrbitControls;
let renderer: THREE.WebGLRenderer;

// TODO: Delete the ambient light. I might not need this anymore
/**
 * This will add the lighting to the scene
 */
function createLighting(): void {
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
function createRenderer(): void {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: RendererSettings.antialias,
    alpha: RendererSettings.alpha,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = RendererSettings.ShadowMap.enabled;
  renderer.shadowMap.type = RendererSettings.ShadowMap.type;
}

/**
 * Create the orbit controls
 */
function createControls(): void {
  controls = new OrbitControls(camera, canvas);
}

/**
 * Create the canvas element
 * @param {string} canvasId ID attribute of the canvas element
 */
function createCanvas(canvasId: string): void {
  const tmpCanvas: HTMLCanvasElement | null = document.getElementById(
    canvasId,
  ) as HTMLCanvasElement | null;

  if (tmpCanvas == null) {
    throw new Error(`Canvas ${canvasId} is not existing`);
  }

  canvas = tmpCanvas;
}

/**
 * Render the ThreeJS instance into the canvas
 */
function render(): void {
  renderer.render(scene, camera);
}

/**
 * Update function for the animation and game loop
 */
function update(): void {
  requestAnimationFrame(update);

  const delta = clock.getDelta();

  controls.update();
  console.log(delta);

  render();
}

/**
 * Preload all the assets in the list
 * @param {string[]} assets List of assets
 */
async function preload(assets: string[]): Promise<void> {
  emit('start', {
    detail: {
      count: assets.length,
    },
  });

  let index = 0;

  for (const asset of assets) {
    await addModel(asset);

    index++;

    emit('progress', {
      detail: {
        loaded: index,
      },
    });
  }

  emit('finished', {
    detail: {
      count: assets.length,
    },
  });
}

/**
 * Initialize the game
 * @param {string} canvasId ID attribute of the canvas element
 * @param {string[]} assets List of assets
 */
export async function initialize(
  canvasId: string,
  assets?: string[],
): Promise<void> {
  if (assets != null) {
    await preload(assets);
  }

  createCanvas(canvasId);
  createControls();
  createRenderer();
  createLighting();

  update();
}
