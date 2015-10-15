varying vec2 vUv;
uniform float u_strip_size;
void main()
{
  #loop#
  if(gl_FrontFacing) {
  gl_FragColor = vec4(0.2,0.2,0.2, alpha);
  } else {
    gl_FragColor = vec4(0.25,0.25,0.25, alpha);
  }

}
