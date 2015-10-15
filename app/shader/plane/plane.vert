#pragma glslify: pnoise = require(../vendors/webgl-noise)

uniform float u_time;
varying float vDisplacement;
varying vec2 vUv;
float displacementAmout;
uniform float u_freq;
uniform float u_position[5];

void main()
{
  vUv = uv;
  float d = distance(position.xy,vec2(0,0));
  displacementAmout = max(80.0-d/2.,5.0);


  if(position.x>0. && position.x<20.){
    displacementAmout +=u_position[0];
  }

  if(position.x>30. && position.x<50.){
    displacementAmout +=u_position[1];
  }
  if(position.x>-50. && position.x<-30.){
    displacementAmout +=u_position[2];
  }

  if(position.x>80. && position.x<90.){
    displacementAmout +=u_position[3];
  }
  if(position.x>-90. && position.x<-80.){
    displacementAmout +=u_position[4];
  }

  float displacement =  (u_freq*1.5) * displacementAmout * pnoise( 100.05 * position + vec3(2.0* u_time), vec3( 10.0,150.0,10.0 ) ,3.23);
  // float displacement =  0.0;

  vDisplacement = displacement;
  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
