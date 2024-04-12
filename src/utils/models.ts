import { modelsGroupSettings } from '@/constants/settings';
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
  LoopOnce,
  LoopRepeat,
  Mesh,
  Object3D,
  Object3DEventMap,
} from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

import { bushSettings, createBush } from '@/objects/bush';
import { createGrass, grassSettings } from '@/objects/grass';
import { createStage } from '@/objects/stage';
import { createStone, stoneSettings } from '@/objects/stone';
import { createTree, treeSettings } from '@/objects/tree';
import { createTree2, tree2Settings } from '@/objects/tree2';
import { createChicky } from '@/actors/chicky';
import { createGhost } from '@/actors/ghost';

/**
 * Load the model and return its GLTF data
 * @param {string} path Path of the model
 * @returns {Promise<GLTF>}
 */
export const loadModel = async (path: string): Promise<GLTF> => {
  const loader: GLTFLoader = new GLTFLoader();

  return new Promise(
    (
      resolve: (value: GLTF | PromiseLike<GLTF>) => void,
      reject: (reason?: unknown) => void,
    ): void => {
      loader.load(
        path,
        (gltf: GLTF): void => {
          gltf.scene.castShadow = true;
          gltf.scene.receiveShadow = true;
          gltf.scene.traverse((object: Object3D<Object3DEventMap>): void => {
            if (object instanceof Mesh) {
              object.castShadow = true;
              object.receiveShadow = true;
            }
          });

          resolve(gltf);
        },
        undefined,
        (error: unknown): void => {
          reject(error);
        },
      );
    },
  );
};

/**
 * Add the models into the group
 * @param {Group<Object3DEventMap>} modelsGroup Group object where the models to be added
 */
export const addModels = (modelsGroup: Group<Object3DEventMap>): void => {
  modelsGroup.position.set(
    modelsGroupSettings.position.x,
    modelsGroupSettings.position.y,
    modelsGroupSettings.position.z,
  );

  createStage();

  for (let i = 0; i < bushSettings.count; i++) {
    createBush();
  }

  for (let i = 0; i < grassSettings.count; i++) {
    createGrass();
  }

  for (let i = 0; i < stoneSettings.count; i++) {
    createStone();
  }

  for (let i = 0; i < treeSettings.count; i++) {
    createTree();
  }

  for (let i = 0; i < tree2Settings.count; i++) {
    createTree2();
  }

  createChicky();
  createGhost();
};

/**
 * Stop the animation
 * @param {string} name Animation name
 * @param {AnimationClip[]} clips Animation clips
 * @param {AnimationMixer} mixer Animation mixer
 * @returns {void}
 */
export const stopAnimation = (
  name: string,
  clips: AnimationClip[],
  mixer: AnimationMixer,
): void => {
  const clip: AnimationClip = AnimationClip.findByName(clips, name);
  const action: AnimationAction = mixer.clipAction(clip);

  action.stop();
};

/**
 * Play the animation
 * @param {string} name Animation name
 * @param {AnimationClip[]} clips Animation clips
 * @param {AnimationMixer} mixer Animation mixer
 * @param {boolean} isLoop Repeat the animation by loop
 * @returns {void}
 */
export const playAnimation = (
  name: string,
  clips: AnimationClip[],
  mixer: AnimationMixer,
  isLoop: boolean,
): void => {
  const clip: AnimationClip = AnimationClip.findByName(clips, name);
  const action: AnimationAction = mixer.clipAction(clip);

  if (action == null) return;

  if (isLoop) {
    action.setLoop(LoopRepeat, Infinity);
  } else {
    action.setLoop(LoopOnce, 1);
  }

  action.clampWhenFinished = true;
  action.play();
};
