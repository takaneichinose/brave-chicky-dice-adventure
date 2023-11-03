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

import { initialize, models } from './Classes/Game';
import { assets } from './Constants/Assets';

import './style.css';
import { scene } from './Classes/Create';

void initialize('brave-chicky-dice-adventure', assets, create, update);

function create(): void {
  console.log(models);
  scene.add(models.Chicky);
}

function update(delta: number): void {
  console.log(delta);
}

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
