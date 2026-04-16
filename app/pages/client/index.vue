<template>
  <div class="client-content">
    <HeroBanner />
    <ConverterPanel />
    <BottomGrid />
  </div>
</template>

<script setup>
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