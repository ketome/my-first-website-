const DC_FLAGS = [
  { bit: 1<<0,  id:"discord_employee" },
  { bit: 1<<1,  id:"partnered_server_owner" },
  { bit: 1<<2,  id:"hypesquad_events" },
  { bit: 1<<3,  id:"bug_hunter_level_1" },
  { bit: 1<<6,  id:"house_bravery" },
  { bit: 1<<7,  id:"house_brilliance" },
  { bit: 1<<8,  id:"house_balance" },
  { bit: 1<<9,  id:"early_supporter" },
  { bit: 1<<14, id:"bug_hunter_level_2" },
  { bit: 1<<17, id:"verified_bot_developer" },
  { bit: 1<<18, id:"discord_certified_moderator" },
  { bit: 1<<22, id:"active_developer" },
];

const BADGE_META = {
  discord_employee:            { title:"Discord Staff",            icon:"https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png" },
  partnered_server_owner:      { title:"Partnered Server Owner",   icon:"https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png" },
  hypesquad_events:            { title:"HypeSquad Events",         icon:"https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png" },
  bug_hunter_level_1:          { title:"Bug Hunter",               icon:"https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png" },
  house_bravery:               { title:"HypeSquad Bravery",        icon:"https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png" },
  house_brilliance:            { title:"HypeSquad Brilliance",     icon:"https://cdn.discordapp.com/badge-icons/011940fd013082d85d0cf978f7ce98cb.png" },
  house_balance:               { title:"HypeSquad Balance",        icon:"https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png" },
  early_supporter:             { title:"Early Supporter",          icon:"https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png" },
  bug_hunter_level_2:          { title:"Bug Hunter Level 2",       icon:"https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png" },
  verified_bot_developer:      { title:"Verified Bot Developer",   icon:"https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png" },
  discord_certified_moderator: { title:"Certified Moderator",      icon:"https://cdn.discordapp.com/badge-icons/fee1624003e07cef6d7ae9044dd8b31d.png" },
  active_developer:            { title:"Active Developer",         icon:"https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png" },
  nitro:                       { title:"Discord Nitro",            icon:"https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png" },
  guild_booster:               { title:"Server Booster",           icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
  guild_booster_1:             { title:"Server Booster (1 Month)",   icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
  guild_booster_2:             { title:"Server Booster (2 Months)",  icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
  guild_booster_3:             { title:"Server Booster (3 Months)",  icon:"https://cdn.discordapp.com/badge-icons/b4d28c75b1a1c612c5e8e10b4b6c29fd.png" },
  guild_booster_6:             { title:"Server Booster (6 Months)",  icon:"https://cdn.discordapp.com/badge-icons/df199d2050d3ed4ebf84d64ae83989f8.png" },
  guild_booster_9:             { title:"Server Booster (9 Months)",  icon:"https://cdn.discordapp.com/badge-icons/bf11ad5b6f3f60e3b6bb4fa7d7700c70.png" },
  guild_booster_12:            { title:"Server Booster (12 Months)", icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
  guild_booster_15:            { title:"Server Booster (15 Months)", icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
  guild_booster_18:            { title:"Server Booster (18 Months)", icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
  guild_booster_24:            { title:"Server Booster (24 Months)", icon:"https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png" },
};

const DiscordCard = {

  _getBadges(data) {
    const u     = data.discord_user;
    const found = [];

    // ① الشارات اليدوية من profile.js — الأولوية الأعلى
    if (typeof PROFILE !== "undefined" && Array.isArray(PROFILE.badges)) {
      PROFILE.badges.forEach(id => found.push(id));
    }

    // ② public_flags من Lanyard كـ fallback إضافي
    if (!found.length) {
      const flags = u.public_flags || u.flags || 0;
      if (flags) DC_FLAGS.forEach(f => { if (flags & f.bit) found.push(f.id); });
    }

    // ③ Nitro
    if (!found.includes("nitro") && u.premium_type > 0) found.push("nitro");

    return [...new Set(found)];
  },

  _buildBadgesHtml(ids) {
    if (!ids.length) return "";
    const imgs = ids.map(id => {
      const m = BADGE_META[id];
      if (!m) return "";
      return `<img class="dc-badge-icon" src="${m.icon}" alt="${m.title}" title="${m.title}" onerror="this.style.display='none'" loading="lazy" />`;
    }).join("");
    return `<div class="dc-badges">${imgs}</div>`;
  },

  render(data) {
    const el = document.getElementById('dc-content');
    if (!el) return;

    const u      = data.discord_user;
    const status = data.discord_status || "offline";
    const act    = (data.activities || []).find(a => a.type !== 2);
    const avUrl  = LanyardAPI.getAvatarUrl(u);

    // طباعة الـ data كاملة في الكونسول للتشخيص
    console.log("[Discord] user flags:", u.public_flags, u.flags, "| premium:", u.premium_type);
    console.log("[Discord] full user object:", JSON.stringify(u, null, 2));

    // ── Decoration ────────────────────────────────
    let decoHtml = "";
    if (u.avatar_decoration_data) {
      const decoUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`;
      decoHtml = `<img class="dc-deco" src="${decoUrl}" alt="" />`;
    }

    // ── Badges ────────────────────────────────────
    const badgeIds   = this._getBadges(data);
    const badgesHtml = this._buildBadgesHtml(badgeIds);

    // ── Activity ──────────────────────────────────
    let actHtml = "";
    if (act) {
      const ico = act.assets?.large_image
        ? `<img class="dc-act-img" src="https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.large_image}.png" onerror="this.style.display='none'"/>`
        : `<div class="dc-act-img">${act.type===0?"🎮":act.type===3?"📺":"💻"}</div>`;
      actHtml = `<div class="dc-act">${ico}<div class="dc-act-body">
        <div class="dc-act-type">${C.ACT_TYPES[act.type]||"Activity"}</div>
        <div class="dc-act-name">${Helpers.sanitize(act.name)}</div>
        ${act.details?`<div class="dc-act-det">${Helpers.sanitize(act.details)}</div>`:""}
      </div></div>`;
    }

    el.innerHTML = `
      <div class="dc-row">
        <div class="dc-avw">
          <img class="dc-av" src="${avUrl}" onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'"/>
          ${decoHtml}
          <div class="dc-dot" style="background:${C.STATUS_COLOR[status]};box-shadow:0 0 10px ${C.STATUS_COLOR[status]}bb"></div>
        </div>
        <div class="dc-info">
          <div class="dc-name">${Helpers.sanitize(u.global_name || u.username)}</div>
          <div class="dc-user">@${Helpers.sanitize(u.username)}</div>
          <div class="dc-status-badge">
            <span class="dc-badge-dot" style="background:${C.STATUS_COLOR[status]}"></span>
            ${C.STATUS_LABEL[status]}
          </div>
          ${badgesHtml}
        </div>
      </div>${actHtml}`;

    Events.emit("discord:ready", data);
  },

  renderError(msg) {
    const el = document.getElementById('dc-content');
    if (el) el.innerHTML = `<div class="err-box">⚠️ ${Helpers.sanitize(msg)}</div>`;
  },

  renderLoading() {
    const el = document.getElementById('dc-content');
    if (el) el.innerHTML = `<div class="sk-row"><div class="sk sk-circle" style="width:80px;height:80px"></div><div class="sk-lines"><div class="sk" style="width:55%;height:15px"></div><div class="sk" style="width:35%;height:10px"></div><div class="sk" style="width:45%;height:10px"></div></div></div>`;
  },
};
