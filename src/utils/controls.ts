import { randInt } from 'three/src/math/MathUtils.js';

import * as TWEEN from '@tweenjs/tween.js';

import {
  animations,
  jumpTime,
  nextFloorDirection,
  nextFloorTime,
} from '@/constants/actors';
import { CommandTurn, DiceCommand } from '@/enums/game';
import { createDice, diceSettings } from '@/objects/dice';
import { fadeIn, fadeOut } from '@/utils/fade';
import { initializePosition } from '@/utils/game';

import {
  commandTurn,
  commands,
  currentAnimation,
  currentDirection,
  currentHp,
  currentMixer,
  currentObject,
  currentSetGuard,
  currentSetHp,
  diceValue,
  oppositeAnimation,
  oppositeGuard,
  oppositeHp,
  oppositeMixer,
  oppositeSetHp,
  originalPosition,
  setCommandTurn,
  setDiceValue,
} from '@/controls';
import { getFloor, setFloor } from '@/hud';

let tmpOppositeHp: number = 0;

/**
 * Process of dice rolling
 */
export const doDiceRollProcess = (): void => {
  setDiceValue(randInt(diceSettings.value.min, diceSettings.value.max));

  createDice(diceValue, (): void => {
    commands().selectCommand(diceValue);
  });
};

/**
 * Process of after selecting a command
 * @param {DiceCommand} command Selected command
 * @returns
 */
export const doSelectCommandProcess = (command: DiceCommand): void => {
  if (command === DiceCommand.Skip) {
    currentAnimation(animations.Skip);
  } else if (command === DiceCommand.Defend) {
    currentAnimation(animations.Guard);
    currentSetGuard(diceValue);
  } else if (command === DiceCommand.Attack) {
    currentAnimation(animations.Jump);
    attackCommandProcess();

    return;
  } else if (command === DiceCommand.Heal) {
    currentAnimation(animations.Heal);
    currentMixer.addEventListener('finished', currentMixerHealAnimation);

    return;
  }

  currentMixer.addEventListener('finished', commonMixerAnimation);
};

/**
 * Process of attacking an opponent
 */
const attackCommandProcess = (): void => {
  new TWEEN.Tween(currentObject.position)
    .to(
      {
        x: currentDirection,
      },
      jumpTime,
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete((): void => {
      currentAnimation(animations.Attack);
    });

  currentMixer.addEventListener('finished', currentMixerAttackAnimation);
};

/**
 * Animation finished event handler for attack animation
 */
const currentMixerAttackAnimation = (): void => {
  currentMixer.removeEventListener('finished', currentMixerAttackAnimation);

  currentAnimation(animations.Jump);

  oppositeMixer.addEventListener('finished', oppositeMixerAttackAnimation);

  const damage: number = diceValue - oppositeGuard;

  tmpOppositeHp = oppositeHp - (damage > 0 ? damage : 0);

  oppositeSetHp(tmpOppositeHp > 0 ? tmpOppositeHp : 0);

  if (tmpOppositeHp > 0) {
    oppositeAnimation(animations.Hurt);
  } else {
    oppositeAnimation(animations.Faint);
  }

  backToOriginalPosition();
};

/**
 * Back to the original position after attacking
 */
const backToOriginalPosition = (): void => {
  new TWEEN.Tween(currentObject.position)
    .to(
      {
        x: originalPosition,
      },
      jumpTime,
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete((): void => {
      if (tmpOppositeHp <= 0) {
        if (commandTurn === CommandTurn.Player) {
          moveToNextFloor();
        } else if (commandTurn === CommandTurn.Computer) {
          currentAnimation(animations.Idle);
          commands().showGameOver();
        }

        return;
      }

      currentAnimation(animations.Idle);

      if (tmpOppositeHp > 0) {
        setCommandTurn(
          commandTurn === CommandTurn.Player
            ? CommandTurn.Computer
            : CommandTurn.Player,
        );
      }
    });
};

/**
 * Animation finished event handler for hurt or faint command
 */
const oppositeMixerAttackAnimation = (): void => {
  oppositeMixer.removeEventListener('finished', oppositeMixerAttackAnimation);

  if (tmpOppositeHp > 0) {
    oppositeAnimation(animations.Idle);
  }
};

/**
 * Animation finished event handler for heal command
 */
const currentMixerHealAnimation = (): void => {
  currentMixer.removeEventListener('finished', currentMixerHealAnimation);

  currentSetHp(currentHp + diceValue);
  currentAnimation(animations.Idle);

  setCommandTurn(
    commandTurn === CommandTurn.Player
      ? CommandTurn.Computer
      : CommandTurn.Player,
  );
};

/**
 * Animation event for skip, and defend command
 */
const commonMixerAnimation = (): void => {
  currentMixer.removeEventListener('finished', commonMixerAnimation);

  setCommandTurn(
    commandTurn === CommandTurn.Player
      ? CommandTurn.Computer
      : CommandTurn.Player,
  );
};

/**
 * Fade the screen, then move to the next floor
 */
const moveToNextFloor = (): void => {
  currentAnimation(animations.Walk);

  new TWEEN.Tween(currentObject.position)
    .to(
      {
        x: nextFloorDirection,
      },
      nextFloorTime,
    )
    .easing(TWEEN.Easing.Quadratic.In)
    .start()
    .onComplete((): void => {
      setFloor(getFloor() + 1);

      initializePosition(commandTurn);

      fadeIn();
    });

  const fadeTimeout: number = setTimeout(
    (): void => {
      clearTimeout(fadeTimeout);

      fadeOut();
    },
    (nextFloorDirection / 2) * 1000,
  );
};
