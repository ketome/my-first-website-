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
      a.style.setProperty("--link-bg", link.color || "rgba(255,255,255,.05)");
      const iconContent = link.iconImg
        ? `<img src="${link.iconImg}" alt="${link.label}" class="link-icon-img" />`
        : (link.icon || "🔗");
      a.innerHTML = `
        <span class="link-icon" style="background:${link.color||'var(--s3)'}">${iconContent}</span>
        <span class="link-label">${Helpers.sanitize(link.label)}</span>
        <span class="link-arrow">→</span>`;
      el.appendChild(a);
    });
  },
};
