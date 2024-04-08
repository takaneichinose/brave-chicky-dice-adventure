import { useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';

import { AnimationAction, LoopOnce } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import { ASSETS } from '@/constants/asset';
import { DICE_SETTINGS } from '@/constants/settings';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.dice);

export type DiceProps = {
  value?: number;
  onRollEnd?: () => void;
};

export const Dice = ({ value, onRollEnd }: DiceProps) => {
  const gltf = useLoader(GLTFLoader, model);

  const { animations } = useGLTF(model);
  const { ref, actions, mixer } = useAnimations(animations);

  useEffect(() => {
    if (value == null) {
      return;
    }

    const action: AnimationAction | null = actions[value];

    if (action == null) {
      return;
    }

    action.play();
    action.setLoop(LoopOnce, 0);

    action.clampWhenFinished = true;

    mixer.addEventListener('finished', () => {
      if (onRollEnd != null) {
        onRollEnd();
      }
    });
  }, [actions, mixer, value, onRollEnd]);

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
