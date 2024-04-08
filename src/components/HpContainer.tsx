import React from 'react';

type HpContainerProps = {
  children?: React.ReactNode;
};

const HpContainer = ({ children }: HpContainerProps) => {
  return <div className="w-full flex justify-between">{children}</div>;
};

export default HpContainer;
