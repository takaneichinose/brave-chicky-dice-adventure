import React from 'react';

type HudScreenProps = {
  children?: React.ReactNode;
};

const HudScreen = ({ children }: HudScreenProps) => {
  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8 absolute top-0 left-0">
      {children}
    </div>
  );
};

export default HudScreen;
