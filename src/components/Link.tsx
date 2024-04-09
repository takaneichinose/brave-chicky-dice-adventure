import React, { forwardRef } from 'react';

import clsx from 'clsx';

type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.ButtonHTMLAttributes<HTMLAnchorElement>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      className = '',
      disabled = false,
      onClick,
      ...props
    }: LinkProps,
    ref,
  ) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (onClick != null) {
        onClick(event);
      }
    };

    return (
      <a
        ref={ref}
        href="#"
        className={clsx(
          'text-md md:text-2xl lg:text-4xl',
          'pl-4 md:pl-6 lg:pl-8',
          'block relative',
          'before:text-inherit before:absolute before:top-0 before:left-0',
          !disabled && 'text-pico-8 hover:before:content-[">"]',
          disabled && 'text-pico-6 cursor-not-allowed',
          className,
        )}
        onClick={handleClickEvent}
        {...props}
      >
        {children}
      </a>
    );
  },
);

export default Link;
