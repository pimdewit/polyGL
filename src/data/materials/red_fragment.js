varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
float random (in float x) {return fract(sin(x)*1e4);}
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);}
float pattern(vec2 st, vec2 v, float t) {vec2 p = floor(st+v);return step(t, random(0.1+p*.000001)+random(p.x)*0.5 );}

void main() {
  vec2 position = -1.0 + 2.0 * vUv;
  position.x *= u_resolution.x / u_resolution.y;
  vec2 grid = vec2(32.0, 2.0);
  position *= grid;
  vec2 ipos = floor(position);
  vec2 fpos = fract(position);
  vec2 vel = vec2(u_time * 2.0 * max(grid.x, grid.y));
  vel *= vec2(-1.,0.0) * random(1.0+ipos.y);
  vec2 offset = vec2(0.4, 0.);
  vec3 color = vec3(0.);
  color.r = pattern(position + offset, vel, 0.5 + u_pointer.x / u_resolution.x);
  color.g = pattern(position, vel, 0.5+u_pointer.x / u_resolution.x);
  color.b = pattern(position - offset, vel, 0.5 + u_pointer.x / u_resolution.x);
  color *= step(0.0, fpos.y);
  gl_FragColor = vec4(1.0 - color, 1.0);
}