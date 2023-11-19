import { AnimationAction, Fog, Mesh } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

import { camera, canvas, scene } from './Classes/Create';
import { initialize, models } from './Classes/Game';
import { play, stop } from './Classes/Update';
import { assets } from './Constants/Assets';
import { pico13 } from './Constants/Colors';
import {
  defaultY,
  fogFar,
  fogNear,
  stageScale,
} from './Constants/GameSettings';

import * as Chicky from './Constants/Chicky';

import './style.css';

// TODO: DELETE ME
let controls: OrbitControls;

// Initialize the game
void initialize('brave-chicky-dice-adventure', assets, create, update);

/**
 * Set the stage model and add to the scene
 */
function setStage(): void {
  const stage: THREE.Group = models.Stage.model;

  stage.receiveShadow = true;

  stage.scale.x *= stageScale;
  stage.scale.z *= stageScale;

  stage.position.y = defaultY;

  stage.traverse((object: THREE.Object3D) => {
    if (object instanceof Mesh) {
      object.receiveShadow = true;
    }
  });

  scene.add(stage);
}

/**
 * Decorate the stage using the loaded models
 */
function decorateStage(): void {
  scene.fog = new Fog(pico13, fogNear, fogFar);

  models.Bush.model.position.x = -1.25;
  models.Bush.model.position.y = defaultY;
  models.Bush.model.position.z = 1;
  models.Stone.model.position.x = 1;
  models.Stone.model.position.y = defaultY;
  models.Stone.model.position.z = 0.5;
  models.Tree.model.position.x = -0.5;
  models.Tree.model.position.y = defaultY;
  models.Tree.model.position.z = -1.5;
  models.Tree2.model.position.x = 1;
  models.Tree2.model.position.y = defaultY;
  models.Tree2.model.position.z = -0.25;

  scene.add(models.Bush.model);
  scene.add(models.Stone.model);
  scene.add(models.Tree.model);
  scene.add(models.Tree2.model);

  setStage();
}

/**
 * Set the animation settings of chicky
 */
function setChickyAnimation(): void {
  play(models.Chicky, Chicky.Animation.Idle, true);

  models.Chicky.mixer.addEventListener(
    'finished',
    (details: { action: AnimationAction; direction: number }) => {
      const clip: THREE.AnimationClip = details.action.getClip();

      if (clip.name === Chicky.Animation.Attack) {
        stop(models.Chicky, Chicky.Animation.Attack);
        play(models.Chicky, Chicky.Animation.Idle, true);
      }
    },
  );
}

/**
 * Set Chicky model into the stage
 */
function setChicky(): void {
  const chicky: THREE.Group = models.Chicky.model;

  chicky.traverse((object: THREE.Object3D) => {
    if (object instanceof Mesh) {
      object.castShadow = true;
    }
  });

  chicky.position.y = defaultY;

  scene.add(chicky);

  setChickyAnimation();
}

/**
 * Create callback function
 */
function create(): void {
  // TODO: DELETE ME
  controls = new OrbitControls(camera, canvas);

  decorateStage();
  setChicky();
}

/**
 * Update callback function
 * @param {number} delta Delta time computed by ThreeJS
 */
function update(delta: number): void {
  models.Chicky.mixer.update(delta);
  // console.log(delta);

  controls.update();
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

// TODO: DELETE ME
let playing = false;

// TODO: DELETE ME
window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (playing) return;

  playing = true;

  if (event.key === 'w') {
    stop(models.Chicky, Chicky.Animation.Idle);
    play(models.Chicky, Chicky.Animation.Walk, true);
  } else if (event.key === 'Control') {
    stop(models.Chicky, Chicky.Animation.Idle);
    play(models.Chicky, Chicky.Animation.Guard);
  }
});

// TODO: DELETE ME
window.addEventListener('keyup', () => {
  stop(models.Chicky, Chicky.Animation.Walk);
  stop(models.Chicky, Chicky.Animation.Guard);
  play(models.Chicky, Chicky.Animation.Idle, true);

  playing = false;
});

// TODO: DELETE ME
window.addEventListener('click', () => {
  stop(models.Chicky, Chicky.Animation.Walk);
  stop(models.Chicky, Chicky.Animation.Guard);
  stop(models.Chicky, Chicky.Animation.Idle);
  play(models.Chicky, Chicky.Animation.Attack);
});
