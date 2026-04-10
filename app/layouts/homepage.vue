<template>
  <div class="min-h-screen bg-background text-on-background font-body">
    <!-- Header / Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-12">
          <span class="text-2xl font-black text-primary tracking-tighter font-headline">
            BorderXCash
          </span>

          <!-- Menú Desktop -->
          <div class="hidden md:flex gap-8 items-center">
            <a href="#" class="text-slate-400 font-medium hover:text-primary transition-colors duration-200 font-label text-sm uppercase tracking-wider">
              Personas
            </a>
            <a href="#" class="text-slate-400 font-medium hover:text-primary transition-colors duration-200 font-label text-sm uppercase tracking-wider">
              Empresas
            </a>
            <a href="#" class="text-slate-400 font-medium hover:text-primary transition-colors duration-200 font-label text-sm uppercase tracking-wider">
              Nosotros
            </a>
            <a href="#" class="text-slate-400 font-medium hover:text-primary transition-colors duration-200 font-label text-sm uppercase tracking-wider">
              Blog
            </a>
          </div>
        </div>

        <!-- Botón Login -->
        <div>
          <button 
            class="px-6 py-2.5 bg-primary-container text-on-primary-container font-semibold rounded-md hover:scale-105 active:scale-95 transition-all duration-150 shadow-sm border border-primary/20">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido principal (con padding-top para el navbar fijo) -->
    <main class="pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-950 border-t border-white/5 py-16">
      <div class="max-w-7xl mx-auto px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          <!-- Logo + Copyright -->
          <div class="space-y-3 text-center md:text-left">
            <div class="text-lg font-bold text-primary tracking-tighter font-headline">
              BorderXCash
            </div>
            <p class="text-slate-500 text-sm font-medium">
              © 2025 BorderXCash. El Soberano Arquitecto de tus Finanzas.
            </p>
          </div>

          <!-- Enlaces -->
          <div class="flex flex-wrap justify-center gap-8">
            <a href="#" class="text-slate-500 hover:text-primary transition-all text-sm font-medium">Privacidad</a>
            <a href="#" class="text-slate-500 hover:text-primary transition-all text-sm font-medium">Términos</a>
            <a href="#" class="text-slate-500 hover:text-primary transition-all text-sm font-medium">Seguridad</a>
            <a href="#" class="text-slate-500 hover:text-primary transition-all text-sm font-medium">Soporte</a>
          </div>

          <!-- Redes sociales -->
          <div class="flex gap-4">
            <button class="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-on-primary transition-all">
              <Icon name="mdi:twitter" size="20" />
            </button>
            <button class="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-on-primary transition-all">
              <Icon name="mdi:instagram" size="20" />
            </button>
            <button class="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-on-primary transition-all">
              <Icon name="mdi:linkedin" size="20" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Puedes agregar lógica del header aquí si lo necesitas más adelante
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>