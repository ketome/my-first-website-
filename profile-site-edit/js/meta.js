const Meta = {
  set(title, desc) {
    document.title = title || document.title;
    const d = document.querySelector('meta[name="description"]');
    if(d && desc) d.setAttribute("content", desc);
  },
  setOG(title, desc, img) {
    [["og:title",title],["og:description",desc],["og:image",img]].forEach(([p,c])=>{
      if(!c) return;
      let el = document.querySelector(`meta[property="${p}"]`);
      if(!el){ el=document.createElement("meta"); el.setAttribute("property",p); document.head.appendChild(el); }
      el.setAttribute("content",c);
    });
  },
};
