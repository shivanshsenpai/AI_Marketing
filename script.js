/* ==========================================================================
   SHIVSPILL - NEXT-GEN AI MARKETING AGENCY
   Theme: High-Contrast Minimalist Monochrome Architecture
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initSoundEngine();
  initTypewriter();
  initAiFeedStreamer();
  initAiContentDemo();
  initRoiCalculator();
  initCaseStudyTabs();
  initPricingToggle();
  initNavbarScroll();
  initToastStreamer();
  initFaqAccordion();
});

/* ==========================================================================
   1. MINIMALIST MONOCHROME CANVAS PARTICLE SYSTEM
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
   2. REFINED AUDIO FEEDBACK ENGINE
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
      soundIcon.style.color = '#ffffff';
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
   3. TYPEWRITER EFFECT
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
   4. LIVE AI PULSE FEED STREAMER
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
   5. LIVE AI CONTENT ENGINE DEMO
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
   6. AI ROI ESTIMATOR
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
   7. CASE STUDY TABS
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
   8. PRICING TOGGLE
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
   9. NAVBAR SCROLL
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
   10. MODAL AUDIT WIZARD
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
   11. FAQ ACCORDION (NEW)
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
   12. TOAST STREAMER
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
