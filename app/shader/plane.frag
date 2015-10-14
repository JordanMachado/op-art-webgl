uniform float u_time;
varying float vDisplacement;
varying vec2 vUv;
void main()
{
  vec2 uv = vec2(gl_FragCoord.xy / vUv);
  float angle = 00.0;
  float radius = length(uv);
  float amod = mod(angle+30.0 * u_time - 120.0 * log(radius), 50.0);

   vec3 color = vec3(amod < 15.0 ? 1. : 0.2);
  gl_FragColor = vec4( color, 1.0 );
}
// // varying vec2 vUv;
// uniform float u_time;
//
// void main() {
// ​
//     vec2 uv = vec2(gl_FragCoord.xy / vUv);
// ​
//     float angle = 0.0;
//     float radius = length(uv);
// ​
//     if ( uv.x != 0.0 && uv.y != 0.0 ) {
//       angle = degrees(atan(uv.x, uv.y));
//     }
// ​
//     float amod = mod(angle+30.0 * u_time - 120.0 * log(radius), 30.0);
//     vec3 color = vec3(amod < 15.0 ? 0.7 : 0.1);
//   //  compose the colour using the UV coordinate
//   //  and modulate it with the noise like ambient occlusion
//     vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.5 );
//     gl_FragColor = vec4( 0.1,0.1,0.1, 1.0 );
// }
