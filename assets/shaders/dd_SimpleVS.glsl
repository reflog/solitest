#version 330

uniform mat4 matVP;
uniform mat4 matGeo;
uniform sampler2D s;

layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 uv;

out vec4 color;

void main() {
   color = texture(s, vec2(1.0,1.0));
   gl_Position = matVP * matGeo * vec4(pos, 1);
}
