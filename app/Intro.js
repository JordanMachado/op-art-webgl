'use strict';



export default class Intro {
  constructor(width, height) {

  this.el =document.querySelector('#intro');
  this.title = document.querySelector('#intro .title');
  this.credits = document.querySelector('#intro .credits');


   this.start = document.querySelector('#start');
   this.start.onclick = () => {
     this.onClickStart()
   }
   console.log('intro started');
  }
  start() {
    TweenLite.to()
  }
  onClickStart() {
    console.log('yolo');
  }

}
