const Events = {
  _map: {},
  on:   (ev,fn) => { (Events._map[ev]||(Events._map[ev]=[])).push(fn) },
  emit: (ev,d)  => (Events._map[ev]||[]).forEach(fn=>fn(d)),
  off:  (ev,fn) => { Events._map[ev]=(Events._map[ev]||[]).filter(f=>f!==fn) },
};
