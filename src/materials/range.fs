uniform vec3 color;
uniform float t;
uniform vec2 resolution;
varying vec3 vUv;

void main() {
  vec2 uv = vUv.xy / 80.0;
  if(1.0 - uv.y < t) {
    gl_FragColor = vec4(color, 1.0);
  } else {
    gl_FragColor = vec4(1, 1, 0, 1);
  }
}