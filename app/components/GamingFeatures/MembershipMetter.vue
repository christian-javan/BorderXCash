<script setup lang="ts">
const dummyData = {
  utilizationPct: 62,
  membershipCost: 9.00,
  savingsAccumulated: 5.60,
  daysRemaining: 12
}
</script>

<template>
  <div class="mockup-wrap">
    <div class="meter-bar-wrap">
      <div class="meter-header">
        <span class="meter-label">Membresía aprovechada este mes</span>
        <span class="meter-pct">{{ dummyData.utilizationPct }}%</span>
      </div>
      <div class="meter-track">
        <div class="meter-fill" :style="{ width: dummyData.utilizationPct + '%' }" />
      </div>
    </div>
    <div class="tier-row">
      <div class="tier-dot done" />
      <span class="tier-name">Membresía mensual</span>
      <span class="tier-val">${{ dummyData.membershipCost.toFixed(2) }} USD</span>
    </div>
    <div class="tier-row">
      <div class="tier-dot done" />
      <span class="tier-name">Ahorro acumulado</span>
      <span class="tier-val green">${{ dummyData.savingsAccumulated.toFixed(2) }} USD</span>
    </div>
    <div class="tier-row">
      <div class="tier-dot partial" />
      <span class="tier-name">Restante del mes</span>
      <span class="tier-val">{{ dummyData.daysRemaining }} días</span>
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

.meter-bar-wrap {
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.2s;
}
.meter-bar-wrap:hover { border-color: #3b82f6; }

.meter-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.meter-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #8ab0d4;
  letter-spacing: 0.5px;
}

.meter-pct {
  font-family: 'Exo 2', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}

.meter-track {
  height: 8px;
  background: #0d348a;
  border-radius: 4px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #ff4757, #ff6b6b);
  box-shadow: 0 0 15px rgba(255, 71, 87, 0.4);
  transition: width 1s ease;
}

.tier-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  transition: all 0.2s;
}
.tier-row:hover { border-color: #3b82f6; }

.tier-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tier-dot.done {
  background: #00e676;
  box-shadow: 0 0 10px rgba(0,230,118,0.5);
}

.tier-dot.partial {
  background: #ff4757;
  box-shadow: 0 0 10px rgba(255, 71, 87, 0.5);
}

.tier-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #8ab0d4;
  flex: 1;
}

.tier-val {
  font-family: 'Exo 2', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}

.tier-val.green {
  color: #00e676;
  text-shadow: 0 0 15px rgba(0,230,118,0.4), 0 4px 8px rgba(0,0,0,0.8);
}
</style>