import * as THREE from "three";
import { Color } from "three";
import fragmentShader from "./range.fs?raw";
import vertexShader from "./range.vs?raw";

export const RangeMaterial = function (c: Color, t: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      color: { value: c },
      t: { value: t },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    vertexShader,
    fragmentShader,
  });
};
