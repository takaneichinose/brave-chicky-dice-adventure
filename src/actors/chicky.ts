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

export type ChickySettings = {
  position: Vector3;
  rotation: Euler;
};

export const chickySettings: ChickySettings = {
  position: new Vector3(-1.25, 0, 0),
  rotation: new Euler(0, degToRad(90), 0),
};

export let chicky: Object3D<Object3DEventMap> | null = null;

export let chickyClips: AnimationClip[] | null = null;

export let chickyMixer: AnimationMixer | null = null;

export let chickyGuard: number = 0;

export let chickyIsFaint: boolean = false;

let currentAnimation: AnimationSettings | null = null;

export const createChicky = (): void => {
  if (modelData.chicky === null) {
    throw new Error('Object cannot be null');
  }

  chicky = modelData.chicky.scene;
  chickyClips = modelData.chicky.animations;
  chickyMixer = new AnimationMixer(chicky);

  modelsGroup.add(chicky);

  chicky.position.set(
    chickySettings.position.x,
    chickySettings.position.y,
    chickySettings.position.z,
  );
  chicky.rotation.set(
    chickySettings.rotation.x,
    chickySettings.rotation.y,
    chickySettings.rotation.z,
  );
};

export const chickyAnimation = (animation: AnimationSettings): void => {
  if (chickyClips == null || chickyMixer == null) {
    return;
  }

  if (currentAnimation != null) {
    stopAnimation(currentAnimation.name, chickyClips, chickyMixer);
  }

  currentAnimation = animation;

  playAnimation(animation.name, chickyClips, chickyMixer, animation.loop);
};

export const setChickyGuard = (isGuard: number): void => {
  chickyGuard = isGuard;
};

export const setChickyFaint = (isFaint: boolean): void => {
  chickyIsFaint = isFaint;
};
