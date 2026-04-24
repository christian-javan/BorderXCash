<!-- /components/GamingFeatures/ExchangeFeatures.vue -->
<script setup lang="ts">
</script>

<template>
  <div class="exchange-features">
    <GamingFeaturesLossCounter />
    <GamingFeaturesStreakTracker />
    <GamingFeaturesMembershipMetter />
  </div>
</template>

<style scoped>
.exchange-features {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: flex-start;
}

@media (max-width: 1024px) {
  .exchange-features {
    flex-direction: column;
  }
}
</style>