'use strict';


import domready from 'domready';
import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';


let webgl;
let canvasManager;
let gui;


domready(() => {
  // webgl settings
  webgl = new Webgl(window.innerWidth*0.8, window.innerHeight*0.8);
  document.body.appendChild(webgl.renderer.domElement);
  document.addEventListener( 'mousemove', mouseMoveHandler, false );


  // GUI settings
  gui = new dat.GUI();
  gui.add(webgl, 'usePostprocessing');

  // handle resize
  window.onresize = resizeHandler;

  // let's play !
  animate();
});

function mouseMoveHandler(e) {
  webgl.mousemove(e.clientX,e.clientY);
}

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);

  webgl.render();
}
