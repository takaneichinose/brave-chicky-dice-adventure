import { DiceCommand } from '@/enums/game';

import { labels } from '@/constants/labels';

export const ableDiceCommand: number[] = [
  0, // Skip
  2, // Defend
  3, // Attack
  5, // Heal
];

export const commandButtonTexts: string[] = [
  labels.en.commands.skip,
  labels.en.commands.defend,
  labels.en.commands.attack,
  labels.en.commands.heal,
];

export const computerAllowedCommands: DiceCommand[] = [
  DiceCommand.Attack,
  DiceCommand.Defend,
  DiceCommand.Skip,
];
