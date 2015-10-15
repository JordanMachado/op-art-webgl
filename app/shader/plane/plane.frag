uniform float u_time;
varying float vDisplacement;
varying vec2 vUv;
void main()
{
  vec2 uv = vec2(gl_FragCoord.xy / vUv);
  float radius = length(uv);
  float amod = mod(30.0 * u_time - 150.0 * log(radius), 50.0);

   vec3 color = vec3(amod < 15.0 ? 1. : 0.2);
  gl_FragColor = vec4( color, 1.0 );
}
