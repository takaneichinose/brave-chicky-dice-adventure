/**
 *
 * @param {string} eventName Event name
 * @param {{ detail: Record<string, unknown> }} detail Detail of the event
 */
export function emit(
  eventName: string,
  detail: { detail: Record<string, unknown> },
): void {
  const customEvent: CustomEvent = new CustomEvent(eventName, detail);

  window.dispatchEvent(customEvent);
}
