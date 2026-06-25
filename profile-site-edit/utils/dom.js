const Dom = {
  $:  (sel,ctx=document) => ctx.querySelector(sel),
  $$: (sel,ctx=document) => [...ctx.querySelectorAll(sel)],
  el: (tag,cls="",html="") => {
    const e = document.createElement(tag);
    if(cls)  e.className = cls;
    if(html) e.innerHTML = html;
    return e;
  },
  clear: el => { while(el.firstChild) el.removeChild(el.firstChild); },
  show:  el => el && (el.style.display = ""),
  hide:  el => el && (el.style.display = "none"),
  stagger: (els, cls, delay=80) => els.forEach((e,i) => setTimeout(()=>e.classList.add(cls), i*delay)),
};
