import React from 'react';

interface ScreenProps {
  children?: React.ReactNode;
}

const Screen = ({ children }: ScreenProps) => (
  <div className="bg-black w-screen h-screen flex items-center justify-center">
    {children}
  </div>
);

export default Screen;
