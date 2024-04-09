import { useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';

import { AnimationAction, LoopOnce } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import { Easing, Tween, update } from '@tweenjs/tween.js';

import { ASSETS } from '@/constants/asset';
import { DICE_FADE_TIME, DICE_SETTINGS } from '@/constants/settings';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.dice);

type DiceProps = {
  value?: number;
  onRollEnd?: () => void;
};

export const Dice = ({ value, onRollEnd }: DiceProps) => {
  const gltf = useLoader(GLTFLoader, model);

  const { animations } = useGLTF(model);
  const { ref, actions, mixer } = useAnimations(animations);

  useEffect(() => {
    if (value == null) {
      for (const index in gltf.materials) {
        gltf.materials[index].opacity = 1;
      }

      return;
    }

    const action: AnimationAction | null = actions[value];

    if (action == null) {
      return;
    }

    action.play();
    action.setLoop(LoopOnce, 0);

    action.clampWhenFinished = true;
  }, [gltf, actions, value]);

  useEffect(() => {
    mixer.addEventListener('finished', () => {
      if (onRollEnd != null) {
        for (const index in gltf.materials) {
          new Tween(gltf.materials[index])
            .to(
              {
                opacity: 0,
              },
              DICE_FADE_TIME,
            )
            .easing(Easing.Quadratic.Out)
            .start()
            .onComplete(() => {
              onRollEnd();
            });
        }
      }
    });
  }, [gltf, mixer, onRollEnd]);

  useFrame(() => {
    update();
  });

  return (
    value && (
      <primitive
        ref={ref}
        object={gltf.scene}
        position={DICE_SETTINGS.position}
        rotation={DICE_SETTINGS.rotation}
        castShadow
        receiveShadow
      />
    )
  );
};

useGLTF.preload(model);
