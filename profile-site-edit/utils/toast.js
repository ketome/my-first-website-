const Toast = {
  _wrap: null,
  init() {
    this._wrap = Dom.el("div","toast-wrap");
    document.body.appendChild(this._wrap);
  },
  show(msg, type="info", ms=3000) {
    if(!this._wrap) this.init();
    const icons = { info:"ℹ️", success:"✅", error:"❌", warning:"⚠️" };
    const t = Dom.el("div","toast toast-"+type, `${icons[type]} ${Helpers.sanitize(msg)}`);
    this._wrap.appendChild(t);
    requestAnimationFrame(()=>t.classList.add("toast-in"));
    setTimeout(()=>{ t.classList.remove("toast-in"); setTimeout(()=>t.remove(),300); }, ms);
  },
  success: (m,ms) => Toast.show(m,"success",ms),
  error:   (m,ms) => Toast.show(m,"error",ms),
  warn:    (m,ms) => Toast.show(m,"warning",ms),
};
