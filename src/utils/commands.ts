import { ableDiceCommand } from '@/constants/commands';
import { labels } from '@/constants/labels';
import { DiceCommand } from '@/enums/game';

/**
 * Created dialog box for 'Roll the dice' dialog
 * @returns {HTMLDivElement}
 */
export const createRollDiceDialog = (): HTMLDivElement => {
  const element: HTMLDivElement = document.createElement('div');
  element.className = 'dialog-window text-common animate-fade-in';

  const button: HTMLButtonElement = document.createElement('button');
  button.className = 'link';
  button.innerText = labels.en.commands.rollTheDice;

  element.append(button);

  return element;
};

/**
 * Set the command link into disabled depends on the condition from the value of the dice
 * @param {DiceCommand} command Target command
 * @param {number} value Number from the dice
 * @returns
 */
export const checkDisabledDiceCommand = (
  command: DiceCommand,
  value: number,
): boolean => {
  return (
    (command === DiceCommand.Defend &&
      value < ableDiceCommand[DiceCommand.Defend]) ||
    (command === DiceCommand.Attack &&
      value < ableDiceCommand[DiceCommand.Attack]) ||
    (command === DiceCommand.Heal && value < ableDiceCommand[DiceCommand.Heal])
  );
};

/**
 * Created dialog box for 'game over' dialog
 * @returns {HTMLDivElement}
 */
export const createGameOverDialog = (): HTMLDivElement => {
  const element: HTMLDivElement = document.createElement('div');
  element.className = 'dialog-window text-common animate-fade-in';

  const gameOverLabel: HTMLDivElement = document.createElement('div');
  gameOverLabel.className = 'text-common';
  gameOverLabel.innerText = labels.en.gameOver;

  const button: HTMLButtonElement = document.createElement('button');
  button.className = 'link';
  button.innerText = labels.en.commands.retry;

  element.append(gameOverLabel, button);

  return element;
};
