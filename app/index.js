'use strict';


import domready from 'domready';
import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';
import Sound from '../build/vendors/Sound'


let webgl;
let canvasManager;
let gui;

let canvas;
domready(() => {
  // webgl settings
  webgl = new Webgl(window.innerWidth*0.8, window.innerHeight*0.8);
  document.body.appendChild(webgl.renderer.domElement);
  document.addEventListener( 'mousemove', mouseMoveHandler, false );

  // Sound.load("build/UndroidDiomede.mp3");
  // Sound.load("build/sound.mp3");
  window.sound = Sound;
  // GUI settings
  gui = new dat.GUI();
  gui.add(webgl, 'usePostprocessing');
 canvas=document.getElementById("webgl")
  // handle resize
  window.onresize = resizeHandler;

  // let's play !
  animate();
});

function mouseMoveHandler(e) {
  webgl.mousemove(e.clientX,e.clientY);
}

function resizeHandler() {
  webgl.resize(window.innerWidth*0.8, window.innerHeight*0.8);
}

function animate() {
  let data = Sound.getData();
  let ratio = 0.29 * data.bassAverage + 0.12;


  canvas.style.boxShadow = "0px 0px 120px -6px rgba(115,119,243,"+ratio+")";
  raf(animate);
  webgl.render(data);
}
