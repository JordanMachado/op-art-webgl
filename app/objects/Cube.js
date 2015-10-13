'use strict';

import THREE from 'three';
const glslify = require('glslify')


export default class Cube extends THREE.Object3D {
  constructor() {
    super();
    this.uniforms = {
      u_resolution: { // float initialized to 0
        type: "v2",
        value: new THREE.Vector2(window.innerWidth/2,window.innerHeight/2)
      }
    }
    this.geom = new THREE.BoxGeometry(200, 200, 200);

    let fragment = glslify('../shader/cube/cube.frag');

    let loop = "float alpha = 1.;";
    for(let i =0,strip =100;i<strip;i++) {
      if(i%2==0) {
        let string = "\n if(vUv.y>"+parseFloat(i/strip).toFixed(2)+" && vUv.y<"+parseFloat((i+1)/strip).toFixed(2)+"){alpha = 0.0;}";
        loop += string;

      }
    }
    let fragment_compiled = fragment.replace("#loop#", loop);
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('../shader/cube/cube.vert'),
      fragmentShader: fragment_compiled,
      // side: THREE.DoubleSide
      transparent:true
    });

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
