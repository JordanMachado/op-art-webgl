'use strict';


import domready from 'domready';
import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';
import Sound from '../build/vendors/Sound'
import Intro from './Intro'


let webgl;
let canvasManager;
let gui;
let intro;
let canvas;
domready(() => {
  // webgl settings
  webgl = new Webgl(window.innerWidth*0.8, window.innerHeight*0.8);
  document.body.appendChild(webgl.renderer.domElement);
  document.addEventListener( 'mousemove', mouseMoveHandler, false );
  canvas = document.querySelector('#webgl')

  // Sound.load("build/UndroidDiomede.mp3");
  Sound.load("build/Gramatik-MuyTranquilo.mp3");


  intro = new Intro();
  intro.start();
  // Sound.load("build/sound.mp3");
  Sound.on("start",function() {
    intro.loaded();
  })
  intro.on('end',function(){
    Sound.play();
    webgl.intro();

  })
  window.sound = Sound;

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

  // canvas.style.boxShadow = "0px 0px 120px -6px rgba(115,119,243,"+ratio+")";
  canvas.style.boxShadow = "0px 0px 120px -6px rgba(10,13,119,"+ratio+")";
  raf(animate);
  webgl.render(data);
}
