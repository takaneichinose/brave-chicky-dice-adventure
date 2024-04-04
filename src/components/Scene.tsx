import React from 'react';

interface SceneProps {
  children?: React.ReactNode;
}

const Scene = ({ children }: SceneProps) => (
  <div className="bg-white w-full max-h-screen aspect-video">{children}</div>
);

export default Scene;
