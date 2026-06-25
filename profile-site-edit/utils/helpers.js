const Helpers = {
  fmtNum: n => n >= 1000 ? (n/1000).toFixed(1)+"k" : String(n),
  fmtMs:  ms => {
    const s = Math.floor(Math.abs(ms)/1000);
    return Math.floor(s/60)+":"+(s%60).toString().padStart(2,"0");
  },
  clamp:  (v,mn,mx) => Math.min(Math.max(v,mn),mx),
  rand:   (mn,mx)   => Math.random()*(mx-mn)+mn,
  delay:  ms        => new Promise(r => setTimeout(r,ms)),
  sanitize: s => String(s).replace(/</g,"&lt;").replace(/>/g,"&gt;"),
};
