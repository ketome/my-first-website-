const LinksCard = {
  render(links) {
    const el = Dom.$('#links-content');
    if(!el) return;
    el.innerHTML = "";
    links.forEach((link, i) => {
      const a = Dom.el("a","link-item slide-in");
      a.href   = link.url;
      a.target = "_blank";
      a.rel    = "noopener noreferrer";
      a.style.animationDelay = (i * C.ANIM_DELAY) + "ms";
      a.innerHTML = `
        <span class="link-icon" style="
          background:${link.color||'var(--s3)'};
          font-size:20px;
          width:34px;height:34px;
          display:flex;align-items:center;justify-content:center;
          border-radius:9px;flex-shrink:0;
          line-height:1;
        ">${link.icon||"🔗"}</span>
        <span class="link-label">${Helpers.sanitize(link.label)}</span>
        <span class="link-arrow">→</span>`;
      el.appendChild(a);
    });
  },
};