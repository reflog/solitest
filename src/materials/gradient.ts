import { extend, MaterialNode, Object3DNode } from "@react-three/fiber";
import { ThreeElements } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Color } from "@react-three/fiber";

const GradientMaterial = shaderMaterial(
  { color1: new THREE.Color(0xffffff), color2: new THREE.Color(0x000000) },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  // fragment shader
  `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(mix(color1, color2, vUv.y),1.0);
    }`
);

extend({ GradientMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    gradientMaterial: MaterialNode<
      THREE.ShaderMaterial & {
        color1: Color;
        color2: Color;
      },
      typeof GradientMaterial
    >;
  }
}
