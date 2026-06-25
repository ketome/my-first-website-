const Clock = {
  init(){
    const el=Dom.$("#clock");
    if(!el) return;
    const tick=()=>{
      const n=new Date();
      el.textContent=n.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
    };
    tick();
    setInterval(tick,1000);
  },
};
