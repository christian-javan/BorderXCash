<template>
  <div class="min-h-screen bg-slate-900 text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-800 border-r border-slate-700 fixed left-0 top-0 h-full z-10">
      <div class="p-6 border-b border-slate-700">
        <h2 class="text-xl font-bold text-primary">Admin Panel</h2>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/admin-dashboard"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              :class="{ 'bg-primary/10 text-primary': $route.path === '/admin-dashboard' }"
            >
              <Icon name="mdi:view-dashboard" size="20" />
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/fx-rates"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              :class="{ 'bg-primary/10 text-primary': $route.path === '/admin/fx-rates' }"
            >
              <Icon name="mdi:currency-usd" size="20" />
              FX Rates
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <header class="bg-slate-800 border-b border-slate-700 fixed top-0 left-64 right-0 z-10">
        <div class="px-6 py-4 flex justify-between items-center">
          <h1 class="text-xl font-semibold">BorderXCash Admin</h1>
          <div class="flex items-center gap-4">
            <span class="text-slate-300">Welcome, Admin</span>
            <button class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="pt-20 p-6 min-h-screen">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="bg-slate-800 border-t border-slate-700 fixed bottom-0 left-64 right-0">
        <div class="px-6 py-4 text-center text-slate-400">
          © 2025 BorderXCash Admin Panel
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
// Layout logic if needed
</script>

<style scoped>
/* Additional styles if needed */
</style>