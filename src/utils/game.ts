import { ABLE_COMMAND } from '@/constants/settings';
import { Command } from '@/enums/game';

/**
 * Get the name of the command by its enum
 * @param {Command} command Command
 * @returns {string}
 */
export const getCommandName = (command: Command): string => {
  if (command === Command.Skip) return 'Skip';
  else if (command === Command.Defend) return 'Defend';
  else if (command === Command.Attack) return 'Attack';
  else if (command === Command.Heal) return 'Heal';
  else return '';
};

/**
 * Check the value of the dice then disable the command if lower than the settings
 * @param {Command} command Command
 * @param {number} value Value of the dice
 * @returns {boolean}
 */
export const checkDisabledCommand = (
  command: Command,
  value: number,
): boolean => {
  return (
    (command === Command.Defend && value < ABLE_COMMAND[Command.Defend]) ||
    (command === Command.Attack && value < ABLE_COMMAND[Command.Attack]) ||
    (command === Command.Heal && value < ABLE_COMMAND[Command.Heal])
  );
};
