const Scroll = {
  init() {
    const els = Dom.$$("[data-scroll]");
    Intersect.observe(els, el => {
      el.classList.add("fade-in");
      el.style.animationDelay = (el.dataset.delay||0)+"ms";
    });
  },
};
