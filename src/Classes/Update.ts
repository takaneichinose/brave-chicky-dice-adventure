import { camera, clock, controls, renderer, scene } from './Create';

/**
 * Render the ThreeJS instance into the canvas
 */
export function render(): void {
  renderer.render(scene, camera);
}

/**
 * Update function for the animation and game loop
 */
export function update(): void {
  requestAnimationFrame(update);

  const delta: number = clock.getDelta();

  controls.update();
  console.log(delta);

  render();
}
