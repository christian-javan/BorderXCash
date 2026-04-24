<script setup lang="ts">
const dummyData = {
  currentStreak: 6,
  bestStreak: 11,
  totalWeeks: 8,
  activeWeeks: [true, true, true, true, true, true]
}

const weekDots = Array.from({ length: dummyData.totalWeeks }, (_, i) => {
  if (i < dummyData.activeWeeks.length && dummyData.activeWeeks[i]) return 'active'
  if (i === dummyData.activeWeeks.length) return 'current'
  return 'inactive'
})
</script>

<template>
  <div class="mockup-wrap">
    <div class="streak-stat">
      <div>
        <span class="streak-num">{{ dummyData.currentStreak }}</span>
        <span class="streak-txt"> semanas seguidas</span>
      </div>
      <div style="text-align:right">
        <div class="streak-best-label">mejor racha</div>
        <div class="streak-best-val">{{ dummyData.bestStreak }} sem</div>
      </div>
    </div>
    <div class="streak-grid">
      <div
        v-for="(status, i) in weekDots"
        :key="i"
        :class="['streak-dot', status]"
      >
        <span v-if="status === 'current'">?</span>
      </div>
    </div>
    <div class="streak-footer">
      <span>S1 — semana actual</span>
      <span class="mono">S8 →</span>
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

.streak-stat {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
}

.streak-num {
  font-family: 'Exo 2', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}

.streak-txt {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #8ab0d4;
}

.streak-best-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #8ab0d4;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.streak-best-val {
  font-family: 'Exo 2', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}

.streak-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.streak-dot {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Exo 2', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #8ab0d4;
  background: #081636;
  border: 2px solid #16326e;
  flex-shrink: 0;
  transition: all 0.2s;
}

.streak-dot.active {
  background: #00e676;
  border-color: #00e676;
  color: #061b5c;
  box-shadow: 0 0 15px rgba(0,230,118,0.4);
}

.streak-dot.active::after {
  content: '✓';
  font-size: 16px;
  font-weight: 900;
}

.streak-dot.current {
  border: 2px solid #ff4757;
  color: #ff4757;
  background: rgba(208, 2, 27, 0.15);
  box-shadow: 0 0 15px rgba(255, 71, 87, 0.3);
}

.streak-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #8ab0d4;
}

.mono {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  font-weight: 700;
}
</style>