export type LabelDetail = {
  preload: {
    loading: string;
  };
  hud: {
    playerHp: string;
    computerHp: string;
    floor: string;
  };
  commands: {
    rollTheDice: string;
    skip: string;
    defend: string;
    attack: string;
    heal: string;
    retry: string;
  };
  gameOver: string;
};

export type Labels = {
  en: LabelDetail;
};
