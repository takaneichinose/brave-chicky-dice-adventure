export type ActorProps = {
  onAttackEnd: () => void;
};

export type Animation = {
  Attack: 'Attack';
  Guard: 'Guard';
  Idle: 'Idle';
  Walk: 'Walk';
};
