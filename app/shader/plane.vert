#pragma glslify: pnoise = require(./vendors/webgl-noise)

uniform float u_time;
varying float vDisplacement;
varying vec2 vUv;
float displacementAmout;

void main()
{
  vUv = uv;
  float d = distance(position.xy,vec2(0,0));
  displacementAmout = max(80.0-d/2.,5.0);
  float displacement =  displacementAmout * pnoise( 100.05 * position + vec3(2.0* u_time), vec3( 10.0,150.0,10.0 ) ,3.23);
  // float displacement =  0.0;

  vDisplacement = displacement;
  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
