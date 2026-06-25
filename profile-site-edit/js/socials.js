const SocialsCard = {
  render(socials) {
    const el = document.getElementById('socials-row');
    if (!el) return;
    el.innerHTML = "";
    socials.forEach((s, i) => {
      const a = document.createElement("a");
      a.href   = s.url;
      a.target = "_blank";
      a.rel    = "noopener noreferrer";
      a.className = "social-circle slide-in";
      a.title  = s.label;
      a.style.animationDelay = (i * 60) + "ms";
      a.style.setProperty("--sc-color", s.color || "#fff");
      a.innerHTML = s.iconImg
        ? `<img src="${s.iconImg}" alt="${s.label}" />`
        : `<span>${s.icon || "🔗"}</span>`;
      el.appendChild(a);
    });
  },
};
