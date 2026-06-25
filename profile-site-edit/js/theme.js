const ThemeSwitcher = {
  themes:["dark","purple","blue","green","red"],
  current: Store.get("theme","dark"),
  init(){
    this.apply(this.current);
    const btn=Dom.$("#theme-btn");
    if(btn) btn.addEventListener("click",()=>this.toggle());
  },
  apply(t){
    document.documentElement.setAttribute("data-theme",t);
    Store.set("theme",t);
    this.current=t;
  },
  toggle(){
    const i=this.themes.indexOf(this.current);
    this.apply(this.themes[(i+1)%this.themes.length]);
  },
};
