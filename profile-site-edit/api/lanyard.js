const LanyardAPI = {
  _timer: null,
  async fetch(id) {
    const r = await fetch(C.LANYARD_URL + id);
    const j = await r.json();
    if(!j.success) throw new Error("Not in Lanyard server");
    return j.data;
  },
  startPolling(id, cb, ms=C.REFRESH_MS) {
    if(this._timer) clearInterval(this._timer);
    cb(id); // immediate
    this._timer = setInterval(()=>cb(id), ms);
  },
  stopPolling() {
    if(this._timer) clearInterval(this._timer);
    this._timer = null;
  },
  getAvatarUrl(user) {
    const h = user.avatar;
    if(!h) return `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(user.id)>>22n)%6}.png`;
    return `https://cdn.discordapp.com/avatars/${user.id}/${h}.${h.startsWith("a_")?"gif":"png"}?size=128`;
  },
};
