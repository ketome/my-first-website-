const Particles = {
  canvas:null,ctx:null,pts:[],raf:null,
  init(){
    this.canvas=Dom.el("canvas","particles-canvas");
    Object.assign(this.canvas.style,{position:"fixed",inset:"0",pointerEvents:"none",zIndex:"0",opacity:".4"});
    document.body.prepend(this.canvas);
    this.ctx=this.canvas.getContext("2d");
    this.resize();
    this.spawn(45);
    this.loop();
    window.addEventListener("resize",()=>this.resize());
  },
  resize(){this.canvas.width=innerWidth;this.canvas.height=innerHeight},
  spawn(n){for(let i=0;i<n;i++)this.pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.4+Math.random()*1.2,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,o:.05+Math.random()*.3,h:220+Math.random()*120})},
  loop(){this.raf=requestAnimationFrame(()=>this.loop());this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);this.pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=this.canvas.width;if(p.x>this.canvas.width)p.x=0;if(p.y<0)p.y=this.canvas.height;if(p.y>this.canvas.height)p.y=0;this.ctx.beginPath();this.ctx.arc(p.x,p.y,p.r,0,Math.PI*2);this.ctx.fillStyle=`hsla(${p.h},80%,65%,${p.o})`;this.ctx.fill()})},
};
