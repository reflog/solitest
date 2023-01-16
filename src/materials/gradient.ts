import * as THREE from "three";
import { Color } from "three";

export const GradientMaterial = function (c1: Color, c2: Color) {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: c1 },
      color2: { value: c2 },
    },

    // vertex shader
    vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
    // fragment shader

    fragmentShader: `
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(mix(color1, color2, vUv.y),1.0);
  }`,
  });
};
