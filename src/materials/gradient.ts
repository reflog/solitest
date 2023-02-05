import * as THREE from "three";
import { Color } from "three";
import fragmentShader from "./gradient.fs?raw";
import vertexShader from "./gradient.vs?raw";

export const GradientMaterial = function (c1: Color, c2: Color) {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: c1 },
      color2: { value: c2 },
    },
    vertexShader,
    fragmentShader,
  });
};
