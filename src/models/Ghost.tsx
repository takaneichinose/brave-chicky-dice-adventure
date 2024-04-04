import { Group, Mesh, Object3DEventMap, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';

import { useAnimations, useGLTF } from '@react-three/drei';

import { ASSETS } from '@/constants/asset';
import { CHARACTER_ANIMATION, GHOST_SETTINGS } from '@/constants/settings';
import { getModelPath } from '@/utils/asset';

const model = getModelPath(ASSETS.ghost);

export const Ghost = () => {
  const [action, setAction] = useState<string>(CHARACTER_ANIMATION.Idle);
  const [position, setPosition] = useState<Vector3>(GHOST_SETTINGS.position);

  const group = useRef<Group<Object3DEventMap>>(null);
  const { animations, nodes } = useGLTF(model);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[action]?.play();
  }, [actions, action]);

  return (
    <group
      ref={group}
      dispose={null}
      position={position}
      rotation={GHOST_SETTINGS.rotation}
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
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(model);
