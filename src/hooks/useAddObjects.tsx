import { useEffect, useState } from 'react';

import { Euler, Vector3 } from 'three';
import { degToRad, randFloat } from 'three/src/math/MathUtils.js';

import { IMinMax, ISettings } from '@/types/asset';

interface AddObjectsProps {
  count?: number;
  objectX?: IMinMax;
  objectZ?: IMinMax;
}

export const useAddObjects = ({
  count = 0,
  objectX = { min: 0, max: 0 },
  objectZ = { min: 0, max: 0 },
}: AddObjectsProps) => {
  const [objectList, setObjectList] = useState<Array<ISettings>>([]);

  useEffect(() => {
    const tmpObjectList: Array<ISettings> = [];

    for (let i = 0; i < count; i++) {
      const posX: number = randFloat(objectX.min, objectX.max);
      const posZ: number = randFloat(objectZ.min, objectZ.max);
      const rotY: number = randFloat(degToRad(0), degToRad(360));

      tmpObjectList.push({
        position: new Vector3(posX, 0, posZ),
        rotation: new Euler(0, rotY, 0),
      });
    }

    setObjectList([...tmpObjectList]);
  }, [count, objectX, objectZ]);

  return objectList;
};
