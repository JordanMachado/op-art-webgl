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
      }
    }
    this.geo = new THREE.PlaneGeometry(500, 100, 500, 1);
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('../shader/plane.vert'),
      fragmentShader: glslify('../shader/plane.frag'),
      wireframe: false,
      side: THREE.DoubleSide

    });


    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.rotation.x = 90 * Math.PI / 180;
    this.add(this.mesh);
  }

  update() {
    this.uniforms.u_time.value = 0.0003 * (Date.now() - this.start);
  }
}
