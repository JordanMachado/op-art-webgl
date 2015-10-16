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

  }

  start() {

    TweenLite.set(this.title,{
      y:-90
    })
    TweenLite.set(this.loader,{
      y:-25
    })
    TweenLite.set(this.button,{
      y:20
    })
    TweenLite.set(this.credits,{
      y:-10
    })

    let timeline = new TimelineLite()
    timeline.to(this.title,0.8,{
      opacity:1,
      y:-20,
      ease:Quad.easeOut
    })
    timeline.to(this.loader,0.5,{
      opacity:1,
      y:20,
      ease:Quad.easeOut
    },"-=0.4")
    timeline.to(this.credits,0.5,{
      opacity:1,
      y:0,
      ease:Quad.easeOut
    },"-=0.3")

  }
  loaded() {
    TweenLite.to(this.loader,0.3,{
      opacity:0,
      ease:Quad.easeOut
    });
    TweenLite.to(this.button,0.3,{
      opacity:1,
      delay:0.5,
      ease:Quad.easeOut
    });
  }
  end() {

    let timeline = new TimelineLite()

    timeline.to(this.credits,0.5,{
      opacity:0,
      y:-10,
      ease:Quad.easeOut
    },"-=0.3");

    timeline.to(this.button,0.5,{
      opacity:0,
      y:-15,
      ease:Quad.easeOut
    },"-=0.3");

    timeline.to(this.title,0.5,{
      opacity:0,
      y:-20,
      ease:Quad.easeOut
    },"-=0.2");
    setTimeout(()=>{
    this.emit('end')
  }.bind(this),600);
    setTimeout(()=>{

      TweenLite.to(this.el,0.7,{
        autoAlpha:0,
        ease:Quad.easeOut
      });

    }.bind(this), 500);

  }
  onClickStart() {
    this.end()

  }

}
