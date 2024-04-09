import DialogWindow from '@/components/DialogWindow';
import Link from '@/components/Link';
import { COMMAND_LIST } from '@/constants/settings';
import { Command } from '@/enums/game';
import { checkDisabledCommand, getCommandName } from '@/utils/game';

type CommandWindowProps = {
  shown?: boolean;
  value?: number;
  doCommand?: (command: Command) => void;
};

const CommandWindow = ({
  shown = true,
  value,
  doCommand,
}: CommandWindowProps) => {
  const handleCommandClickEvent = (command: Command) => {
    if (doCommand != null) {
      doCommand(command);
    }
  };

  return (
    <DialogWindow
      shown={shown}
      className="w-1/2 sm:w-64 lg:w-80 flex-col space-y-2"
    >
      {COMMAND_LIST.map((command: Command) => {
        const commandName = getCommandName(command);

        return (
          <Link
            key={command}
            onClick={() => handleCommandClickEvent(command)}
            disabled={
              value != null ? checkDisabledCommand(command, value) : true
            }
          >
            {commandName}
          </Link>
        );
      })}
    </DialogWindow>
  );
};

export default CommandWindow;
