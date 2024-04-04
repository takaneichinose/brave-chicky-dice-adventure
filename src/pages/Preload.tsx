import { Html, useProgress } from '@react-three/drei';

const Preload = () => {
  const { progress } = useProgress();

  // TODO: Progress bar
  return (
    <Html>
      <div className="flex justify-center items-center">{progress}</div>
    </Html>
  );
};

export default Preload;
