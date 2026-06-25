const THEME = {
  primary:   "#5865f2",
  secondary: "#ff64a8",
  green:     "#23e57a",
  spotify:   "#1ed760",
  steam:     "#e8813a",
  bg:        "#07070f",

  // ╔══════════════════════════════════════════════════╗
  // ║   CUSTOM BACKGROUND — اختر نوع الخلفية          ║
  // ║                                                  ║
  // ║  "none"     → الخلفية الافتراضية (orbs + grid)  ║
  // ║  "image"    → صورة مخصصة (ضع رابط الصورة أدناه) ║
  // ║  "gradient" → تدرج لوني مخصص                    ║
  // ║  "solid"    → لون خلفية ثابت                    ║
  // ╚══════════════════════════════════════════════════╝
  background: {
    type: "image",  // "none" | "image" | "gradient" | "solid"

    // إذا اخترت "image" — ضع رابط الصورة هنا
    imageUrl: "https://d7hftxdivxxvm.cloudfront.net/?height=675&quality=80&resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2P6t_Yt6dF0TNN76dlp-_Q%252F3417757448_4a6bdf36ce_o.jpg&width=1200",

    // خيارات الصورة
    imageSize:     "cover",   // "cover" | "contain" | "auto"
    imagePosition: "center",  // "center" | "top" | "bottom"
    imageBlur:     0,         // 0 = بدون ضبابية، أكبر = أكثر ضبابية (مثال: 4)
    imageOverlay:  0.60,      // شفافية الطبقة الداكنة فوق الصورة (0.0 - 1.0)

    // إذا اخترت "gradient"
    gradientColors: ["#0f0c29", "#302b63", "#24243e"],
    gradientDeg:    135,

    // إذا اخترت "solid"
    solidColor: "#0d1117",
  },
};
