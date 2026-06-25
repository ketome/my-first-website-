const Keyboard = {
  init() {
    document.addEventListener("keydown", e => {
      if(e.key==="t") ThemeSwitcher.toggle();
    });
  },
};
