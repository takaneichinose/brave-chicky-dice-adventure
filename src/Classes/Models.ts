import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Load an asset
 * @param {string} path Path of the asset
 * @returns {THREE.Group}
 */
export function loadModel(path: string): Promise<THREE.Group> {
  const loader: GLTFLoader = new GLTFLoader();

  return new Promise<THREE.Group>((resolve) => {
    loader.load(
      path,
      (gltf: GLTF) => {
        const model: THREE.Group = gltf.scene;

        resolve(model);
      },
      undefined,
      (error) => {
        console.error(error);
      },
    );
  });
}
