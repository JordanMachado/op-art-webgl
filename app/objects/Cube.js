'use strict';

import THREE from 'three';
import _ from 'underscore';

const glslify = require('glslify')


export default class Cube extends THREE.Object3D {
  constructor() {
    super();
    this.uniforms = {
      u_resolution: { // float initialized to 0
        type: "v2",
        value: new THREE.Vector2(window.innerWidth/2,window.innerHeight/2)
      },
      u_strip_size: {
        type:"f",
        value:0.00
      }
    }
    this.geom = new THREE.BoxGeometry(200, 200, 200);

    let fragment = glslify('../shader/cube/cube.frag');
    // console.log(fragment);

    let loop = "float alpha = 1.;";
    for(let i =0,strip =50;i<strip;i++) {
      if(i%2==0) {
        let string = "\n if(vUv.y>"+parseFloat(i/strip).toFixed(2)+"+ u_strip_size && vUv.y<"+parseFloat((i+1)/strip).toFixed(2)+"+ u_strip_size){alpha = 0.0;}";
        loop += string;

      }
    }
    let fragment_compiled = fragment.replace("#loop#", loop);
    // console.log(fragment_compiled);
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('../shader/cube/cube.vert'),
      fragmentShader: fragment_compiled,
      // side: THREE.DoubleSide
      transparent:true
    });

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
    this.tick = 0;
    this.lastCall = 0;


  }
  rotate(type) {

    if(Date.now()- this.lastCall>200){

    this.lastCall = Date.now();
    var rotationX = this.rotation.x;
    var rotationY = this.rotation.y;
    var rotationZ = this.rotation.z;

    switch (type) {
      // right = 0
      case 0:
        rotationY += 90*Math.PI/180
        break;
      // left = 1
      case 1:
        rotationY -= 90*Math.PI/180
        break;
      // bottom = 2
      case 2:
        rotationX += 90*Math.PI/180
        break;
      // top = 3
      case 3:
        rotationX -= 90*Math.PI/180
        break;
      default:

      break;

    }
    TweenLite.to(this.rotation,0.3,{
      x:rotationX,
      y:rotationY,
      z:rotationZ,
      ease:Quad.easeOut
    });
    }

  }
  update() {

    // this.rotation.y += 0.01;
    // this.rotation.z += 0.01;
    this.tick +=0.1;
    // this.uniforms.u_strip_size.value = Math.sin(this.tick)*0.05;
    // this.position.z = Math.sin(this.tick)*50;
    // console.log(  this.uniforms.u_strip_size.value);
  }
}
