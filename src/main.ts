import {
  finishedEventName,
  progressEventName,
  startEventName,
} from './Constants/Events';
import {
  FinishedEventDetail,
  ProgressEventDetail,
  StartEventDetail,
} from './Types/Events';

import { initialize } from './Classes/Game';
import { models } from './Constants/Assets';

import './style.css';

void initialize('brave-chicky-dice-adventure', models);

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
