const SpotifyCard = {
  _timer: null,
  render(data) {
    const el = Dom.$('#sp-content');
    if(!el) return;
    const sp = data.spotify;
    if(!sp) { el.innerHTML = '<div class="sp-idle">🎵 Not playing anything right now</div>'; return; }

    const bars = [7,14,9,16,6,11,8].map((h,i)=>`<div class="sp-bar" style="height:${h}px;animation-delay:${i*.1}s"></div>`).join("");

    el.innerHTML = `
      <div class="sp-row">
        ${sp.album_art_url?`<img class="sp-cov" src="${sp.album_art_url}" onerror="this.style.opacity='.2'"/>`:`<div class="sp-cov"></div>`}
        <div class="sp-info">
          <div class="sp-name">${Helpers.sanitize(sp.song)}</div>
          <div class="sp-art">${Helpers.sanitize(sp.artist)}</div>
          <div class="sp-alb">${Helpers.sanitize(sp.album)}</div>
        </div>
        <div class="sp-bars">${bars}</div>
      </div>
      <div class="sp-prog">
        <div class="sp-track"><div class="sp-fill" id="sp-fill"></div></div>
        <div class="sp-times"><span id="sp-cur">0:00</span><span id="sp-tot">0:00</span></div>
      </div>`;

    if(this._timer) clearInterval(this._timer);
    if(sp.timestamps) {
      const tot = sp.timestamps.end - sp.timestamps.start;
      Dom.$('#sp-tot').textContent = Helpers.fmtMs(tot);
      this._timer = SpotifyHelper.startProgressTimer(sp.timestamps, ({pct,elapsed})=>{
        const f = Dom.$('#sp-fill'), c = Dom.$('#sp-cur');
        if(f) f.style.width = pct+"%";
        if(c) c.textContent = Helpers.fmtMs(elapsed);
      });
    }
    Events.emit("spotify:playing", sp);
  },
  renderLoading() {
    const el = Dom.$('#sp-content');
    if(el) el.innerHTML = `<div class="sk-row"><div class="sk" style="width:60px;height:60px;border-radius:10px"></div><div class="sk-lines"><div class="sk" style="width:70%;height:13px"></div><div class="sk" style="width:50%;height:10px"></div><div class="sk" style="width:60%;height:10px"></div></div></div>`;
  },
};
