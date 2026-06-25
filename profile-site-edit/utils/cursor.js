const Cursor = {
  dot: null, ring: null,
  px: 0, py: 0, rx: 0, ry: 0,
  init() {
    this.dot  = Dom.el("div","cur-dot");
    this.ring = Dom.el("div","cur-ring");
    document.body.append(this.dot, this.ring);
    document.addEventListener("mousemove", e => { this.px=e.clientX; this.py=e.clientY; });
    Dom.$$("a,button,.link-item,.badge").forEach(el => {
      el.addEventListener("mouseenter",()=>this.ring.classList.add("cur-hover"));
      el.addEventListener("mouseleave",()=>this.ring.classList.remove("cur-hover"));
    });
    this._loop();
  },
  _loop() {
    this.rx += (this.px-this.rx)*.12;
    this.ry += (this.py-this.ry)*.12;
    if(this.dot)  { this.dot.style.cssText  = `left:${this.px}px;top:${this.py}px`; }
    if(this.ring) { this.ring.style.cssText = `left:${this.rx}px;top:${this.ry}px`; }
    requestAnimationFrame(()=>this._loop());
  }
};
