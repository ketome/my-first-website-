const Animate = {
  fadeIn(el, ms=400, delay=0) {
    el.style.cssText = `opacity:0;transition:opacity ${ms}ms ease ${delay}ms`;
    requestAnimationFrame(()=>{ el.style.opacity="1"; });
  },
  slideUp(el, ms=400) {
    el.style.cssText = `transform:translateY(20px);opacity:0;transition:all ${ms}ms cubic-bezier(.34,1.2,.64,1)`;
    requestAnimationFrame(()=>{ el.style.transform="translateY(0)"; el.style.opacity="1"; });
  },
  countUp(el, to, ms=1200) {
    const s=performance.now();
    const go=n=>{ const p=Math.min((n-s)/ms,1),e=1-Math.pow(1-p,3); el.textContent=Math.floor(to*e); if(p<1) requestAnimationFrame(go); else el.textContent=to; };
    requestAnimationFrame(go);
  },
};
