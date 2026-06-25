const App = {
  async init(){
    Background.init();
    LinksCard.render(PROFILE.links);
    SocialsCard.render(PROFILE.socials || []);
    BadgesCard.render(PROFILE.skills);
    Clock.init();
    ThemeSwitcher.init();

    if(PROFILE.github) GitHubCard.render(PROFILE.github);

    if(PROFILE.discord_id){
      await this.loadLanyard(PROFILE.discord_id);
      LanyardAPI.startPolling(PROFILE.discord_id, id=>this.loadLanyard(id));
    }

    Dom.$$(".panel").forEach(p=>{
      p.addEventListener("click", e=>Effects.particle(e.clientX,e.clientY));
    });

    // إعداد الصوت
    this.setupAudio();

    console.log("%c⚡ Profile loaded","color:#5865f2;font-size:14px;font-weight:bold");
  },

  async loadLanyard(id){
    try{
      const data = await LanyardAPI.fetch(id);

      // إذا public_flags = 0، نجيبها من discord lookup API كـ fallback
      if (!data.discord_user.public_flags && !data.discord_user.flags) {
        try {
          const r = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${id}`);
          if (r.ok) {
            const extra = await r.json();
            if (extra.public_flags) {
              data.discord_user.public_flags = extra.public_flags;
              console.log("[Flags] from lookup:", extra.public_flags);
            }
          }
        } catch(_) {}
      }

      DiscordCard.render(data);
      SpotifyCard.render(data);
    } catch(e){
      DiscordCard.renderError(e.message);
    }
  },

  setupAudio() {
    const audio = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    if (!audio) return;

    // محاولة تشغيل الصوت فورًا (لن تعمل غالبًا لكن نجرب)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("الصوت لم يشتغل تلقائيًا، في انتظار تفاعل المستخدم...");
      });
    }

    // عند الضغط على الزر، شغّل الصوت
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play().then(() => {
            toggleBtn.textContent = '🔊';
          }).catch(e => console.log("فشل تشغيل الصوت:", e));
        } else {
          audio.pause();
          toggleBtn.textContent = '🔈';
        }
      });
    }

    // أيضًا أي نقرة في الصفحة تشغل الصوت (إذا كان متوقفًا)
    document.addEventListener('click', function playOnClick() {
      if (audio.paused) {
        audio.play().catch(e => console.log("فشل تشغيل الصوت بعد النقر:", e));
        // نزيل المستمع بعد أول نقرة حتى لا يتكرر
        document.removeEventListener('click', playOnClick);
      }
    }, { once: true }); // { once: true } يضمن تنفيذ المستمع مرة واحدة فقط
  }
};

document.addEventListener("DOMContentLoaded", ()=>App.init());