import * as THREE from 'three';

import { clampWhenFinished } from '../Constants/AnimationSettings';
import { ModelData } from '../Types/Models';

import { camera, clock, renderer, scene } from './Create';

/**
 * Render the ThreeJS instance into the canvas
 */
function render(): void {
  renderer.render(scene, camera);
}

/**
 * Play the animation of a model by name
 * @param {ModelData} asset Data of an asset
 * @param {string} name Animation name
 * @param {boolean} isLoop Animation loop flag
 */
export function play(asset: ModelData, name: string, isLoop = false): void {
  const clip: THREE.AnimationClip = THREE.AnimationClip.findByName(
    asset.clips,
    name,
  );
  const action: THREE.AnimationAction = asset.mixer.clipAction(clip);

  action.stop();
  action.setLoop(isLoop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);
  action.clampWhenFinished = clampWhenFinished;
  action.play();
}

/**
 * Stop the animation of a model by name
 * @param {ModelData} asset Data of an asset
 * @param {string} name Animation name
 */
export function stop(asset: ModelData, name: string) {
  const clip: THREE.AnimationClip = THREE.AnimationClip.findByName(
    asset.clips,
    name,
  );
  const action: THREE.AnimationAction = asset.mixer.clipAction(clip);

  action.stop();
}

/**
 * Update function for the animation and game loop
 */
export function update(updateCallback?: (delta: number) => void): void {
  requestAnimationFrame(() => {
    update(updateCallback);
  });

  const delta: number = clock.getDelta();

  render();

  if (updateCallback != null) {
    updateCallback(delta);
  }
}
