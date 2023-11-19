import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { ModelData } from '../Types/Models';

/**
 * Load an asset
 * @param {string} path Path of the asset
 * @returns {Promise<ModelData>}
 */
export function loadModel(path: string): Promise<ModelData> {
  const loader: GLTFLoader = new GLTFLoader();

  return new Promise<ModelData>((resolve) => {
    loader.load(
      path,
      (gltf: GLTF) => {
        const model: THREE.Group = gltf.scene;
        const clips: THREE.AnimationClip[] = gltf.animations;
        const mixer: THREE.AnimationMixer = new THREE.AnimationMixer(model);

        resolve({
          model,
          clips,
          mixer,
        });
      },
      undefined,
      (error) => {
        console.error(error);
      },
    );
  });
}
