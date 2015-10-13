export default class CanvasManager {
  constructor(width = 200,height = 200) {

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.id = "texture";
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.rect = {
      x:1
    }

    this.tick = 0;
    this.animate();


  }
  animate() {
    this.tick +=0.01;
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);


    for(let i = 0,ln = 180;i<ln;i++) {
        let color =  (i%2 ==1)? "black":"transparent";
        this.ctx.fillStyle=color;
        // console.log(  this.ctx.fillStyle);
        this.ctx.fillRect(0,i*5,window.innerWidth,Math.sin(this.tick)*9);
    }
    this.ctx.fill();


  }
}
