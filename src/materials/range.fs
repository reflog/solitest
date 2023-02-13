uniform vec3 color;
uniform float t;
uniform vec2 resolution;
varying vec3 vUv;

void main() {
  if(vUv.z < t*-1.0) {
    gl_FragColor = vec4(1, 1, 0, 1);
  } else {
    gl_FragColor = vec4(color, 1.0);
  }
}