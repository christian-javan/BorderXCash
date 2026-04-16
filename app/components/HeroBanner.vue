<template>
  <div class="hero-banner">
    <div class="hero-ribbon">
      <div class="hero-title">DÓLARES A PESOS</div>
      <div class="hero-sub"><span class="rate-live-dot"></span>Cotización en tiempo real</div>
    </div>
  </div>
</template>

<script setup>
// Component logic if needed
</script>

<style scoped>
/* Hero Banner Styles */
.hero-banner {
  position: relative;
  text-align: center;
  margin-bottom: 6px;
}
.hero-ribbon {
  display: inline-block;
  padding: 10px 60px 14px;
  background: linear-gradient(180deg, #2a5fd6 0%, #1a3faa 50%, #0e2a80 100%);
  border: 3px solid #f5c518;
  border-radius: 8px;
  position: relative;
  box-shadow:
    0 4px 30px rgba(26,63,170,0.6),
    0 0 0 1px rgba(245,197,24,0.2),
    inset 0 1px 0 rgba(255,255,255,0.1);
}
.hero-ribbon::before,
.hero-ribbon::after {
  content: '';
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 40px; height: 120%;
  background: linear-gradient(180deg, #c8921c, #a07010);
  border-radius: 3px;
}
.hero-ribbon::before { left: -8px; clip-path: polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%); }
.hero-ribbon::after  { right: -8px; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%); }
.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 36px; font-weight: 900;
  color: #fff;
  text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 3px;
  line-height: 1;
}
.hero-sub {
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px; font-weight: 500;
  color: #00cfff;
  letter-spacing: 2px;
  margin-top: 4px;
  text-shadow: 0 0 10px rgba(0,207,255,0.5);
}

.rate-live-dot {
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: #00e676;
  box-shadow: 0 0 6px #00e676;
  margin-right: 6px;
  animation: blink 1.4s ease-in-out infinite;
}
@keyframes blink {
  0%,100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>