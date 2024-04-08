import React from 'react';

import DialogWindow from '@/components/DialogWindow';
import Label from '@/components/Label';
import Link from '@/components/Link';

type DiceWindowProps = {
  shown?: boolean;
  onDiceRoll?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
};

const DiceWindow = ({ shown = true, onDiceRoll }: DiceWindowProps) => {
  const handleLinkClickEvent = () => {
    if (onDiceRoll != null) {
      onDiceRoll();
    }
  };

  return (
    <DialogWindow shown={shown}>
      <Link onClick={handleLinkClickEvent}>
        <Label>Roll the dice</Label>
      </Link>
    </DialogWindow>
  );
};

export default DiceWindow;
