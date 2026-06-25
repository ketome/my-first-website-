const GitHubCard = {
  async render(username) {
    const el = Dom.$('#gh-content');
    if(!el || !username) return;
    el.innerHTML = `<div class="sk-row"><div class="sk sk-circle" style="width:72px;height:72px"></div><div class="sk-lines"><div class="sk" style="width:60%;height:16px"></div><div class="sk" style="width:40%;height:11px"></div><div class="sk" style="width:75%;height:11px"></div></div></div>`;
    try {
      const d = await GitHubAPI.getAll(username);
      const langs = d.langs.map(([l])=>`<span class="gh-lang"><span class="gh-dot" style="background:${C.LANG_COLORS[l]||'#666'}"></span>${l}</span>`).join("");
      el.innerHTML = `
        <div class="gh-head">
          <img class="gh-av" src="${d.avatar_url}&s=144" onerror="this.style.opacity='.3'"/>
          <div class="gh-info">
            <div class="gh-name">${Helpers.sanitize(d.name||d.login)}</div>
            <div class="gh-login">@${d.login}</div>
            ${d.bio?`<div class="gh-bio">${Helpers.sanitize(d.bio)}</div>`:""}
            ${d.location?`<div class="gh-loc">📍 ${Helpers.sanitize(d.location)}</div>`:""}
          </div>
        </div>
        <div class="gh-stats">
          <div class="gh-stat"><div class="gh-sv">${Helpers.fmtNum(d.followers)}</div><div class="gh-sl">Followers</div></div>
          <div class="gh-stat"><div class="gh-sv">${Helpers.fmtNum(d.public_repos)}</div><div class="gh-sl">Repos</div></div>
          <div class="gh-stat"><div class="gh-sv">${Helpers.fmtNum(d.stars)}</div><div class="gh-sl">Stars</div></div>
        </div>
        ${langs?`<div class="gh-langs">${langs}</div>`:""}`;
    } catch(e) {
      el.innerHTML = `<div class="err-box">⚠️ GitHub: ${Helpers.sanitize(e.message)}</div>`;
    }
  },
};
