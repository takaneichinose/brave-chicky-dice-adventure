import {
  finishedEventName,
  progressEventName,
  startEventName,
} from '../Constants/Events';
import {
  EventDetail,
  FinishedEventDetail,
  ProgressEventDetail,
  StartEventDetail,
} from '../Types/Events';

import { resize } from './Game';

/**
 *
 * @param {string} eventName Event name
 * @param {EventDetail} detail Detail of the event
 */
export function emit(eventName: string, detail: EventDetail): void {
  const customEvent: CustomEvent = new CustomEvent(eventName, detail);

  window.dispatchEvent(customEvent);
}

window.addEventListener('resize', () => {
  resize();
});

window.addEventListener(startEventName, (event: Event | StartEventDetail) => {
  const { detail } = event as StartEventDetail;

  console.log(detail);
});

window.addEventListener(
  progressEventName,
  (event: Event | ProgressEventDetail) => {
    const { detail } = event as ProgressEventDetail;

    console.log(detail);
  },
);

window.addEventListener(
  finishedEventName,
  (event: Event | FinishedEventDetail) => {
    const { detail } = event as FinishedEventDetail;

    console.log(detail);
  },
);
