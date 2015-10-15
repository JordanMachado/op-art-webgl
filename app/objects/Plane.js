'use strict';

import THREE from 'three';
const glslify = require('glslify')


export default class Plane extends THREE.Object3D {
  constructor() {
    super();
    this.start = Date.now();

    this.uniforms = {
      u_time: { // float initialized to 0
        type: "f",
        value: 0.0
      },
      u_freq: { // float initialized to 0
        type: "f",
        value: 0.0
      },
      u_position: {
        type:"1fv",
        value: [ 0.1, 50.2, 0.3, 0.4, 0.5 ]
      }
    }
    this.geo = new THREE.PlaneGeometry(500, 100, 500, 1);
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('../shader/plane/plane.vert'),
      fragmentShader: glslify('../shader/plane/plane.frag'),
      wireframe: false,
      side: THREE.DoubleSide

    });


    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.rotation.x = 90 * Math.PI / 180;
    this.add(this.mesh);
  }

  update(freq,freq5) {
    this.uniforms.u_time.value = 0.0003 * (Date.now() - this.start);
    this.uniforms.u_freq.value = freq;

    for (var i = 0; i < 5; i++) {
      // console.log(parseFloat(freq5[i]).toFixed(1));
      this.uniforms.u_position.value[i] = freq5[i]

    }

  }
}
