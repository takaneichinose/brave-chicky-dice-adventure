import DialogWindow from '@/components/DialogWindow';
import Link from '@/components/Link';

type CommandWindowProps = {
  shown?: boolean;
  value?: number;
  doCommand?: (command: string) => void;
};

const CommandWindow = ({
  shown = true,
  value,
  doCommand,
}: CommandWindowProps) => {
  const handleSkipClickEvent = () => {
    if (doCommand != null) {
      doCommand('Skip');
    }
  };

  const handleDefendClickEvent = () => {
    if (doCommand != null) {
      doCommand('Defend');
    }
  };

  const handleAttackClickEvent = () => {
    if (doCommand != null) {
      doCommand('Attack');
    }
  };

  const handleHealClickEvent = () => {
    if (doCommand != null) {
      doCommand('Heal');
    }
  };

  // TODO: Disabled by value
  // value
  return (
    <DialogWindow
      shown={shown}
      className="w-1/2 sm:w-64 lg:w-80 flex-col space-y-2"
    >
      <Link onClick={handleSkipClickEvent}>Skip</Link>
      <Link onClick={handleDefendClickEvent}>Defend</Link>
      <Link onClick={handleAttackClickEvent}>Attack</Link>
      <Link onClick={handleHealClickEvent}>Heal</Link>
    </DialogWindow>
  );
};

export default CommandWindow;
