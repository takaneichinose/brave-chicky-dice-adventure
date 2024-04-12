import { AnimationMixer, Object3D, Object3DEventMap } from 'three';

import {
  chicky,
  chickyAnimation,
  chickyGuard,
  chickyMixer,
  setChickyGuard,
} from '@/actors/chicky';
import {
  ghost,
  ghostAnimation,
  ghostGuard,
  ghostMixer,
  setGhostGuard,
} from '@/actors/ghost';
import { animations, jumpDirection } from '@/constants/actors';
import { commandButtonTexts } from '@/constants/commands';
import { CommandTurn, DiceCommand } from '@/enums/game';
import { dice } from '@/objects/dice';
import { AnimationSettings } from '@/types/actors';
import { Commands } from '@/types/commands';
import { startComputerProcess } from '@/utils/ai';
import {
  checkDisabledDiceCommand,
  createGameOverDialog,
  createRollDiceDialog,
} from '@/utils/commands';
import { doDiceRollProcess, doSelectCommandProcess } from '@/utils/controls';

import { getComputerHp, getPlayerHp, setComputerHp, setPlayerHp } from '@/hud';
import { initializePosition } from './utils/game';
import { fadeIn, fadeOut } from './utils/fade';

const commandWindow: HTMLDivElement = document.querySelector(
  '#command_window',
) as HTMLDivElement;

export let commandTurn: CommandTurn;
export let diceValue: number;
export let currentObject: Object3D<Object3DEventMap>;
export let currentMixer: AnimationMixer;
export let oppositeMixer: AnimationMixer;
export let currentHp: number;
export let oppositeHp: number;
export let oppositeGuard: number;
export let currentAnimation: (animation: AnimationSettings) => void;
export let oppositeAnimation: (animation: AnimationSettings) => void;
export let currentSetHp: (hp: number) => void;
export let oppositeSetHp: (hp: number) => void;
export let currentSetGuard: (isGuard: number) => void;
export let originalPosition: number;
export let currentDirection: number;

/**
 * Start rolling the dice
 */
const doStartRoll = (): void => {
  if (commandTurn === CommandTurn.Computer) {
    doDiceRollProcess();

    return;
  }

  const rollDialog: HTMLDivElement = createRollDiceDialog();

  commandWindow.append(rollDialog);

  const rollButton: HTMLButtonElement = rollDialog.querySelector(
    'button',
  ) as HTMLButtonElement;

  rollButton.addEventListener('click', (): void => {
    if (dice != null) return;

    doDiceRollProcess();

    rollDialog.classList.remove('animate-fade-in');
    rollDialog.classList.add('animate-fade-out');
  });

  rollDialog.addEventListener('animationend', (event: AnimationEvent): void => {
    if (event.animationName === 'fade-out') {
      rollDialog.remove();
    }
  });
};

/**
 * Start selecting the command to do
 * @param {number} value Dice value
 */
const doSelectCommand = (value: number): void => {
  if (commandTurn === CommandTurn.Computer) {
    startComputerProcess(value, (command: DiceCommand) => {
      doSelectCommandProcess(command);
    });

    return;
  }

  const diceDialog: HTMLDivElement = document.createElement('div');
  diceDialog.className = 'dialog-window text-common animate-fade-in';

  commandWindow.append(diceDialog);

  for (let index = 0; index < commandButtonTexts.length; index++) {
    const text: string = commandButtonTexts[index];
    const button: HTMLButtonElement = document.createElement('button');
    button.className = 'link';
    button.innerText = text;
    button.disabled = checkDisabledDiceCommand(index, value);

    button.addEventListener('click', (): void => {
      if (diceDialog.classList.contains('animate-fade-out')) return;

      if (diceDialog != null) {
        diceDialog.classList.remove('animate-fade-in');
        diceDialog.classList.add('animate-fade-out');
      }

      doSelectCommandProcess(index);
    });

    diceDialog.append(button);
  }

  diceDialog.addEventListener('animationend', (event: AnimationEvent): void => {
    if (event.animationName === 'fade-out') {
      diceDialog.remove();
    }
  });
};

/**
 * Show game over dialog
 */
const doShowGameOver = (): void => {
  const gameOverDialog: HTMLDivElement = createGameOverDialog();
  const link: HTMLButtonElement = gameOverDialog.querySelector(
    'button',
  ) as HTMLButtonElement;

  commandWindow.append(gameOverDialog);

  const handleGameOverLinkClickEvent = (): void => {
    link.removeEventListener('click', handleGameOverLinkClickEvent);

    gameOverDialog.remove();

    fadeOut((): void => {
      fadeIn();

      initializePosition(commandTurn);
    });
  };

  link.addEventListener('click', handleGameOverLinkClickEvent);
};

/**
 * Available commands to execute
 */
export const commands = (): Commands => {
  return {
    startRoll: doStartRoll,
    selectCommand: doSelectCommand,
    showGameOver: doShowGameOver,
  };
};

/**
 * Set the value of the dice
 * @param {number} value Value of the dice
 */
export const setDiceValue = (value: number): void => {
  diceValue = value;
};

/**
 * Set the action turn of the actors
 * @param {CommandTurn} turn Actors to do the turn
 * @returns
 */
export const setCommandTurn = (turn: CommandTurn): void => {
  commandTurn = turn;

  if (
    chicky == null ||
    ghost == null ||
    chickyMixer == null ||
    ghostMixer == null
  ) {
    return;
  }

  const condition: boolean = commandTurn === CommandTurn.Player;

  currentObject = condition ? chicky : ghost;
  currentMixer = condition ? chickyMixer : ghostMixer;
  oppositeMixer = condition ? ghostMixer : chickyMixer;
  currentHp = condition ? getPlayerHp() : getComputerHp();
  oppositeHp = condition ? getComputerHp() : getPlayerHp();
  oppositeGuard = condition ? ghostGuard : chickyGuard;

  currentAnimation = condition ? chickyAnimation : ghostAnimation;
  oppositeAnimation = condition ? ghostAnimation : chickyAnimation;
  currentSetHp = condition ? setPlayerHp : setComputerHp;
  oppositeSetHp = condition ? setComputerHp : setPlayerHp;
  currentSetGuard = condition ? setChickyGuard : setGhostGuard;

  originalPosition = currentObject.position.x;
  currentDirection =
    originalPosition + (condition ? jumpDirection : -jumpDirection);

  currentAnimation(animations.Idle);
  currentSetGuard(0);

  commands().startRoll();
};
