const BadgesCard = {
  render(skills) {
    const el = Dom.$('#badges-content');
    if(!el) return;
    el.innerHTML = "";
    skills.forEach((s,i) => {
      const b = Dom.el("span","badge "+s.cls+" pop-in");
      b.style.animationDelay = (i*50)+"ms";
      b.innerHTML = `<span class="badge-dot"></span>${s.name}`;
      el.appendChild(b);
    });
  },
};
