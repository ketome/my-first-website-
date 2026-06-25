const Fetch = {
  async get(url, opts={}) {
    const r = await fetch(url, { method:"GET", ...opts });
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  },
  async post(url, body, opts={}) {
    const r = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body), ...opts });
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  },
};
