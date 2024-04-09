import { useRef, useState } from 'react';

import { Group, Mesh, Object3DEventMap, Vector3 } from 'three';

import { useGLTF } from '@react-three/drei';

import { ASSETS } from '@/constants/asset';
import { CHICKY_SETTINGS } from '@/constants/settings';
import { Command } from '@/enums/game';
import { useActorAnimation } from '@/hooks/useActorAnimation';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.chicky);

type ChickyProps = {
  command?: Command;
};

export const Chicky = ({ command }: ChickyProps) => {
  const [position, setPosition] = useState<Vector3>(CHICKY_SETTINGS.position);

  const ref = useRef<Group<Object3DEventMap>>(null);
  const { animations, nodes } = useGLTF(model);

  const onActionEnd = () => {
    console.log('test');
  };

  useActorAnimation({ command, animations, ref, onActionEnd });

  return (
    <group
      ref={ref}
      dispose={null}
      position={position}
      rotation={CHICKY_SETTINGS.rotation}
    >
      <group name="blockbench_export">
        <group>
          <group name="Chicky">
            <group name="Helmet" position={[0, 0.847, 0.013]}>
              <mesh
                name="Helmet_1"
                castShadow
                receiveShadow
                geometry={(nodes.Helmet_1 as Mesh).geometry}
                material={(nodes.Helmet_1 as Mesh).material}
                position={[0, -0.847, -0.013]}
              />
            </group>
            <group name="Body">
              <group name="Beak">
                <group name="LowerBeak" position={[0, 0.391, 0.334]}>
                  <mesh
                    name="LowerBeak_1"
                    castShadow
                    receiveShadow
                    geometry={(nodes.LowerBeak_1 as Mesh).geometry}
                    material={(nodes.LowerBeak_1 as Mesh).material}
                    position={[0, -0.078, -0.016]}
                  />
                </group>
                <mesh
                  name="UpperBeak"
                  castShadow
                  receiveShadow
                  geometry={(nodes.UpperBeak as Mesh).geometry}
                  material={(nodes.UpperBeak as Mesh).material}
                />
              </group>
              <mesh
                name="Body_1"
                castShadow
                receiveShadow
                geometry={(nodes.Body_1 as Mesh).geometry}
                material={(nodes.Body_1 as Mesh).material}
                position={[0, 0.496, -0.008]}
              />
            </group>
            <group
              name="LeftHand"
              position={[0.438, 0.234, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                name="Hand"
                castShadow
                receiveShadow
                geometry={(nodes.Hand as Mesh).geometry}
                material={(nodes.Hand as Mesh).material}
              />
              <mesh
                name="Buckler"
                castShadow
                receiveShadow
                geometry={(nodes.Buckler as Mesh).geometry}
                material={(nodes.Buckler as Mesh).material}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              />
            </group>
            <group name="RightHand" position={[-0.438, 0.234, 0]}>
              <group name="Sword">
                <mesh
                  name="Handle"
                  castShadow
                  receiveShadow
                  geometry={(nodes.Handle as Mesh).geometry}
                  material={(nodes.Handle as Mesh).material}
                  rotation={[Math.PI / 2, 0, 0]}
                />
                <mesh
                  name="Decoration"
                  castShadow
                  receiveShadow
                  geometry={(nodes.Decoration as Mesh).geometry}
                  material={(nodes.Decoration as Mesh).material}
                  position={[0.438, -0.234, 0]}
                  rotation={[0, 0, Math.PI / 2]}
                />
                <mesh
                  name="SwordGuard"
                  castShadow
                  receiveShadow
                  geometry={(nodes.SwordGuard as Mesh).geometry}
                  material={(nodes.SwordGuard as Mesh).material}
                />
                <mesh
                  name="Blade"
                  castShadow
                  receiveShadow
                  geometry={(nodes.Blade as Mesh).geometry}
                  material={(nodes.Blade as Mesh).material}
                />
              </group>
              <mesh
                name="Hand_1"
                castShadow
                receiveShadow
                geometry={(nodes.Hand_1 as Mesh).geometry}
                material={(nodes.Hand_1 as Mesh).material}
              />
            </group>
            <group name="RightFoot" position={[-0.188, 0.094, -0.006]}>
              <mesh
                name="Foot"
                castShadow
                receiveShadow
                geometry={(nodes.Foot as Mesh).geometry}
                material={(nodes.Foot as Mesh).material}
                position={[0, -0.003, 0.002]}
              />
            </group>
            <group name="LeftFoot" position={[0.188, 0.094, 0]}>
              <mesh
                name="Foot_1"
                castShadow
                receiveShadow
                geometry={(nodes.Foot_1 as Mesh).geometry}
                material={(nodes.Foot_1 as Mesh).material}
                position={[0, -0.003, -0.004]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(model);
