import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as CameraSettings from '../Constants/CameraSettings';

import { getScreenRatio } from './Screen';
import { preload } from './Preload';
import {
  createCanvas,
  createControls,
  createLighting,
  createRenderer,
} from './Create';

export const scene: THREE.Scene = new THREE.Scene();
export const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  CameraSettings.FOV as number,
  getScreenRatio(),
  CameraSettings.near,
  CameraSettings.far,
);
export const clock: THREE.Clock = new THREE.Clock();

export let canvas: HTMLCanvasElement;
export let controls: OrbitControls;
export let renderer: THREE.WebGLRenderer;

/**
 * Set the canvas value
 * @param {HTMLCanvasElement} value Value of the canvas
 */
export function setCanvas(value: HTMLCanvasElement): void {
  canvas = value;
}

/**
 * Set the renderer value
 * @param {THREE.WebGLRenderer} value Value of the renderer
 */
export function setRenderer(value: THREE.WebGLRenderer): void {
  renderer = value;
}

/**
 * Set the orbit controls value
 * @param {OrbitControls} value Value of the renderer
 */
export function setControls(value: OrbitControls): void {
  controls = value;
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
 * Resize the canvas
 */
export function resize() {
  const container: HTMLElement = canvas.parentElement as HTMLElement;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

/**
 * Initialize the game
 * @param {string} canvasId ID attribute of the canvas element
 * @param {Record<string,string>[]} assets List of assets
 */
export async function initialize(
  canvasId: string,
  assets?: Record<string, string>[],
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
