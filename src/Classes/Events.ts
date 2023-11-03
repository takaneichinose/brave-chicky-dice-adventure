import { resize } from './Game';

/**
 *
 * @param {string} eventName Event name
 * @param {Record<string, unknown>} detail Detail of the event
 */
export function emit(eventName: string, detail: Record<string, unknown>): void {
  const customEvent: CustomEvent = new CustomEvent(eventName, {
    detail,
  });

  window.dispatchEvent(customEvent);
}

window.addEventListener('resize', () => {
  resize();
});
