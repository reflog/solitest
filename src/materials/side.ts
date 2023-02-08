import * as THREE from "three";

export const DeckSidesMaterial = function () {
  return new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: `
    varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
    `,
    fragmentShader: `
    
varying vec2 vUv;
void main() {
    float line = step(0.01, mod(vUv.x, 0.02));
    gl_FragColor = vec4(vec3(line), 1.0);
}
    `,
  });
};
