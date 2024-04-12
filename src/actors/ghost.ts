import {
  AnimationClip,
  AnimationMixer,
  Euler,
  Object3D,
  Object3DEventMap,
  Vector3,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

import { modelData } from '@/storage/models';
import { AnimationSettings } from '@/types/actors';
import { playAnimation, stopAnimation } from '@/utils/models';

import { modelsGroup } from '@/game';

export type GhostSettings = {
  position: Vector3;
  rotation: Euler;
};

export const ghostSettings: GhostSettings = {
  position: new Vector3(1.25, 0, 0),
  rotation: new Euler(0, degToRad(-90), 0),
};

export let ghost: Object3D<Object3DEventMap> | null = null;

export let ghostClips: AnimationClip[] | null = null;

export let ghostMixer: AnimationMixer | null = null;

export let ghostGuard: number = 0;

export let ghostIsFaint: boolean = false;

let currentAnimation: AnimationSettings | null = null;

export const createGhost = (): void => {
  if (modelData.ghost === null) {
    throw new Error('Object cannot be null');
  }

  ghost = modelData.ghost.scene;
  ghostClips = modelData.ghost.animations;
  ghostMixer = new AnimationMixer(ghost);

  modelsGroup.add(ghost);

  ghost.position.set(
    ghostSettings.position.x,
    ghostSettings.position.y,
    ghostSettings.position.z,
  );
  ghost.rotation.set(
    ghostSettings.rotation.x,
    ghostSettings.rotation.y,
    ghostSettings.rotation.z,
  );
};

export const ghostAnimation = (animation: AnimationSettings): void => {
  if (ghostClips == null || ghostMixer == null) {
    return;
  }

  if (currentAnimation != null) {
    stopAnimation(currentAnimation.name, ghostClips, ghostMixer);
  }

  currentAnimation = animation;

  playAnimation(animation.name, ghostClips, ghostMixer, animation.loop);
};

export const setGhostGuard = (isGuard: number): void => {
  ghostGuard = isGuard;
};

export const setGhostFaint = (isFaint: boolean): void => {
  ghostIsFaint = isFaint;
};
