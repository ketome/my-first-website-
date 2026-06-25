const Store = {
  get: (k,d=null) => { try{ return JSON.parse(localStorage.getItem(k))??d }catch{ return d } },
  set: (k,v)      => { try{ localStorage.setItem(k,JSON.stringify(v)) }catch{} },
  del: k          => { try{ localStorage.removeItem(k) }catch{} },
};
