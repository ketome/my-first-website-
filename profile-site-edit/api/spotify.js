// Spotify data comes through Lanyard automatically.
// This module just provides helper functions.
const SpotifyHelper = {
  getProgress(timestamps) {
    if(!timestamps) return { pct:0, elapsed:0, total:0 };
    const elapsed = Date.now() - timestamps.start;
    const total   = timestamps.end - timestamps.start;
    return { pct: Helpers.clamp((elapsed/total)*100,0,100), elapsed, total };
  },
  startProgressTimer(timestamps, onTick, interval=500) {
    const t = setInterval(()=>{
      const p = this.getProgress(timestamps);
      onTick(p);
      if(p.pct >= 100) clearInterval(t);
    }, interval);
    return t;
  },
};
