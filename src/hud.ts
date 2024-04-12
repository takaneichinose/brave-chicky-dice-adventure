import { labels } from '@/constants/labels';
import { defaultComputerHp, defaultPlayerHp } from '@/constants/settings';

let playerHp: number = defaultPlayerHp;
let computerHp: number = defaultComputerHp;
let floor: number = 1;

/**
 * Create HUD elements then add those to the DOM
 */
export const createHud = (): void => {
  const hud: HTMLDivElement = document.querySelector(
    '#hud_window',
  ) as HTMLDivElement;
  hud.className = 'size-full p-common absolute-top-left';

  const hpContainer: HTMLDivElement = document.createElement('div');
  hpContainer.className = 'flex justify-between';

  const playerHpContainer: HTMLSpanElement = document.createElement('span');
  playerHpContainer.className = 'text-common';

  const playerHpLabel: HTMLSpanElement = document.createElement('span');
  playerHpLabel.innerText = labels.en.hud.playerHp + ': ';

  const playerHp: HTMLSpanElement = document.createElement('span');

  playerHpContainer.append(playerHpLabel, playerHp);

  const computerHpContainer: HTMLSpanElement = document.createElement('span');
  computerHpContainer.className = 'text-common';

  const computerHpLabel: HTMLSpanElement = document.createElement('span');
  computerHpLabel.innerText = labels.en.hud.computerHp + ': ';

  const computerHp: HTMLSpanElement = document.createElement('span');

  computerHpContainer.append(computerHpLabel, computerHp);

  hpContainer.append(playerHpContainer, computerHpContainer);

  const floorContainer: HTMLDivElement = document.createElement('div');
  floorContainer.className = 'text-common';

  const floorLabel: HTMLSpanElement = document.createElement('span');
  floorLabel.innerText = labels.en.hud.floor + ': ';

  const floor: HTMLSpanElement = document.createElement('span');

  floorContainer.append(floorLabel, floor);

  hud.append(hpContainer, floorContainer);

  bindPlayerHp(playerHp);
  bindComputerHp(computerHp);
  bindFloor(floor);
};

/**
 * Get the value of the player HP
 * @returns {number} Value of the player HP
 */
export const getPlayerHp = (): number => {
  return playerHp;
};

/**
 * Get the value of the computer HP
 * @returns {number} Value of the computer HP
 */
export const getComputerHp = (): number => {
  return computerHp;
};

/**
 * Get the value of the floor
 * @returns {number} Value of the floor
 */
export const getFloor = (): number => {
  return floor;
};

/**
 * Set the value of the player HP then set to bound element
 * @param {number} newPlayerHp New value of the player HP
 */
export const setPlayerHp = (newPlayerHp: number): void => {
  playerHp = newPlayerHp;

  window.dispatchEvent(new CustomEvent('updatePlayerHp'));
};

/**
 * Set the value of the computer HP then set to bound element
 * @param {number} newComputerHp New value of the computer HP
 */
export const setComputerHp = (newComputerHp: number): void => {
  computerHp = newComputerHp;

  window.dispatchEvent(new CustomEvent('updateComputerHp'));
};

/**
 * Set the value of the floor then set to bound element
 * @param {number} newFloor New value of the floor
 */
export const setFloor = (newFloor: number): void => {
  floor = newFloor;

  window.dispatchEvent(new CustomEvent('updateFloor'));
};

/**
 * Bind the player HP element when the player HP value changes
 * @param {HTMLElement} elm HTML element of the player HP
 */
export const bindPlayerHp = (elm: HTMLElement) => {
  elm.innerText = playerHp.toString();

  window.addEventListener('updatePlayerHp', (): void => {
    elm.innerText = playerHp.toString();
  });
};

/**
 * Bind the computer HP element when the computer HP value changes
 * @param {HTMLElement} elm HTML element of the computer HP
 */
export const bindComputerHp = (elm: HTMLElement) => {
  elm.innerText = computerHp.toString();

  window.addEventListener('updateComputerHp', (): void => {
    elm.innerText = computerHp.toString();
  });
};

/**
 * Bind the floor element when the floor value changes
 * @param {HTMLElement} elm HTML element of the floor
 */
export const bindFloor = (elm: HTMLElement) => {
  elm.innerText = floor.toString();

  window.addEventListener('updateFloor', (): void => {
    elm.innerText = floor.toString();
  });
};
