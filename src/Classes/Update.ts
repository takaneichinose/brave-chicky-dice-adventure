import { camera, clock, controls, renderer, scene } from './Create';

export let delta: number;

/**
 * Render the ThreeJS instance into the canvas
 */
function render(): void {
  renderer.render(scene, camera);
}

/**
 * Update function for the animation and game loop
 */
export function update(updateCallback?: (delta: number) => void): void {
  requestAnimationFrame(() => {
    update(updateCallback);
  });

  delta = clock.getDelta();

  controls.update();

  render();

  if (updateCallback != null) {
    updateCallback(delta);
  }
}
