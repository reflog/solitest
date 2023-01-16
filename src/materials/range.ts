import * as THREE from "three";
import { Color } from "three";
import fragmentShader from "./range.glsl?raw";

export const RangeMaterial = function (c: Color, t: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      color: { value: c.toArray() },
      t: { value: t },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },

    // vertex shader
    vertexShader: `
    uniform vec2 resolution;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
    fragmentShader,
  });
};
