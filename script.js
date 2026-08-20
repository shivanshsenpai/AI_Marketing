/* ==========================================================================
   SHIVSPILL - NEXT-GEN AI MARKETING AGENCY
   Theme: Minimalist Monochrome Architecture + Light/Dark Theme & i18n Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initSoundEngine();
  initThemeToggle();
  initLanguageSelector();
  initMobileMenu();
  initTypewriter();
  initAiFeedStreamer();
  initAiContentDemo();
  initRoiCalculator();
  initCaseStudyTabs();
  initPricingToggle();
  initNavbarScroll();
  initToastStreamer();
  initFaqAccordion();
  updateAllocator();
  updateReadinessScore();
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE ENGINE
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeToggleBtn || !themeIcon) return;

  const savedTheme = localStorage.getItem('shivspill_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.className = 'fa-solid fa-sun';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('shivspill_theme', isLight ? 'light' : 'dark');

    showToast(isLight ? '☀️ Switched to Light Theme' : '🌙 Switched to Dark Theme');
  });
}

/* ==========================================================================
   2. MULTI-LANGUAGE TRANSLATION ENGINE (EN, ES, DE, JA, HI)
   ========================================================================== */
const translations = {
  en: {
    nav_services: "Services",
    nav_pipeline: "Pipeline",
    nav_comparison: "Comparison",
    nav_analyzer: "Analyzer",
    nav_allocator: "Allocator",
    nav_sandbox: "Sandbox",
    nav_calculator: "Calculator",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    nav_cta: "Book Audit",
    hero_badge: "ShivSpill Neural Engine v4.2 Live",
    hero_title_prefix: "Architecting",
    hero_title_gradient: "Viral Growth",
    hero_title_with: "with",
    hero_desc: "We combine autonomous neural ad algorithms, predictive audience sculpting, and generative content engines to scale direct-to-consumer and enterprise brands to 8-figure revenues.",
    hero_primary_btn: "Claim Free $5K AI Growth Plan",
    hero_secondary_btn: "Test AI Sandbox",
    stat_1_label: "Client Ad Revenue",
    stat_2_label: "Average ROAS",
    stat_3_label: "Prediction Accuracy"
  },
  es: {
    nav_services: "Servicios",
    nav_pipeline: "Tubería",
    nav_comparison: "Comparativa",
    nav_analyzer: "Analizador",
    nav_allocator: "Asignador",
    nav_sandbox: "Sandbox",
    nav_calculator: "Calculadora",
    nav_pricing: "Precios",
    nav_faq: "Preguntas",
    nav_cta: "Auditoría",
    hero_badge: "Motor Neuronal ShivSpill v4.2 Activo",
    hero_title_prefix: "Diseñando",
    hero_title_gradient: "Crecimiento Viral",
    hero_title_with: "con",
    hero_desc: "Combinamos algoritmos publicitarios neuronales autónomos y motores de contenido generativo para escalar marcas a ingresos de 8 cifras.",
    hero_primary_btn: "Obtener Plan de $5k Gratis",
    hero_secondary_btn: "Probar Sandbox IA",
    stat_1_label: "Ingresos Publicitarios",
    stat_2_label: "ROAS Promedio",
    stat_3_label: "Precisión Predictiva"
  },
  de: {
    nav_services: "Leistungen",
    nav_pipeline: "Pipeline",
    nav_comparison: "Vergleich",
    nav_analyzer: "Analyse",
    nav_allocator: "Allokator",
    nav_sandbox: "Sandbox",
    nav_calculator: "Rechner",
    nav_pricing: "Preise",
    nav_faq: "FAQ",
    nav_cta: "KI-Audit",
    hero_badge: "ShivSpill Neuronale Engine v4.2 Live",
    hero_title_prefix: "Entwicklung von",
    hero_title_gradient: "Viralem Wachstum",
    hero_title_with: "mit",
    hero_desc: "Wir kombinieren autonome neuronale Werbealgorithmen und KI-Content-Engines, um Marken auf 8-stellige Umsätze zu skalieren.",
    hero_primary_btn: "Gratis $5k KI-Plan Sichern",
    hero_secondary_btn: "KI-Sandbox Testen",
    stat_1_label: "Kunden-Werbeumsatz",
    stat_2_label: "Durchschnittlicher ROAS",
    stat_3_label: "Vorhersagegenauigkeit"
  },
  ja: {
    nav_services: "サービス",
    nav_pipeline: "パイプライン",
    nav_comparison: "比較表",
    nav_analyzer: "診断ツール",
    nav_allocator: "配分ツール",
    nav_sandbox: "サンドボックス",
    nav_calculator: "計算機",
    nav_pricing: "料金",
    nav_faq: "よくある質問",
    nav_cta: "AI診断",
    hero_badge: "ShivSpill ニューラルエンジン v4.2稼働中",
    hero_title_prefix: "次世代の",
    hero_title_gradient: "バイラル成長を",
    hero_title_with: "構築する",
    hero_desc: "自律型AI広告アルゴリズムと生成コンテンツエンジンを組み合わせ、ブランドの収益を8桁スケールに成長させます。",
    hero_primary_btn: "$5,000相当のAI成長プランを取得",
    hero_secondary_btn: "AIサンドボックスを試す",
    stat_1_label: "広告売上実績",
    stat_2_label: "平均ROAS",
    stat_3_label: "予測精度"
  },
  hi: {
    nav_services: "सेवाएं",
    nav_pipeline: "पाइपलाइन",
    nav_comparison: "तुलना",
    nav_analyzer: "विश्लेषक",
    nav_allocator: "बजट आवंटक",
    nav_sandbox: "सैंडबॉक्स",
    nav_calculator: "कैलकुलेटर",
    nav_pricing: "मूल्य",
    nav_faq: "प्रश्नोत्तर",
    nav_cta: "ऑडिट बुक करें",
    hero_badge: "शिवस्पिल न्यूरल इंजन v4.2 लाइव",
    hero_title_prefix: "डिजाइनिंग",
    hero_title_gradient: "वायरल ग्रोथ",
    hero_title_with: "के साथ",
    hero_desc: "हम ब्रांडों को 8-अंकीय राजस्व तक ले जाने के लिए स्वायत्त न्यूरल विज्ञापन एल्गोरिदम और जेनेरेटिव एआई का संयोजन करते हैं।",
    hero_primary_btn: "$5k मुफ़्त एआई ग्रोथ प्लान पाएं",
    hero_secondary_btn: "एआई सैंडबॉक्स टेस्ट करें",
    stat_1_label: "क्लाइंट विज्ञापन राजस्व",
    stat_2_label: "औसत ROAS",
    stat_3_label: "पूर्वानुमान सटीकता"
  }
};

let currentLang = 'en';

function initLanguageSelector() {
  const langSelect = document.getElementById('langSelect');
  if (!langSelect) return;

  const savedLang = localStorage.getItem('shivspill_lang') || 'en';
  langSelect.value = savedLang;
  setLanguage(savedLang);

  langSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem('shivspill_lang', selectedLang);
    showToast(`🌐 Language updated to ${selectedLang.toUpperCase()}`);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang] || translations['en'];

  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });
}

/* ==========================================================================
   3. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    mobileBtn.innerHTML = isActive ? `<i class="fa-solid fa-xmark"></i>` : `<i class="fa-solid fa-bars"></i>`;
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    });
  });
}

/* ==========================================================================
   4. AUTONOMOUS MEDIA BUDGET ALLOCATOR SIMULATOR (NEW)
   ========================================================================== */
function updateAllocator() {
  const meta = parseFloat(document.getElementById('allocMeta')?.value || 40);
  const google = parseFloat(document.getElementById('allocGoogle')?.value || 30);
  const tiktok = parseFloat(document.getElementById('allocTiktok')?.value || 20);
  const linkedin = parseFloat(document.getElementById('allocLinkedin')?.value || 10);

  if (document.getElementById('allocMetaVal')) document.getElementById('allocMetaVal').textContent = `${meta}%`;
  if (document.getElementById('allocGoogleVal')) document.getElementById('allocGoogleVal').textContent = `${google}%`;
  if (document.getElementById('allocTiktokVal')) document.getElementById('allocTiktokVal').textContent = `${tiktok}%`;
  if (document.getElementById('allocLinkedinVal')) document.getElementById('allocLinkedinVal').textContent = `${linkedin}%`;

  // Calculated blended yield metrics
  const totalWeight = meta + google + tiktok + linkedin;
  const roasMultiplier = (
    (meta * 5.4 + google * 4.6 + tiktok * 5.1 + linkedin * 3.8) / (totalWeight || 100)
  ).toFixed(2);
  const cpaSavings = (
    (meta * 0.65 + google * 0.52 + tiktok * 0.60 + linkedin * 0.42) / (totalWeight || 100) * 100
  ).toFixed(1);

  if (document.getElementById('allocRoas')) document.getElementById('allocRoas').textContent = `${roasMultiplier}x`;
  if (document.getElementById('allocCpa')) document.getElementById('allocCpa').textContent = `-${cpaSavings}%`;
}

function autoOptimizeAllocator() {
  const btn = document.getElementById('autoOptimizeBtn');
  if (!btn) return;

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Neural Rebalancing...`;

  setTimeout(() => {
    document.getElementById('allocMeta').value = 45;
    document.getElementById('allocGoogle').value = 35;
    document.getElementById('allocTiktok').value = 15;
    document.getElementById('allocLinkedin').value = 5;

    updateAllocator();

    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Auto-Optimize with ShivSpill AI</span>`;

    document.getElementById('allocStatusTag').textContent = 'Status: 100% Neural Synergy';
    document.getElementById('allocAdvice').textContent = '✨ Optimal 45/35/15/5 allocation locked! Blended ROAS maximized at 5.28x with minimal ad spend waste.';

    showToast('⚡ Media Allocation auto-optimized by AI!');
  }, 600);
}

/* ==========================================================================
   5. AD OPS READINESS CHECKLIST (NEW)
   ========================================================================== */
function updateReadinessScore() {
  const checks = document.querySelectorAll('.readiness-check');
  let checkedCount = 0;

  checks.forEach(c => {
    if (c.checked) checkedCount++;
  });

  const pct = Math.round((checkedCount / checks.length) * 100);
  const scoreVal = document.getElementById('readinessScoreVal');
  const bar = document.getElementById('readinessProgressBar');
  const outputText = document.getElementById('readinessOutputText');

  if (scoreVal) scoreVal.textContent = `${pct}%`;
  if (bar) bar.style.width = `${pct}%`;

  if (outputText) {
    if (pct === 100) {
      outputText.textContent = '🚀 Elite 100% AI Scaling Readiness! Your infrastructure is fully primed for 8-figure campaign acceleration.';
    } else if (pct >= 60) {
      outputText.textContent = `Your account has ${checkedCount} of ${checks.length} core AI readiness pillars active. Enabling real-time bidding will push ROAS +42%.`;
    } else {
      outputText.textContent = `Warning: Only ${checkedCount} of ${checks.length} pillars active. Substantial budget leakage present. Deploy CAPI and auto-bidding immediately.`;
    }
  }
}

/* ==========================================================================
   6. MINIMALIST MONOCHROME CANVAS PARTICLE SYSTEM
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: width / 2, y: height / 2, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const particleCount = Math.min(Math.floor(width / 24), 50);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, ' : 'rgba(161, 161, 170, ';
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * 1.2;
        this.y -= (dy / distance) * force * 1.2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / 100) * 0.1;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   7. REFINED AUDIO FEEDBACK ENGINE
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initSoundEngine() {
  const soundBtn = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');

  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      soundIcon.className = 'fa-solid fa-volume-high';
      soundIcon.style.color = 'var(--text-primary)';
      playFuturisticSound('enable');
    } else {
      soundIcon.className = 'fa-solid fa-volume-xmark';
      soundIcon.style.color = 'var(--text-secondary)';
    }
  });

  document.querySelectorAll('.btn, .tone-chip, .tab-btn, .faq-question').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      if (soundEnabled) playFuturisticSound('hover');
    });
    elem.addEventListener('click', () => {
      if (soundEnabled) playFuturisticSound('click');
    });
  });
}

function playFuturisticSound(type) {
  if (!audioCtx || !soundEnabled) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'enable') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    console.warn('Audio Context error:', e);
  }
}

/* ==========================================================================
   8. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Autonomous AI Engines',
    'Neural Growth Models',
    'Predictive Bidding',
    'High-Scale Ad Systems'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && charIdx === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   9. LIVE AI PULSE FEED STREAMER
   ========================================================================== */
function initAiFeedStreamer() {
  const feedContainer = document.getElementById('feedStream');
  if (!feedContainer) return;

  const logPool = [
    'Reallocated ad spend to peak performing lookalike segment',
    'Optimized audience bids across Google PMax (+18.4% CTR)',
    'Generated 24 high-converting creative variations',
    'Lowered target acquisition cost by -$18.40',
    'Scaled daily campaign budget to $42.5k safely'
  ];

  setInterval(() => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    const randomLog = logPool[Math.floor(Math.random() * logPool.length)];

    const newItem = document.createElement('div');
    newItem.className = 'feed-item';
    newItem.innerHTML = `<span class="feed-time">${timeStr}</span> <span>${randomLog}</span>`;

    feedContainer.insertBefore(newItem, feedContainer.firstChild);

    if (feedContainer.children.length > 3) {
      feedContainer.removeChild(feedContainer.lastChild);
    }
  }, 5000);
}

/* ==========================================================================
   10. LIVE AI CONTENT ENGINE DEMO
   ========================================================================== */
function initAiContentDemo() {
  const brandInput = document.getElementById('brandInput');
  const generateBtn = document.getElementById('generateAiBtn');
  const toneChips = document.querySelectorAll('.tone-chip');
  
  const hookEl = document.getElementById('aiHook');
  const bodyEl = document.getElementById('aiBody');
  const tagsEl = document.getElementById('aiTags');
  const outputState = document.getElementById('outputState');
  const copyBtn = document.getElementById('copyAiOutput');

  let activeTone = 'Bold & Disruptive';

  toneChips.forEach(chip => {
    chip.addEventListener('click', () => {
      toneChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTone = chip.getAttribute('data-tone');
    });
  });

  const presetOutputs = {
    'Bold & Disruptive': {
      hook: (brand) => `"Eliminate Unproductive Ad Spend."`,
      body: (brand) => `${brand} leverages predictive neural models to target intent-ready buyers before competitors bid. Automated precision scaling.`,
      tags: '#AIConversion #ScalingEngine #ShivSpill'
    },
    'Urgent / High Conversion': {
      hook: (brand) => `"How Top Brands Scale with ${brand}'s Neural Engine."`,
      body: (brand) => `Unlock instant 4.8x ROAS multipliers. Our autonomous bidding matrix optimizes creative variants in real-time.`,
      tags: '#GrowthEngine #AdScaling #ShivSpill'
    },
    'Sophisticated Luxe': {
      hook: (brand) => `"Architecting Digital Dominance for ${brand}."`,
      body: (brand) => `Precision-engineered marketing for luxury brands. Bespoke audience vectors and algorithmic storytelling.`,
      tags: '#BrandScale #ShivSpill #NeuralArchitecture'
    },
    'Data-Driven B2B': {
      hook: (brand) => `"Predictive Account-Based Scaling Engine for ${brand}."`,
      body: (brand) => `Reduce customer acquisition costs by up to 64% using server-side neural attribution models.`,
      tags: '#B2BGrowth #EnterpriseAI #ShivSpill'
    }
  };

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const brand = brandInput.value.trim() || 'Lumina';
      const template = presetOutputs[activeTone] || presetOutputs['Bold & Disruptive'];

      outputState.textContent = 'Synthesizing...';
      generateBtn.disabled = true;

      setTimeout(() => {
        hookEl.textContent = template.hook(brand);
        bodyEl.textContent = template.body(brand);
        tagsEl.textContent = template.tags;

        outputState.textContent = 'Synthesis Complete';
        generateBtn.disabled = false;

        showToast(`Generated script for "${brand}"`);
      }, 500);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const fullText = `${hookEl.textContent}\n\n${bodyEl.textContent}\n\n${tagsEl.textContent}`;
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('Copied script to clipboard');
      });
    });
  }
}

/* ==========================================================================
   11. AI ROI ESTIMATOR
   ========================================================================== */
function initRoiCalculator() {
  const budgetSlider = document.getElementById('budgetSlider');
  const budgetVal = document.getElementById('budgetVal');
  const avgAovInput = document.getElementById('avgAov');
  const targetChannel = document.getElementById('targetChannel');

  const projectedRevEl = document.getElementById('projectedRevenue');
  const projectedRoasEl = document.getElementById('projectedRoas');
  const cpaDropEl = document.getElementById('cpaDrop');
  const leadVolumeEl = document.getElementById('leadVolume');

  if (!budgetSlider) return;

  function calculate() {
    const budget = parseFloat(budgetSlider.value);
    const aov = parseFloat(avgAovInput.value) || 180;
    const channel = targetChannel.value;

    budgetVal.textContent = `$${budget.toLocaleString()}`;

    let roasMultiplier = 4.70;
    let cpaReduction = 54.5;

    if (channel === 'meta') { roasMultiplier = 5.20; cpaReduction = 58.0; }
    else if (channel === 'google') { roasMultiplier = 4.40; cpaReduction = 48.0; }
    else if (channel === 'b2b') { roasMultiplier = 3.90; cpaReduction = 42.0; }

    const projectedRevenue = Math.round(budget * roasMultiplier);
    const estimatedLeads = Math.round(projectedRevenue / (aov * 0.95));

    projectedRevEl.textContent = `$${projectedRevenue.toLocaleString()}`;
    projectedRoasEl.textContent = `${roasMultiplier.toFixed(2)}x`;
    cpaDropEl.textContent = `-${cpaReduction.toFixed(1)}%`;
    leadVolumeEl.textContent = estimatedLeads.toLocaleString();
  }

  budgetSlider.addEventListener('input', calculate);
  if (avgAovInput) avgAovInput.addEventListener('input', calculate);
  if (targetChannel) targetChannel.addEventListener('change', calculate);

  calculate();
}

/* ==========================================================================
   12. INSTANT AD ACCOUNT HEALTH ANALYZER
   ========================================================================== */
function runAccountHealthAudit() {
  const spend = parseFloat(document.getElementById('healthMonthlySpend').value) || 20000;
  const roas = parseFloat(document.getElementById('healthCurrentRoas').value) || 2.2;
  const btn = document.getElementById('runHealthAuditBtn');

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Analyzing Signals...`;

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-stethoscope"></i> <span>Run Instant AI Diagnostic</span>`;

    const wastedBudgetPct = Math.min(Math.max(Math.round((3.5 - roas) * 22 + 15), 12), 48);
    const unlockableRoasVal = (roas * 1.85).toFixed(2);
    const healthScore = Math.min(Math.max(Math.round(roas * 28), 35), 92);

    document.getElementById('healthStatusTag').textContent = `Score: ${healthScore}/100 (${healthScore > 75 ? 'Good' : 'Needs Optimization'})`;
    document.getElementById('healthWastedBudget').textContent = `${wastedBudgetPct}%`;
    document.getElementById('healthCreativeFatigue').textContent = wastedBudgetPct > 30 ? 'High' : 'Moderate';
    document.getElementById('healthAttributionLoss').textContent = `-${Math.round(wastedBudgetPct * 1.1)}%`;
    document.getElementById('healthUnlockableRoas').textContent = `${unlockableRoasVal}x`;

    document.getElementById('healthRecommendation').textContent = 
      `At $${spend.toLocaleString()}/mo spend, deploying CAPI Server-Side attribution can recover up to $${Math.round(spend * 0.28).toLocaleString()} in wasted budget annually.`;

    showToast('✨ Account Health Audit Complete!');
  }, 700);
}

/* ==========================================================================
   13. PLAYBOOK DOWNLOAD HANDLER
   ========================================================================== */
function downloadPlaybook(title) {
  showToast(`📥 Downloading "${title}" Strategy Blueprint...`);
  setTimeout(() => {
    openAuditModal();
  }, 1000);
}

/* ==========================================================================
   14. CASE STUDY TABS
   ========================================================================== */
function initCaseStudyTabs() {
  const tabBtns = document.querySelectorAll('.case-filter-tabs .tab-btn');
  const caseCards = document.querySelectorAll('.case-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');

      caseCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   15. PRICING TOGGLE
   ========================================================================== */
function initPricingToggle() {
  const switchBtn = document.getElementById('pricingSwitch');
  const price1 = document.getElementById('price1');
  const price2 = document.getElementById('price2');
  const period1 = document.getElementById('period1');
  const period2 = document.getElementById('period2');

  if (!switchBtn) return;

  let isPerformance = false;

  switchBtn.addEventListener('click', () => {
    isPerformance = !isPerformance;
    switchBtn.classList.toggle('active', isPerformance);

    if (isPerformance) {
      price1.textContent = '10%';
      period1.textContent = 'of Net Revenue';
      price2.textContent = '15%';
      period2.textContent = 'of Net Revenue';
    } else {
      price1.textContent = '$3,500';
      period1.textContent = '/month';
      price2.textContent = '$6,500';
      period2.textContent = '/month';
    }
  });
}

/* ==========================================================================
   16. NAVBAR SCROLL
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   17. MODAL AUDIT WIZARD
   ========================================================================== */
function openAuditModal() {
  const modal = document.getElementById('auditModal');
  if (modal) {
    modal.classList.add('active');
    nextModalStep(1);
  }
}

function closeAuditModal() {
  const modal = document.getElementById('auditModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function nextModalStep(stepNum) {
  const steps = [1, 2, 3];
  steps.forEach(s => {
    const stepEl = document.getElementById(`modalStep${s}`);
    const dotEl = document.getElementById(`stepDot${s}`);
    if (stepEl) stepEl.style.display = s === stepNum ? 'block' : 'none';
    if (dotEl) dotEl.classList.toggle('active', s <= stepNum);
  });
}

function submitAuditForm(e) {
  e.preventDefault();
  const name = document.getElementById('auditName').value;
  closeAuditModal();
  showToast(`Audit request submitted for ${name}`);
}

/* ==========================================================================
   18. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   19. TOAST STREAMER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-check"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initToastStreamer() {
  setTimeout(() => {
    showToast('New AI Growth Audit request received');
  }, 8000);
}
