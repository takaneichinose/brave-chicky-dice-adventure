import { useProgress } from '@react-three/drei';

import CenterItems from '@/components/CenterItems';
import Label from '@/components/Label';

const Preload = () => {
  const { progress } = useProgress();

  return (
    <CenterItems className="text-pico-8 bg-pico-1 w-full h-full">
      <Label>Loading... {Math.round(progress * 100) / 100}%</Label>
    </CenterItems>
  );
};

export default Preload;
