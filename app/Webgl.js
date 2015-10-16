'use strict';

import Plane from './objects/Plane';
import Cube from './objects/Cube';
import THREE from 'three';
import Utils from './Utils';
import _ from 'underscore';
window.THREE = THREE;
import dat from 'dat-gui';
import CanvasManager from './canvas/CanvasManager';
let gui;
let start = Date.now();
// let controls;


export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 1000;
    this.camera.rotation.x = -9 * Math.PI/180;
    window.camera = this.camera

    let canvas = document.querySelector("#webgl");
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha:true
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor( 0xFFFFFF, 1 );

    // controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.mouse = {
      x: 0,
      y: 0
    }

    this.cube = new Cube();
    window.cube = this.cube;
    this.scene.add(this.cube);

    this.plane = new Plane();
    this.scene.add(this.plane);




  }
  intro() {
    TweenLite.to(this.camera.position,1,
      {
        z:500,
        ease:Quad.easeOut
      });
      TweenLite.to(this.camera.rotation,1,
        {
          x:0,
          ease:Quad.easeOut
        });
  }


  resize(width, height) {
    this.composer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };

  mousemove(x, y) {
    // console.log(x,y);
    this.mouse = {
      x: x - window.innerWidth / 2,
      y: y - window.innerHeight / 2
    }

  };

  render(data) {
      // this.camera.rotation.x = 9 * Math.PI/180;
    this.renderer.autoClear = false;
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    // this.camera.lookAt(this.scene.position);

    if(data.acuteAverage>0.55){
    // if(data.acuteAverage>0.4){
      this.cube.rotate(Math.floor(Math.random()*4))
    }
    this.plane.update(data.fregAverage,data.freq5);
    this.cube.update();
    // controls.update();

  }
}
