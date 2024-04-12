const fade: HTMLDivElement = document.querySelector('#fade') as HTMLDivElement;

/**
 * export the screen from black
 */
export const fadeIn = (callback?: () => void): void => {
  fade.classList.remove('opacity-1');
  fade.classList.add('opacity-0');

  fadeProcess(callback);
};

/**
 * Fade out the screen to black
 */
export const fadeOut = (callback?: () => void): void => {
  fade.classList.remove('opacity-0');
  fade.classList.add('opacity-1');

  fadeProcess(callback);
};

/**
 * Common process of fading
 * @param {() => void | undefined} callback Callback function
 */
const fadeProcess = (callback?: () => void): void => {
  const transitionEndHandler = (): void => {
    fade.removeEventListener('transitionend', transitionEndHandler);

    if (callback != null) callback();
  };

  fade.addEventListener('transitionend', transitionEndHandler);
};
