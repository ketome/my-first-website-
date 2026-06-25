const GitHubAPI = {
  async getUser(username) {
    const r = await fetch(C.GITHUB_URL + username);
    const j = await r.json();
    if(j.message) throw new Error(j.message);
    return j;
  },
  async getRepos(username) {
    const r = await fetch(C.GITHUB_URL + username + "/repos?per_page=100&sort=pushed");
    return r.json();
  },
  async getAll(username) {
    const [user, repos] = await Promise.all([
      this.getUser(username),
      this.getRepos(username),
    ]);
    const langMap = {};
    if(Array.isArray(repos)) repos.forEach(r=>{ if(r.language) langMap[r.language]=(langMap[r.language]||0)+1; });
    const langs = Object.entries(langMap).sort((a,b)=>b[1]-a[1]).slice(0,6);
    const stars = Array.isArray(repos) ? repos.reduce((a,r)=>a+r.stargazers_count,0) : 0;
    return { ...user, langs, stars };
  },
};
