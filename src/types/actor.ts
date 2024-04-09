import { AnimationActionLoopStyles } from 'three';

export type ActorProps = {
  onAttackEnd: () => void;
};

export type Animation = {
  Attack: string;
  Guard: string;
  Idle: string;
  Walk: string;
  Skip: string;
  Jump: string;
  Faint: string;
};

export type AnimationLoop = {
  Attack: AnimationActionLoopStyles;
  Guard: AnimationActionLoopStyles;
  Idle: AnimationActionLoopStyles;
  Walk: AnimationActionLoopStyles;
  Skip: AnimationActionLoopStyles;
  Jump: AnimationActionLoopStyles;
  Faint: AnimationActionLoopStyles;
};
