<template>
  <HeroSection
    title="Bienvenido a BorderXCash"
    description="Tu plataforma de cambio de divisas confiable y segura. Convierte tus dólares a pesos mexicanos al mejor tipo de cambio, sin complicaciones."
    :image="'/images/hero-image.png'"       
  />
</template>

<script setup>
import { ref, computed } from 'vue'
definePageMeta({
  layout: 'homepage'
})  
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