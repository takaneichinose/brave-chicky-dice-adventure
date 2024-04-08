import React, { forwardRef } from 'react';

import clsx from 'clsx';

type LinkProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.ButtonHTMLAttributes<HTMLAnchorElement>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className = '', onClick, ...props }: LinkProps, ref) => {
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
          'text-pico-8 text-md md:text-2xl lg:text-4x',
          "block pl-5 relative hover:before:content-['>']",
          'before:text-inherit before:absolute before:top-0 before:left-0',
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
