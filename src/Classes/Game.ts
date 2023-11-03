import * as THREE from 'three';

import { preload } from './Preload';
import {
  camera,
  canvas,
  createCanvas,
  createControls,
  createLighting,
  createRenderer,
  initializeCamera,
  renderer,
} from './Create';
import { update } from './Update';

export let models: Record<string, THREE.Group>;

/**
 * Set the models value
 * @param {Record<string, THREE.Group>} value Value of the renderer
 */
export function setModels(value: Record<string, THREE.Group>): void {
  models = value;
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
  createCallback?: () => void,
  updateCallback?: (delta: number) => void,
): Promise<void> {
  if (assets != null) {
    await preload(assets);
  }

  createCanvas(canvasId);
  createControls();
  createRenderer();
  createLighting();

  if (createCallback != null) {
    createCallback();
  }

  initializeCamera();

  update(updateCallback);
}
