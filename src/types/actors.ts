export type AnimationSettings = {
  name: string;
  loop: boolean;
};

export type Animations = {
  Attack: AnimationSettings;
  Guard: AnimationSettings;
  Idle: AnimationSettings;
  Walk: AnimationSettings;
  Skip: AnimationSettings;
  Jump: AnimationSettings;
  Heal: AnimationSettings;
  Hurt: AnimationSettings;
  Faint: AnimationSettings;
};
