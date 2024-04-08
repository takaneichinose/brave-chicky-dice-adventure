import React from 'react';

import CenterItems from '@/components/CenterItems';

type ScreenProps = {
  children?: React.ReactNode;
};

const Screen = ({ children }: ScreenProps) => (
  <CenterItems className="bg-pico-1 w-screen h-screen">{children}</CenterItems>
);

export default Screen;
