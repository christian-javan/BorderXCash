<template>
  <div>
    <div class="bg-scene"></div>
    <div class="bg-city"></div>
    <div class="bg-overlay"></div>

    <div class="page-wrapper">
      <!-- NAVBAR -->
      <nav class="navbar">
        <div class="nav-logo">
          <div class="nav-logo-icon"><Icon name="ph:plus-bold" /></div>
          <span class="nav-logo-text">Tipo de Cambio</span>
        </div>
        <div class="nav-links">
          <a class="nav-link" href="#"><span class="nav-link-icon"><Icon name="ph:house-fill" /></span> Inicio</a>
          <a class="nav-link" href="#"><span class="nav-link-icon"><Icon name="ph:users-fill" /></span> Nosotros</a>
          <a class="nav-link" href="#"><span class="nav-link-icon"><Icon name="ph:book-open-fill" /></span> Blog</a>
        </div>
        <div class="nav-sep"></div>
        <div class="nav-badge">
          <div class="nav-badge-icon-sq"><Icon name="ph:plus-bold" /></div>
          <span style="color:#fff;">12 450</span>
          <Icon name="ph:coin-fill" style="color: var(--gold); font-size: 20px;" />
        </div>
        <div style="width:4px"></div>
        <div class="nav-badge">
          <div class="nav-badge-icon-sq"><Icon name="ph:plus-bold" /></div>
          <span style="color:#fff;"><span id="navDays">30</span> DÍAS</span>
        </div>
        <button class="nav-btn-login">Iniciar Sesión</button>
        <div class="nav-lang">ES <Icon name="ph:caret-down-bold" /></div>
      </nav>

      <!-- TICKER -->
      <div class="ticker-bar">
        <div class="ticker-inner" id="tickerInner"></div>
      </div>

      <!-- MAIN CONTENT -->
      <main>
        <slot />
      </main>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="footer-col">
          <div class="footer-col-icon"><Icon name="ph:arrows-clockwise-bold" /></div>
          <div class="footer-col-text">
            <div class="footer-col-title">¿Cómo Funciona?</div>
            <div class="footer-col-sub">Paso a paso en minutos.</div>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col-icon"><Icon name="ph:info-fill" /></div>
          <div class="footer-col-text">
            <div class="footer-col-title">Acerca de Nosotros</div>
            <div class="footer-col-sub">Tecnología Fronteriza.</div>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col-icon"><Icon name="ph:smiley-fill" /></div>
          <div class="footer-col-text">
            <div class="footer-col-title">Clientes Satisfechos</div>
            <div class="footer-col-sub">Casos reales de éxito.</div>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col-icon"><Icon name="ph:article-fill" /></div>
          <div class="footer-col-text">
            <div class="footer-col-title">Blog y Noticias</div>
            <div class="footer-col-sub">Finanzas al instante.</div>
          </div>
        </div>
        <div class="footer-email-wrap">
          <input class="footer-email-input" type="email" placeholder="Ingresa tu correo electrónico">
          <button class="footer-subscribe-btn">SUSCRIBIRSE</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;500;600;700;800;900&display=swap'
    }
  ]
});

// ─── TICKER ───────────────────────────────────────────────
const pairs = [
  ['USD/MXN','16.9050','+0.23%',true],
  ['EUR/MXN','18.4200','+0.11%',true],
  ['GBP/MXN','21.3400','-0.08%',false],
  ['CAD/MXN','12.5100','+0.15%',true],
  ['EUR/USD','1.0890','+0.05%',true],
  ['GBP/USD','1.2620','-0.12%',false],
  ['USD/CAD','1.3490','-0.03%',false],
  ['BTC/USD','67,420','+2.34%',true],
  ['ETH/USD','3,210','+1.87%',true],
  ['XAU/USD','2,328','+0.42%',true],
];

function buildTicker() {
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  const items = [...pairs, ...pairs].map(([pair, val, chg, up]) =>
    `<span class="ticker-item"><span class="pair">${pair}</span>${val} <span class="${up?'up':'dn'}">${chg}</span></span>`
  ).join('');
  inner.innerHTML = items;
}

onMounted(() => {
  buildTicker();
});
</script>

<style>
/* Copied from the HTML */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #f5c518;
  --gold-light: #ffd84d;
  --gold-dark: #b8860b;
  --blue-deep: #0a1628;
  --blue-mid: #0d2247;
  --blue-ui: #1a3a7c;
  --blue-bright: #1e4db7;
  --blue-panel: #0e2a5c;
  --blue-border: #2a5298;
  --blue-glow: #3a7bd5;
  --green: #00e676;
  --green-dark: #1aab1a;
  --red: #ff4757;
  --cyan: #00cfff;
  --text-main: #e8f4ff;
  --text-dim: #8ab0d4;
  --panel-bg: rgba(10,22,55,0.92);
}

html, body {
  width: 100%; min-height: 100vh;
  font-family: 'Exo 2', sans-serif;
  background: #0a0e1a;
  color: var(--text-main);
  overflow-x: hidden;
}

/* ─── BACKGROUND ─── */
.bg-scene {
  position: fixed; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,120,30,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 20% 60%, rgba(100,60,200,0.15) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 80% 40%, rgba(30,80,200,0.12) 0%, transparent 50%),
    linear-gradient(180deg, #1a0a2e 0%, #0d1a3a 25%, #0a1225 55%, #060d1a 100%);
}
.bg-city {
  position: fixed; inset: 0; z-index: 0;
  background-image: url("/images/Fondo Tijuana moderna.png");
  background-size: cover;
  background-position: center bottom;
  opacity: 1;
}
.bg-overlay {
  position: fixed; inset: 0; z-index: 1;
  background: linear-gradient(180deg,
    rgba(8,12,30,0.4) 0%,
    rgba(5,10,25,0.2) 40%,
    rgba(5,8,20,0.5) 80%,
    rgba(5,8,20,0.85) 100%
  );
}

  /* ─── LAYOUT ─── */
  .page-wrapper {
    position: relative; z-index: 2;
  }

  main {
    position: fixed;
    top: 80px;
    bottom: 100px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }

/* ─── NAVBAR ─── */
  .navbar {
  display: flex; align-items: center; gap: 12px;
  padding: 15px 24px;
  background: transparent;
  border: none;
  box-shadow: none;
  position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
}
.nav-logo {
  display: flex; align-items: center; gap: 8px;
  margin-right: 10px;
  padding: 4px 14px 4px 4px;
  background: rgba(10,22,50,0.85);
  border: 1px solid rgba(60,100,200,0.4);
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
}
.nav-logo-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, #1e4db7, #2a6dd9);
  border: 2px solid var(--gold);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 10px rgba(245,197,24,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
  font-size: 16px; color: var(--gold);
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
}
.nav-logo-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px; font-weight: 700;
  color: var(--text-main);
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255,220,100,0.3);
}
.nav-sep { flex: 1; }

.nav-links {
  display: flex; gap: 4px; margin: 0;
  padding: 4px;
  background: rgba(10,22,50,0.85);
  border: 1px solid rgba(60,100,200,0.4);
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
}
.nav-link {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px;
  background: transparent;
  border: none;
  border-radius: 20px;
  color: var(--text-main);
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 600; letter-spacing: 0.5px;
  cursor: pointer; text-decoration: none;
  transition: all 0.2s;
}
.nav-link:hover {
  background: rgba(40,80,180,0.6);
  color: #fff;
}
.nav-link-icon { font-size: 14px; opacity: 0.8; }

.nav-badge {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  background: rgba(10,22,50,0.85);
  border: 1px solid rgba(60,100,200,0.5);
  border-radius: 20px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px; font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
}
.nav-badge-icon-sq {
  width: 20px; height: 20px;
  background: linear-gradient(180deg, #2ae04a, #1a8f2e);
  border: 1px solid #4ade62;
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 14px;
}

.nav-btn-login {
  padding: 7px 18px;
  background: linear-gradient(180deg, #28a745 0%, #1a8a32 100%);
  border: 1px solid #3dba57;
  border-radius: 20px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 700; letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,180,60,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
  transition: all 0.2s;
  margin: 0;
}
.nav-btn-login:hover {
  background: linear-gradient(180deg, #32c355 0%, #22a040 100%);
  box-shadow: 0 2px 14px rgba(0,200,80,0.45);
}

.nav-lang {
  padding: 7px 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  color: #0f172a;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  display: flex; align-items: center; gap: 4px;
}

/* ─── FOOTER ─── */
  .footer {
  background: rgba(4,10,25,0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 2px solid rgba(40,80,180,0.4);
  padding: 20px 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
  position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
}
.footer-col {
  display: flex; align-items: center; gap: 12px;
  padding-right: 20px;
  border-right: 1px solid rgba(60,120,255,0.3);
  flex: 1;
}
.footer-col:last-of-type {
  border-right: none;
  padding-right: 0;
}
.footer-col-icon {
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(20,50,120,0.7);
  border: 1px solid rgba(60,110,220,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
  color: var(--cyan);
}
.footer-col-text { flex: 1; }
.footer-col-title {
  font-family: 'Exo 2', sans-serif;
  font-size: 14px; font-weight: 700; letter-spacing: 0.5px;
  color: var(--text-main);
}
.footer-col-sub {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px; font-weight: 500;
  color: var(--text-dim);
  margin-top: 2px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.footer-email-wrap {
  display: flex; gap: 10px; align-items: center;
  margin-left: 20px;
}
.footer-email-input {
  width: 200px;
  padding: 10px 14px;
  background: rgba(10,20,55,0.7);
  border: 1px solid rgba(50,90,200,0.4);
  border-radius: 8px;
  color: #fff; font-family: 'Exo 2', sans-serif; font-size: 13px;
  outline: none;
}
.footer-email-input::placeholder { color: var(--text-dim); }
.footer-subscribe-btn {
  padding: 10px 20px;
  background: linear-gradient(180deg, #28a745, #1a6e2f);
  border: 1px solid #3dba57;
  border-radius: 8px;
  color: #fff; font-family: 'Exo 2', sans-serif;
  font-size: 14px; font-weight: 700; letter-spacing: 1px;
  cursor: pointer; white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0,200,60,0.3);
}

/* ─── TICKER ─── */
.ticker-bar {
  display: none;
  width: 100%; overflow: hidden;
  background: rgba(5,12,35,0.85);
  border-top: 1px solid rgba(40,80,160,0.3);
  border-bottom: 1px solid rgba(40,80,160,0.3);
  padding: 5px 0;
}
.ticker-inner {
  display: flex; gap: 40px;
  animation: tickerMove 30s linear infinite;
  white-space: nowrap;
}
@keyframes tickerMove {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-item {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
  color: var(--text-dim);
  flex-shrink: 0;
}
.ticker-item .pair { color: var(--text-main); margin-right: 6px; }
.ticker-item .up { color: var(--green); }
.ticker-item .dn { color: var(--red); }

/* ─── SHIMMER ANIM ─── */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.rate-live-dot {
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 6px var(--green);
  margin-right: 6px;
  animation: blink 1.4s ease-in-out infinite;
}
@keyframes blink {
  0%,100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>