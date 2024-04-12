import { chicky, chickyAnimation, chickySettings } from '@/actors/chicky';
import { ghost, ghostAnimation, ghostSettings } from '@/actors/ghost';
import { animations } from '@/constants/actors';
import {
  computerHpIterationPerFloor,
  defaultComputerHp,
  defaultPlayerHp,
} from '@/constants/settings';
import { setCommandTurn } from '@/controls';
import { CommandTurn } from '@/enums/game';
import { getFloor, setComputerHp, setPlayerHp } from '@/hud';

/**
 * Initialize the position of the actors
 */
export const initializePosition = (commandTurn: CommandTurn): void => {
  if (chicky == null || ghost == null) {
    return;
  }

  chicky.position.x = chickySettings.position.x;
  chicky.position.y = chickySettings.position.y;
  chicky.position.z = chickySettings.position.z;

  ghost.position.x = ghostSettings.position.x;
  ghost.position.y = ghostSettings.position.y;
  ghost.position.z = ghostSettings.position.z;

  chickyAnimation(animations.Idle);
  ghostAnimation(animations.Idle);

  if (commandTurn === CommandTurn.Player) {
    setComputerHp(
      defaultComputerHp + Math.floor(getFloor() / computerHpIterationPerFloor),
    );
  } else {
    setPlayerHp(defaultPlayerHp);
    setComputerHp(defaultComputerHp);
  }

  setCommandTurn(CommandTurn.Player);
};
