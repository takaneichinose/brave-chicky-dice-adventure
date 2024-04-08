import React from 'react';

import { clsx } from 'clsx';

type LabelProps = {
  children?: React.ReactNode;
  className?: string;
};

const Label = ({ children, className = '' }: LabelProps) => {
  return (
    <div
      className={clsx('text-pico-8 text-md md:text-2xl lg:text-4xl', className)}
    >
      {children}
    </div>
  );
};

export default Label;
