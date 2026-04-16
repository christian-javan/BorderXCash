<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 class="text-lg font-semibold mb-2">Total Users</h3>
        <p class="text-2xl font-bold text-primary">1,234</p>
      </div>
      <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 class="text-lg font-semibold mb-2">Active Sessions</h3>
        <p class="text-2xl font-bold text-green-400">89</p>
      </div>
      <div class="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 class="text-lg font-semibold mb-2">FX Rates</h3>
        <p class="text-2xl font-bold text-blue-400">5</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'adminlayout'
})
</script>