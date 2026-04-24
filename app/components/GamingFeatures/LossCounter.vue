<script setup lang="ts">
const dummyData = {
  lossAmount: 47,
  marketRate: 18.20,
  reticulaRate: 18.65,
  lastConversion: { day: 'lunes', amount: 200, currency: 'USD' }
}
</script>

<template>
  <div class="mockup-wrap">
    <div class="loss-display">
      <span class="loss-label">Esta semana dejaste en el mercado</span>
      <span class="loss-amount">${{ dummyData.lossAmount }} MXN</span>
      <span class="loss-sub">vs. tipo de cambio Retícula</span>
    </div>
    <div class="comparison-row">
      <span class="comp-label">Mercado (ventanilla)</span>
      <span class="comp-val">{{ dummyData.marketRate.toFixed(2) }} MXN/USD</span>
    </div>
    <div class="comparison-row">
      <span class="comp-label">Tu tipo Retícula</span>
      <span class="comp-val green">{{ dummyData.reticulaRate.toFixed(2) }} MXN/USD</span>
    </div>
    <div class="comparison-row">
      <span class="comp-label">Última conversión</span>
      <span class="comp-val">{{ dummyData.lastConversion.day }} · ${{ dummyData.lastConversion.amount }} {{ dummyData.lastConversion.currency }}</span>
    </div>
  </div>
</template>

<style scoped>
.mockup-wrap {
  background: linear-gradient(180deg, #0d348a 0%, #061b5c 100%);
  border: 2px solid #2354b5;
  border-radius: 16px;
  padding: 24px 30px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.6), inset 0 2px 4px rgba(100,160,255,0.4);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mockup-wrap::before {
  content: '';
  position: absolute;
  top: 0; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(150,200,255,0.4), transparent);
}

.loss-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 16px 20px;
  background: rgba(208, 2, 27, 0.15);
  border: 1px solid rgba(208, 2, 27, 0.5);
  border-radius: 12px;
}

.loss-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #ff6b6b;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.loss-amount {
  font-family: 'Exo 2', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #ff4757;
  line-height: 1;
  text-shadow: 0 0 15px rgba(255, 71, 87, 0.4), 0 4px 8px rgba(0,0,0,0.8);
}

.loss-sub {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #8ab0d4;
}

.comparison-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  transition: all 0.2s;
}
.comparison-row:hover { border-color: #3b82f6; }

.comp-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #8ab0d4;
  letter-spacing: 0.5px;
}

.comp-val {
  font-family: 'Exo 2', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}

.comp-val.green {
  color: #00e676;
  text-shadow: 0 0 15px rgba(0,230,118,0.4), 0 4px 8px rgba(0,0,0,0.8);
}

</style>