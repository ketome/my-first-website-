// ╔══════════════════════════════════════════╗
// ║   Custom Background Handler              ║
// ║   يُطبّق إعدادات الخلفية من theme.js     ║
// ╚══════════════════════════════════════════╝
const Background = {
  init() {
    if (!THEME.background || THEME.background.type === "none") return;

    const cfg  = THEME.background;
    const wrap = document.querySelector(".bg-wrap");
    if (!wrap) return;

    switch (cfg.type) {
      case "image":
        this._applyImage(wrap, cfg);
        break;
      case "gradient":
        this._applyGradient(wrap, cfg);
        break;
      case "solid":
        this._applySolid(wrap, cfg);
        break;
    }
  },

  _applyImage(wrap, cfg) {
    // إخفاء الـ orbs والـ grid الافتراضيين
    wrap.querySelectorAll(".orb, .bg-grid").forEach(el => el.style.display = "none");

    const div = document.createElement("div");
    div.className = "bg-custom-image";
    div.style.backgroundImage    = `url('${cfg.imageUrl}')`;
    div.style.backgroundSize     = cfg.imageSize     || "cover";
    div.style.backgroundPosition = cfg.imagePosition || "center";
    div.style.setProperty("--bg-overlay", cfg.imageOverlay ?? 0.55);
    div.style.setProperty("--bg-size",    cfg.imageSize || "cover");
    div.style.setProperty("--bg-pos",     cfg.imagePosition || "center");

    if (cfg.imageBlur && cfg.imageBlur > 0) {
      div.style.filter = `blur(${cfg.imageBlur}px)`;
      div.style.transform = "scale(1.05)"; // يمنع الحواف البيضاء عند الضبابية
    }

    // تحديث لون الخلفية
    document.documentElement.style.setProperty("--bg", "transparent");
    document.body.style.background = "#07070f";

    wrap.insertBefore(div, wrap.firstChild);
  },

  _applyGradient(wrap, cfg) {
    wrap.querySelectorAll(".orb, .bg-grid").forEach(el => el.style.display = "none");

    const colors = cfg.gradientColors || ["#0f0c29", "#302b63"];
    const deg    = cfg.gradientDeg    ?? 135;
    const grad   = `linear-gradient(${deg}deg, ${colors.join(", ")})`;

    const div = document.createElement("div");
    div.className = "bg-custom-gradient";
    div.style.background = grad;
    wrap.insertBefore(div, wrap.firstChild);

    document.body.style.background = colors[0];
  },

  _applySolid(wrap, cfg) {
    wrap.querySelectorAll(".orb, .bg-grid").forEach(el => el.style.display = "none");

    const div = document.createElement("div");
    div.className = "bg-custom-solid";
    div.style.background = cfg.solidColor || "#07070f";
    wrap.insertBefore(div, wrap.firstChild);

    document.body.style.background = cfg.solidColor || "#07070f";
  },
};
