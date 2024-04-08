import clsx from 'clsx';
import React from 'react';

type CenterItemsProps = {
  children?: React.ReactNode;
  className?: string;
};

const CenterItems = ({ children, className }: CenterItemsProps) => (
  <div className={clsx(className, 'flex justify-center items-center')}>
    {children}
  </div>
);

export default CenterItems;
