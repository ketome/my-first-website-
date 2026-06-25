const Effects = {
  particle(x, y) {
    for(let i=0;i<8;i++){
      const p = document.createElement("div");
      const ang  = (i/8)*360;
      const dist = 40+Math.random()*50;
      const dx   = Math.cos(ang*Math.PI/180)*dist;
      const dy   = Math.sin(ang*Math.PI/180)*dist;
      const sz   = 3+Math.random()*4;
      const hue  = 220+Math.random()*120;
      Object.assign(p.style,{
        position:"fixed",left:x+"px",top:y+"px",
        width:sz+"px",height:sz+"px",
        background:`hsl(${hue},90%,65%)`,
        borderRadius:"50%",pointerEvents:"none",zIndex:9999,
        transform:"translate(-50%,-50%)",
        transition:"transform .5s ease, opacity .5s ease",
      });
      document.body.appendChild(p);
      requestAnimationFrame(()=>{
        p.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;
        p.style.opacity="0";
      });
      setTimeout(()=>p.remove(), 600);
    }
  },
  ripple(e, el) {
    const r=el.getBoundingClientRect(), sz=Math.max(r.width,r.height);
    const rip=Dom.el("span","ripple-el");
    Object.assign(rip.style,{
      width:sz+"px",height:sz+"px",
      top:(e.clientY-r.top-sz/2)+"px",
      left:(e.clientX-r.left-sz/2)+"px",
    });
    el.appendChild(rip);
    setTimeout(()=>rip.remove(),700);
  },
};
