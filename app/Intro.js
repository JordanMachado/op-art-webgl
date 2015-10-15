'use strict';

import Emitter from '../build/vendors/Emitter';

export default class Intro extends Emitter{
  constructor(width, height) {
  super()
  this.el = document.querySelector('#intro');
  this.title = document.querySelector('#intro .title');
  this.loader = document.querySelector('#intro .loader');
  this.credits = document.querySelector('#intro .credits');


   this.button = document.querySelector('#start');
   this.button.onclick = this.onClickStart.bind(this)
   console.log('intro started');
  }

  start() {

    TweenLite.set(this.title,{
      y:-20
    })
    TweenLite.set(this.loader,{
      y:-15
    })
    TweenLite.set(this.button,{
      y:0
    })
    TweenLite.set(this.credits,{
      y:-10
    })

    let timeline = new TimelineLite()
    timeline.to(this.title,0.5,{
      opacity:1,
      y:0
    })
    timeline.to(this.loader,0.5,{
      opacity:1,
      y:0
    },"-=0.2")
    timeline.to(this.credits,0.5,{
      opacity:1,
      y:0
    },"-=0.3")
  }
  loaded() {
    TweenLite.to(this.loader,0.3,{
      opacity:0
    });
    TweenLite.to(this.button,0.3,{
      opacity:1,
      delay:0.5
    });
  }
  end() {

    let timeline = new TimelineLite()

    timeline.to(this.credits,0.5,{
      opacity:0,
      y:-10
    },"-=0.3");

    timeline.to(this.button,0.5,{
      opacity:0,
      y:-15
    },"-=0.3");

    timeline.to(this.title,0.5,{
      opacity:0,
      y:-20
    },"-=0.2");

    setTimeout(()=>{
      TweenLite.to(this.el,0.7,{
        autoAlpha:0,
        onComplete:()=> {
          this.emit('end')
        }
      });

    }.bind(this), 500);

  }
  onClickStart() {
    console.log('yolo');
    console.log(this);
    this.end()

  }

}
