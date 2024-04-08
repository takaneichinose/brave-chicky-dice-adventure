import React from 'react';

import { Transition } from '@headlessui/react';

import { clsx } from 'clsx';

type DialogWindowProps = {
  children?: React.ReactNode;
  className?: string;
  shown?: boolean;
  onFadeIn?: () => void;
  onFadeOut?: () => void;
};

const DialogWindow = ({
  children,
  className = '',
  shown = true,
  onFadeIn,
  onFadeOut,
}: DialogWindowProps) => {
  const handleTransitionEnd = () => {
    if (shown && onFadeIn != null) {
      onFadeIn();
    } else if (shown && onFadeOut != null) {
      onFadeOut();
    }
  };

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={clsx(
        'bg-pico-1 p-4 md:p-6 lg:p-8',
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        className,
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </Transition>
  );
};

export default DialogWindow;
