uniform vec3 color;
uniform float t;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  if(uv.y < t) {
    gl_FragColor = vec4(color, 1.0);
  } else {
    gl_FragColor = vec4(1, 1, 0, 1);
  }
}