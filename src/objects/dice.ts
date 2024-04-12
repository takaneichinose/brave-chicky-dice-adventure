import {
  AnimationClip,
  AnimationMixer,
  Mesh,
  Object3D,
  Object3DEventMap,
} from 'three';

import * as TWEEN from '@tweenjs/tween.js';

import { modelData } from '@/storage/models';

import { modelsGroup } from '@/game';
import { playAnimation } from '@/utils/models';

export type DiceSettings = {
  value: {
    min: number;
    max: number;
  };
  animationPrefix: string;
  fadeTime: number;
};

export const diceSettings: DiceSettings = {
  value: {
    min: 1,
    max: 6,
  },
  animationPrefix: 'Roll',
  fadeTime: 500,
};

export let dice: Object3D<Object3DEventMap> | null = null;

export let diceClips: AnimationClip[] | null = null;

export let diceMixer: AnimationMixer | null = null;

export const createDice = (value: number, onRollEnd: () => void): void => {
  if (modelData.dice === null) {
    throw new Error('Object cannot be null');
  }

  dice = modelData.dice.scene.clone(true);
  diceClips = modelData.dice.animations;
  diceMixer = new AnimationMixer(dice);

  modelsGroup.add(dice);

  const animationName: string = diceSettings.animationPrefix + value;

  playAnimation(animationName, diceClips, diceMixer, false);

  diceMixer.addEventListener('finished', (): void => {
    dice?.traverse((object: Object3D) => {
      if (object instanceof Mesh) {
        new TWEEN.Tween(object.material)
          .to(
            {
              opacity: 0,
            },
            diceSettings.fadeTime,
          )
          .easing(TWEEN.Easing.Quadratic.Out)
          .start()
          .onComplete((): void => {
            modelsGroup.remove(dice as Object3D<Object3DEventMap>);

            dice?.traverse((object: Object3D) => {
              if (object instanceof Mesh) {
                object.material.opacity = 1;
              }
            });

            dice = null;

            onRollEnd();
          });
      }
    });
  });
};
