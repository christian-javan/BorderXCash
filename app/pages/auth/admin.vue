<template>
  <div class="min-h-screen flex items-center justify-center mesh-bg relative overflow-hidden">
    <!-- Background glows -->
    <div class="absolute inset-0 z-0 opacity-30">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-md w-full mx-8 relative z-10">
      <div class="bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden glow-effect">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-3xl font-black font-headline text-white">Admin Login</h1>
            <p class="text-slate-400 mt-2">Accede al panel de administración</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Email</label>
              <div class="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="admin@borderxcash.com"
                  class="bg-transparent border-none p-0 text-lg font-bold focus:ring-0 w-full text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Contraseña</label>
              <div class="relative p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="bg-transparent border-none p-0 pr-10 text-lg font-bold focus:ring-0 w-full text-white placeholder-slate-500"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" size="24" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-4 bg-primary text-on-primary font-black rounded-lg uppercase tracking-widest hover:brightness-110 transition-all shadow-xl"
              :disabled="loading"
            >
              {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
            </button>
          </form>

          <p v-if="message" class="text-center text-sm text-slate-400">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const message = ref('')
const showPassword = ref(false)

const handleSubmit = async () => {
  loading.value = true
  message.value = ''

  try {
    const response = await $fetch('/api/auth/admin/login', {
      method: 'POST',
      body: form.value
    })
    message.value = response.message || 'Login successful'
  } catch (error) {
    message.value = 'Login failed'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>