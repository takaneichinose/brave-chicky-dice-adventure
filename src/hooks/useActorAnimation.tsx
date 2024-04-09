import { RefObject, useEffect, useState } from 'react';
import { useAnimations } from '@react-three/drei';

import {
  AnimationAction,
  AnimationActionLoopStyles,
  AnimationClip,
  Group,
  LoopRepeat,
  Object3DEventMap,
} from 'three';

import {
  CHARACTER_ANIMATION,
  CHARACTER_ANIMATION_LOOP,
} from '@/constants/settings';
import { Command } from '@/enums/game';

type ActorAnimationProps = {
  command?: Command;
  animations: AnimationClip[];
  ref: RefObject<Group<Object3DEventMap>>;
  onActionEnd?: () => void;
};

export const useActorAnimation = ({
  command,
  animations,
  ref,
  onActionEnd,
}: ActorAnimationProps) => {
  const [action, setAction] = useState<string>(CHARACTER_ANIMATION.Idle);
  const [loopStyle, setLoopStyle] =
    useState<AnimationActionLoopStyles>(LoopRepeat);

  const { actions, mixer } = useAnimations(animations, ref);

  useEffect(() => {
    const animationAction: AnimationAction | null = actions[action];

    if (animationAction == null) {
      return;
    }

    animationAction.stop();
    animationAction.play();

    animationAction.setLoop(loopStyle, loopStyle === LoopRepeat ? Infinity : 0);

    animationAction.clampWhenFinished = true;
  }, [actions, action, loopStyle]);

  useEffect(() => {
    if (command == null) return;

    actions[CHARACTER_ANIMATION.Idle]?.stop();

    if (command === Command.Skip) {
      setAction(CHARACTER_ANIMATION.Skip);
      setLoopStyle(CHARACTER_ANIMATION_LOOP.Skip);
    } else if (command === Command.Defend) {
      setAction(CHARACTER_ANIMATION.Guard);
      setLoopStyle(CHARACTER_ANIMATION_LOOP.Guard);
    }
  }, [command, actions, action]);

  useEffect(() => {
    mixer.addEventListener('finished', () => {
      if (onActionEnd != null) onActionEnd();
    });
  }, [mixer, onActionEnd]);
};
