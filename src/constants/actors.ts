import { Animations } from '@/types/actors';

export const animations: Animations = {
  Attack: {
    name: 'Attack',
    loop: false,
  },
  Guard: {
    name: 'Guard',
    loop: false,
  },
  Idle: {
    name: 'Idle',
    loop: true,
  },
  Walk: {
    name: 'Walk',
    loop: true,
  },
  Skip: {
    name: 'Skip',
    loop: false,
  },
  Jump: {
    name: 'Jump',
    loop: false,
  },
  Heal: {
    name: 'Heal',
    loop: false,
  },
  Hurt: {
    name: 'Hurt',
    loop: false,
  },
  Faint: {
    name: 'Faint',
    loop: false,
  },
};

export const jumpTime: number = 1100;

export const jumpDirection: number = 1.25;

export const nextFloorTime: number = 2000;

export const nextFloorDirection: number = 1.75;
