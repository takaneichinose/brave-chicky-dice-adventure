import {
  commandButtonTexts,
  computerAllowedCommands,
} from '@/constants/commands';
import { checkDisabledDiceCommand } from './commands';
import { DiceCommand } from '@/enums/game';

/**
 * Get the command done by the computer based on the value of the dice
 * @param {number} value Value from the dice
 * @param {(command: DiceCommand) => void} callback Callback function
 * @returns {DiceCommand | void} Selected command
 */
export const startComputerProcess = (
  value: number,
  callback?: (command: DiceCommand) => void,
): DiceCommand | void => {
  for (let index = commandButtonTexts.length - 1; index >= 0; index--) {
    if (
      computerAllowedCommands[index] == null ||
      checkDisabledDiceCommand(index, value)
    ) {
      continue;
    }

    if (callback == null) {
      return value;
    }

    callback(index);

    return;
  }
};
