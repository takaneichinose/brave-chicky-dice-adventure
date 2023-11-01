export const Ambient = {
  color: 0xffffff,
  intensity: 1,
};

export const Directional = {
  color: 0xffffff,
  intensity: 1,
  x: -3,
  y: 4,
  z: 3,
  castShadow: true,
  Shadow: {
    bias: -0.0005,
    Camera: {
      near: 0.1,
      far: 1000,
    },
  },
};
