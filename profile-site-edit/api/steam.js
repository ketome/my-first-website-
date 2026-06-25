// Steam requires a backend proxy due to CORS.
// This module shows how to call it once you have one set up.
const SteamAPI = {
  async getPlayer(steamId, proxyUrl="/api/steam") {
    const r = await fetch(`${proxyUrl}?id=${steamId}`);
    return r.json();
  },
  getProfileUrl(steamId) {
    return `https://steamcommunity.com/profiles/${steamId}`;
  },
};
