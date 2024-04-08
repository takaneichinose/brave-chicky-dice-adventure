import React from 'react';

type SceneProps = {
  children?: React.ReactNode;
};

const Scene = ({ children }: SceneProps) => (
  <div className="bg-pico-29 w-full max-h-screen relative aspect-video">
    {children}
  </div>
);

export default Scene;
