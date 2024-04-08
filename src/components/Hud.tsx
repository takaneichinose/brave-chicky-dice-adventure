import HudScreen from '@/components/HudScreen';
import HpContainer from '@/components/HpContainer';
import Label from '@/components/Label';

type HudProps = {
  playerHP: number;
  enemyHP: number;
  floor: number;
};

const Hud = ({ playerHP, enemyHP, floor }: HudProps) => {
  return (
    <HudScreen>
      <HpContainer>
        <Label>HP: {playerHP}</Label>
        <Label>Enemy: {enemyHP}</Label>
      </HpContainer>
      <Label>Floor: {floor}</Label>
    </HudScreen>
  );
};

export default Hud;
