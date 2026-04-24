<template>
  <div class="converter-panel">
    <div class="converter-row">
      <!-- FROM -->
      <div>
        <div class="conv-side-label">TÚ ENVÍAS</div>
        <div class="currency-selector">
          <div>
            <img src="/images/Bandera USA.png" alt="USA" class="currency-img-flag">
            <span class="currency-code">USD</span>
          </div>
          <span class="currency-chevron"><Icon name="ph:caret-down-bold" /></span>
        </div>
          <div class="amount-input-wrap">
            <input class="amount-input" type="number" v-model.number="amountFrom" step="0.01" min="0">
          </div>
        <div class="balance-label">Saldo: 1,250.00 USD</div>
      </div>

      <!-- ARROW -->
      <div class="conv-arrow-col">
        <div class="conv-arrow">➜</div>
      </div>

      <!-- TO -->
      <div>
        <div class="conv-side-label">TÚ RECIBES</div>
        <div class="currency-selector">
          <div>
            <img src="/images/Bandera MEX.png" alt="MEX" class="currency-img-flag">
            <span class="currency-code">MXN</span>
          </div>
          <span class="currency-chevron"><Icon name="ph:caret-down-bold" /></span>
        </div>
          <div class="amount-output">{{ amountTo }}</div>
        <div class="balance-label">Saldo: 0.00 MXN</div>
      </div>
    </div>

    <!-- RATE SECTION -->
    <div class="rate-section">
      <div class="rate-label">TIPO DE CAMBIO</div>
      <div class="rate-bar">
        <div class="rate-equation">
          <span class="rate-unit">1</span>
          <span class="rate-currency">USD</span>
          <span class="rate-equals">=</span>
          <span class="rate-value-emphasis">{{ rate }}</span>
          <span class="rate-currency-small">MXN</span>
          <span class="rate-change-pos">+0.23% <Icon name="ph:caret-up-bold" /></span>
        </div>
      </div>
    </div>

    <button class="btn-cambiar">CAMBIAR AHORA</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const rate = ref(16.8974) // default fallback
const amountFrom = ref(100.00)

onMounted(async () => {
  try {
    const { data } = await $fetch('/api/fx/current')
    rate.value = data.rateTier1 // use the correct property from API response
  } catch (error) {
    console.error('Error fetching current exchange rate:', error)
  }
})

const amountTo = computed(() => (amountFrom.value * rate.value).toFixed(2))
</script>

<style scoped>
/* Converter Panel Styles */
.converter-panel {
  width: 100%; max-width: 820px;
  background: linear-gradient(180deg, #0d348a 0%, #061b5c 100%);
  border: 2px solid #2354b5;
  border-radius: 16px;
  padding: 24px 30px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.6), inset 0 2px 4px rgba(100,160,255,0.4);
  position: relative;
}
.converter-panel::before {
  content: '';
  position: absolute; top: 0; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(150,200,255,0.4), transparent);
}

.converter-row {
  display: grid; grid-template-columns: 1fr 80px 1fr; gap: 20px; align-items: center;
}
.conv-side-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 15px; font-weight: 800; letter-spacing: 2px;
  color: #e2e8f0;
  margin-bottom: 12px;
  text-align: center;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.conv-arrow-col {
  display: flex; align-items: center; justify-content: center;
  margin-top: 20px;
}
.conv-arrow {
  font-size: 60px;
  color: #00cfff;
  font-weight: 900;
  background: linear-gradient(135deg, #00f0ff, #0077ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 12px rgba(0,200,255,0.8));
  animation: arrowPulse 2s ease-in-out infinite;
}
@keyframes arrowPulse {
  0%,100% { filter: drop-shadow(0 0 12px rgba(0,200,255,0.8)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 20px rgba(0,255,255,1)); transform: scale(1.05); }
}

.currency-selector {
  display: flex; align-items: center; justify-content: center; gap: 15px;
  padding: 14px 20px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
  width: 100%;
}
.currency-selector:hover { border-color: #3b82f6; }
.currency-selector > div { display: flex; align-items: center; gap: 10px; }
.currency-img-flag { 
  width: 34px; height: 34px; 
  border-radius: 50%; object-fit: cover; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.currency-code {
  font-family: 'Exo 2', sans-serif;
  font-size: 22px; font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.currency-chevron { color: #8ab0d4; font-size: 14px; }

.amount-input-wrap { position: relative; }
.amount-input {
  width: 100%;
  padding: 16px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  font-family: 'Exo 2', sans-serif;
  font-size: 38px; font-weight: 800;
  color: #fff;
  text-align: center;
  outline: none;
  transition: all 0.2s;
  -moz-appearance: textfield;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.amount-input::-webkit-inner-spin-button,
.amount-input::-webkit-outer-spin-button { -webkit-appearance: none; }
.amount-input:focus {
  border-color: #00cfff;
  box-shadow: 0 0 15px rgba(0,207,255,0.4);
}

.amount-output {
  width: 100%;
  padding: 16px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  font-family: 'Exo 2', sans-serif;
  font-size: 38px; font-weight: 800;
  color: #00e676;
  text-align: center;
  text-shadow: 0 0 15px rgba(0,230,118,0.5), 0 4px 8px rgba(0,0,0,0.8);
}

.balance-label {
  margin-top: 10px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; font-weight: 600; letter-spacing: 0.5px;
  color: #8ab0d4;
  text-align: center;
}

.rate-section {
  margin-top: 24px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.rate-bar {
  width: 100%;
  padding: 16px 30px;
  background: rgba(4,10,25,0.7);
  border: 1px solid rgba(60,120,255,0.3);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.rate-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 15px; font-weight: 700; letter-spacing: 2px;
  color: #8ab0d4;
}
.rate-equation {
  display: flex; align-items: baseline; justify-content: center; gap: 8px;
  font-family: 'Exo 2', sans-serif;
}
.rate-unit {
  font-size: 20px; font-weight: 800; color: #fff;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.rate-currency {
  font-size: 16px; font-weight: 700; color: #8ab0d4;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.rate-equals {
  font-size: 20px; font-weight: 800; color: #fff; margin: 0 2px;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.rate-value-emphasis {
  font-size: 28px; font-weight: 800; color: #00e676;
  text-shadow: 0 0 15px rgba(0,230,118,0.4), 0 4px 8px rgba(0,0,0,0.8);
  margin: 0 4px;
}
.rate-currency-small {
  font-size: 14px; font-weight: 700; color: #8ab0d4;
  text-shadow: 0 4px 8px rgba(0,0,0,0.8);
}
.rate-change-pos {
  font-size: 16px; font-weight: 800; color: #00e676;
  margin-left: 14px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.btn-cambiar {
  display: block; width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: linear-gradient(180deg, #33cc44 0%, #1a8a2a 100%);
  border: 2px solid #44dd55;
  border-radius: 10px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 14px; font-weight: 800; letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,200,60,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: all 0.2s;
  text-align: center;
}
.btn-cambiar:hover {
  background: linear-gradient(180deg, #44dd55 0%, #25a035 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,220,80,0.5);
}
</style>