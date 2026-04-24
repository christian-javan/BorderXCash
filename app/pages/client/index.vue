<template>
  <div class="client-content">
    <HeroBanner />
    <ConverterPanel />
    <ExchangeFeatures />
    <BottomGrid />
  </div>
</template>

<script setup>
import HeroBanner from '~/components/HeroBanner.vue'
import ExchangeFeatures from '~/components/ExchangeFeatures.vue'
import ConverterPanel from '~/components/ConverterPanel.vue'
import BottomGrid from '~/components/BottomGrid.vue'

definePageMeta({
  layout: 'homepage'
})
</script>

<style scoped>
.client-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
</style>