<template>
  <div class="bottom-grid">
    <!-- LEFT COLUMN -->
    <div class="left-col">
      <!-- STATS LEFT -->
      <div class="stats-left">
        <div class="stats-title"><Icon name="ph:target-bold" /> OPERACIÓN</div>
        <div class="stat-row">
          <span>MÍNIMO (24H)</span>
          <span class="stat-val-green">16.6500</span>
        </div>
        <div class="stat-row">
          <span>MÁXIMO (24H)</span>
          <span class="stat-val-red">17.1200</span>
        </div>

        <button class="btn-cambiar">CAMBIAR AHORA</button>
      </div>

      <div class="social-panel">
        <div class="social-row">
          <div class="social-btn social-fb"><Icon name="ph:facebook-logo-fill" /></div>
          <div class="social-btn social-tw"><Icon name="ph:x-logo-bold" /></div>
          <div class="social-btn social-yt"><Icon name="ph:youtube-logo-fill" /></div>
        </div>
      </div>
    </div>

    <!-- CHART PANEL -->
    <div class="chart-panel">
      <div class="chart-header">
        <div class="chart-title"><span class="crown"><Icon name="ph:crown-fill" /></span> ESTADÍSTICAS</div>
        <div class="chart-info-btn"><Icon name="ph:info-fill" /></div>
      </div>
      <div class="chart-stats-island">
        <div class="chart-stat-item">
          <div class="chart-stat-label">MÍNIMO (24H)</div>
          <div class="chart-stat-val green">16.6500</div>
        </div>
        <div class="chart-stat-divider"></div>
        <div class="chart-stat-item">
          <div class="chart-stat-label">MÁXIMO (24H)</div>
          <div class="chart-stat-val red">17.1200</div>
        </div>
        <div class="chart-stat-divider"></div>
        <div class="chart-stat-item">
          <div class="chart-stat-label">VARIACIÓN</div>
          <div class="chart-stat-val pos">+1.23% ▲</div>
        </div>
      </div>

      <div class="chart-canvas-wrap">
        <canvas id="rateChart"></canvas>
      </div>

        <div class="chart-timeframe">
          <button class="tf-btn" @click="setTF($event.target, '1H')">1H</button>
          <button class="tf-btn" @click="setTF($event.target, '6H')">6H</button>
          <button class="tf-btn active" @click="setTF($event.target, '24H')">24H</button>
          <button class="tf-btn" @click="setTF($event.target, '7D')">7D</button>
          <button class="tf-btn" @click="setTF($event.target, '30D')">30D</button>
          <button class="tf-btn" @click="setTF($event.target, '1A')">1A</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'

// ─── CONFIG ───────────────────────────────────────────────
const BASE_RATE = 16.8974
let currentRate = BASE_RATE
let currentTF = '24H'

// ─── RATE SIMULATION ──────────────────────────────────────
function generateRateData(tf) {
  const points = { '1H':60, '6H':72, '24H':96, '7D':84, '30D':90, '1A':52 }[tf] || 96
  const spread = { '1H':0.08, '6H':0.2, '24H':0.47, '7D':1.2, '30D':2.5, '1A':5 }[tf] || 0.47
  const base = { '1H':16.87, '6H':16.7, '24H':16.58, '7D':16.3, '30D':15.8, '1A':17.4 }[tf] || 16.58
  let v = base, data = []
  for (let i = 0; i < points; i++) {
    v += (Math.random() - 0.47) * (spread / points) * 4
    v = Math.max(base - spread*0.3, Math.min(base + spread, v))
    data.push(+v.toFixed(4))
  }
  // Force last point near currentRate
  data[data.length-1] = currentRate
  return data
}

function generateLabels(tf, count) {
  const labels = []
  if (tf === '24H') {
    for (let i = 0; i < count; i++) {
      const h = Math.floor(i / count * 24)
      labels.push(h % 6 === 0 ? `${String(h).padStart(2,'0')}:00` : '')
    }
  } else if (tf === '1H') {
    for (let i = 0; i < count; i++) {
      labels.push(i % 10 === 0 ? `-${60 - Math.floor(i/count*60)}m` : '')
    }
  } else if (tf === '6H') {
    for (let i = 0; i < count; i++) {
      labels.push(i % 12 === 0 ? `-${6 - Math.floor(i/count*6)}h` : '')
    }
  } else if (tf === '7D') {
    const days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
    for (let i = 0; i < count; i++) {
      labels.push(i % 12 === 0 ? days[Math.floor(i/12) % 7] : '')
    }
  } else {
    for (let i = 0; i < count; i++) {
      labels.push(i % Math.floor(count/5) === 0 ? `${i}` : '')
    }
  }
  return labels
}

// ─── CHART ────────────────────────────────────────────────
const livePricePlugin = {
  id: 'livePricePlugin',
  afterDraw: (chart) => {
    const ctx = chart.ctx
    const yAxis = chart.scales.y
    const xAxis = chart.scales.x
    const dataset = chart.data.datasets[0]
    const data = dataset.data
    if (!data || data.length === 0) return
    const lastVal = data[data.length - 1]
    
    const y = yAxis.getPixelForValue(lastVal)
    const x = xAxis.right
    
    ctx.save()
    
    const meta = chart.getDatasetMeta(0)
    const lastPointX = meta.data[data.length - 1].x
    
    ctx.beginPath()
    ctx.setLineDash([4, 4])
    ctx.moveTo(lastPointX, y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = '#00e676'
    ctx.lineWidth = 1.5
    ctx.stroke()

    const text = lastVal.toFixed(4)
    ctx.font = '800 12px "Exo 2"'
    const textW = ctx.measureText(text).width
    const padX = 8
    const h = 24
    const w = textW + padX * 2
    
    ctx.fillStyle = '#00e676'
    ctx.shadowColor = 'rgba(0, 230, 118, 0.4)'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.roundRect(x - w, y - h / 2, w, h, 6)
    ctx.fill()
    
    ctx.shadowBlur = 0
    ctx.fillStyle = '#081636'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x - w / 2, y + 1)
    
    ctx.restore()
  }
}

let chart
function buildChart(tf) {
  const data = generateRateData(tf)
  const labels = generateLabels(tf, data.length)
  const mn = Math.min(...data), mx = Math.max(...data)
  const pad = (mx - mn) * 0.3

  const canvas = document.getElementById('rateChart')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 0, 140)
  grad.addColorStop(0, 'rgba(0,230,118,0.35)')
  grad.addColorStop(1, 'rgba(0,230,118,0.02)')

  if (chart) chart.destroy()
  // Assuming Chart is available, perhaps import it
  // import Chart from 'chart.js/auto'
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: '#00e676',
        borderWidth: 2.5,
        backgroundColor: grad,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#00e676',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,18,55,0.95)',
          borderColor: 'rgba(60,110,220,0.5)',
          borderWidth: 1,
          titleColor: '#8ab0d4',
          bodyColor: '#00e676',
          bodyFont: { family: 'Exo 2', size: 14, weight: 'bold' },
          callbacks: {
            label: ctx => `  ${ctx.parsed.y.toFixed(4)} MXN`
          }
        },
      },
      layout: {
        padding: { right: 55 }
      },
      scales: {
        x: {
          grid: { color: 'rgba(40,80,160,0.2)', drawBorder: false },
          ticks: {
            color: '#8ab0d4', font: { family: 'Exo 2', size: 12, weight: 700 },
            maxRotation: 0,
          },
          border: { display: false }
        },
        y: {
          position: 'right',
          min: mn - pad, max: mx + pad,
          grid: { color: 'rgba(40,80,160,0.15)', drawBorder: false },
          ticks: {
            color: '#8ab0d4', font: { family: 'Exo 2', size: 12, weight: 700 },
            callback: v => v.toFixed(3),
            maxTicksLimit: 5,
          },
          border: { display: false }
        }
      }
    },
    plugins: [livePricePlugin]
  })

  // Update stats
  const chartMin = document.getElementById('chartMin')
  const chartMax = document.getElementById('chartMax')
  const statMin = document.getElementById('statMin')
  const statMax = document.getElementById('statMax')
  const chartVar = document.getElementById('chartVar')
  if (chartMin) chartMin.textContent = mn.toFixed(4)
  if (chartMax) chartMax.textContent = mx.toFixed(4)
  if (statMin) statMin.textContent = mn.toFixed(4)
  if (statMax) statMax.textContent = mx.toFixed(4)

  const varPct = ((data[data.length-1] - data[0]) / data[0] * 100)
  const varStr = (varPct >= 0 ? '+' : '') + varPct.toFixed(2) + '% ' + (varPct >= 0 ? '▲' : '▼')
  if (chartVar) {
    chartVar.textContent = varStr
    chartVar.className = 'chart-stat-val ' + (varPct >= 0 ? 'pos' : 'red')
  }
}

function setTF(btn, tf) {
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  currentTF = tf
  buildChart(tf)
}

onMounted(() => {
  buildChart('24H')
})
</script>

<style scoped>
/* Bottom Grid Styles */
.bottom-grid {
  width: 100%; max-width: 780px;
  display: grid; grid-template-columns: 220px 1fr; gap: 16px;
  align-items: start;
}

/* ─── STATS PANEL LEFT ─── */
.left-col {
  display: flex; flex-direction: column; gap: 16px;
}
.stats-left {
  background: linear-gradient(180deg, rgba(10,22,60,0.97) 0%, rgba(7,16,46,0.98) 100%);
  border: 2px solid #2a5298;
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.social-panel {
  padding: 0 16px;
}
.stats-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 13px; font-weight: 700;
  color: #ffd84d;
  letter-spacing: 2px;
  margin-bottom: 14px;
  text-shadow: 0 0 10px rgba(255,215,80,0.3);
  display: flex; align-items: center; gap: 6px;
}
.stat-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px; font-weight: 600; letter-spacing: 1px;
  color: #e8f4ff;
}
.stat-val-green { color: #00e676; font-weight: 800; }
.stat-val-red { color: #ff4757; font-weight: 800; }

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

.social-row {
  display: flex; gap: 8px; justify-content: center;
}
.social-btn {
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
}
.social-fb { background: #1877f2; color: #fff; }
.social-tw { background: #000; color: #fff; }
.social-yt { background: #ff0000; color: #fff; }
.social-btn:hover { transform: scale(1.1); }

/* ─── CHART PANEL ─── */
.chart-panel {
  background: linear-gradient(180deg, rgba(10,22,60,0.97) 0%, rgba(7,16,46,0.98) 100%);
  border: 2px solid #2a5298;
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.chart-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.chart-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px; font-weight: 700;
  color: #ffd84d;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255,215,80,0.3);
  display: flex; align-items: center; gap: 6px;
}
.crown { color: #ffd84d; }
.chart-info-btn {
  color: #8ab0d4;
  cursor: pointer;
  font-size: 16px;
}

.chart-stats-island {
  display: flex; gap: 12px; justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(4,10,25,0.7);
  border-radius: 8px;
}
.chart-stat-item {
  flex: 1;
  text-align: center;
}
.chart-stat-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 10px; font-weight: 600;
  color: #8ab0d4;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}
.chart-stat-val {
  font-family: 'Exo 2', sans-serif;
  font-size: 14px; font-weight: 800;
  letter-spacing: 1px;
}
.chart-stat-val.green { color: #00e676; }
.chart-stat-val.red { color: #ff4757; }
.chart-stat-val.pos { color: #00e676; }
.chart-stat-divider {
  width: 1px;
  background: rgba(60,120,255,0.3);
}

.chart-canvas-wrap {
  margin-bottom: 16px;
  background: #081636;
  border-radius: 8px;
  padding: 8px;
}
#rateChart {
  width: 100%; height: 200px;
}

.chart-timeframe {
  display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;
}
.tf-btn {
  padding: 6px 10px;
  background: rgba(4,10,25,0.7);
  border: 1px solid rgba(60,120,255,0.3);
  border-radius: 6px;
  color: #8ab0d4;
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.tf-btn.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
.tf-btn:hover { background: rgba(60,120,255,0.5); color: #fff; }
</style>