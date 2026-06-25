const debounce = (fn, ms=300) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); }; };
const throttle = (fn, ms=100) => { let last=0; return (...a)=>{ const now=Date.now(); if(now-last>=ms){ last=now; fn(...a); } }; };
