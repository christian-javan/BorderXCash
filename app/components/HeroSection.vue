<template>
  <section class="relative overflow-hidden min-h-[90vh] flex items-center mesh-bg">
    <!-- Background glows -->
    <div class="absolute inset-0 z-0 opacity-30">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-12 gap-12 py-24 items-center relative z-10">
      <!-- Left Content -->
      <div class="md:col-span-7 space-y-8">
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
          Operando 24/7 en Tiempo Real
        </div>

        <h1 class="text-6xl md:text-8xl font-black font-headline text-white tracking-tight leading-[0.95]">
          Cambia tus dólares <span class="text-primary italic">sin filas</span>.
        </h1>

        <p class="text-xl md:text-2xl text-slate-400 max-w-xl leading-relaxed">
          La plataforma más rápida y segura para tus transacciones de divisas. 
          Gestiona tu capital con la autoridad de un soberano.
        </p>

        <div class="flex flex-wrap gap-4 pt-4">
          <button class="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl text-lg hover:shadow-[0_0_20px_rgba(163,201,255,0.4)] hover:-translate-y-0.5 transition-all duration-200">
            Comenzar ahora
          </button>
          <button class="px-8 py-4 bg-white/5 text-white font-bold rounded-xl text-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
            Ver tipos de cambio
          </button>
        </div>
      </div>

      <!-- Conversion Card -->
      <div class="md:col-span-5 animate-float">
        <div class="bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden glow-effect">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

          <div class="space-y-6">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Cotización Actual
            </h3>

            <div class="space-y-4">
              <!-- Envías -->
              <div class="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Envías</label>
                <div class="flex justify-between items-center">
                  <input 
                    v-model="amountUSD"
                    class="bg-transparent border-none p-0 text-3xl font-bold font-headline focus:ring-0 w-full text-white"
                    type="text"
                  />
                  <div class="flex items-center gap-2 font-bold text-primary">
                    <Icon name="mdi:currency-usd" size="28" />
                    USD
                  </div>
                </div>
              </div>

              <!-- Swap Button -->
              <div class="flex justify-center -my-6 relative z-10">
                <button 
                  @click="swapCurrencies"
                  class="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:rotate-180 transition-transform duration-500 border-4 border-slate-900">
                  <Icon name="mdi:swap-vertical" size="28" />
                </button>
              </div>

              <!-- Recibes -->
              <div class="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Recibes</label>
                <div class="flex justify-between items-center">
                  <input 
                    :value="amountMXN"
                    readonly
                    class="bg-transparent border-none p-0 text-3xl font-bold font-headline focus:ring-0 w-full text-white"
                    type="text"
                  />
                  <div class="flex items-center gap-2 font-bold text-primary">
                    <Icon name="mdi:wallet" size="28" />
                    Pesos
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between text-sm py-2 border-y border-white/5">
              <span class="text-slate-500">Tipo de cambio</span>
              <span class="font-bold text-primary">1 USD = {{ exchangeRate }} Pesos</span>
            </div>

            <button class="w-full py-4 bg-primary text-on-primary font-black rounded-lg uppercase tracking-widest hover:brightness-110 transition-all shadow-xl">
              Operar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const amountUSD = ref('1,000')
const exchangeRate = ref(3940)

const amountMXN = computed(() => {
  const num = parseFloat(amountUSD.value.replace(/,/g, '')) || 0
  return (num * exchangeRate.value).toLocaleString('es-MX')
})

const swapCurrencies = () => {
  alert('Intercambio de monedas (próximamente)')
}
</script>

<style scoped>
.glow-effect {
  box-shadow: 0 0 40px -10px rgb(163 201 255 / 0.3);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>