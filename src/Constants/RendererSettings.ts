import * as THREE from 'three';

/**
 * Antialias settings of the renderer
 */
export const antialias = true;

/**
 * Background alpha of the renderer
 */
export const alpha = true;

/**
 * Shadowmap of the renderer
 */
export const ShadowMap = {
  enabled: true,
  type: THREE.PCFSoftShadowMap,
};
