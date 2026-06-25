const Counter = {
  countUp(el, target, ms=1200){
    const start=performance.now();
    const step=now=>{
      const p=Math.min((now-start)/ms,1);
      const ease=1-Math.pow(1-p,3);
      const val=Math.floor(target*ease);
      el.textContent=val>=1000?(val/1000).toFixed(1)+"k":val;
      if(p<1) requestAnimationFrame(step);
      else el.textContent=target>=1000?(target/1000).toFixed(1)+"k":target;
    };
    requestAnimationFrame(step);
  },
};
