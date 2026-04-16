<template>
  <div class="main-login">
    <!-- LEFT COLUMN -->
    <div class="login-left-col">
      <div class="login-headline">
        OPERANDO <span class="login-hl-green">24/7</span><br>EN TIEMPO REAL
      </div>
      <div class="login-subheadline">
        Cambia tus dólares sin filas
      </div>
      <div class="login-desc">
        Accede a nuestra plataforma de conversión instantánea. Visualiza el mejor tipo de cambio de la frontera y realiza tus operaciones de una manera cómoda, segura y protegida bajo nuestros más altos estándares de Fintech corporativo. <br><br>
        <span style="color:var(--cyan); font-weight: 600;">Regístrate hoy mismo y descubre todos nuestros beneficios.</span>
      </div>
    </div>

    <!-- RIGHT COLUMN (LOGIN) -->
    <div class="login-card">
      <div class="login-header">
        <div class="login-icon-top"><Icon name="ph:user-circle-bold" /></div>
        <div class="login-title">INICIAR SESIÓN</div>
        <div class="login-subtitle">Introduce tus credenciales para continuar</div>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">CORREO ELECTRÓNICO</label>
          <div class="form-input-wrap">
            <input type="email" v-model="email" class="form-input" placeholder="ejemplo@correo.com" required>
            <Icon name="ph:envelope-simple-bold" class="form-input-icon" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">CONTRASEÑA</label>
          <div class="form-input-wrap">
            <input type="password" v-model="password" class="form-input" placeholder="••••••••" required>
            <Icon name="ph:lock-key-bold" class="form-input-icon" />
          </div>
        </div>

        <div class="form-options">
          <label class="remember-wrapper">
            <input type="checkbox" v-model="remember" style="display:none;">
            <div class="remember-box">
              <Icon v-if="remember" name="ph:check-bold" />
            </div>
            <span class="remember-text">Recordarme</span>
          </label>
          <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="btn-submit">{{ submitText }}</button>
      </form>

      <div class="login-footer">
        ¿Aún no tienes cuenta? <a href="#">Regístrate aquí</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'homepage'
})

const email = ref('')
const password = ref('')
const remember = ref(false)
const submitText = ref('ENTRAR AL SISTEMA')

const handleSubmit = () => {
  submitText.value = 'VERIFICANDO...'
  // Dummy login check
  if (email.value === 'cliente@gmail.com' && password.value === 'Password123!@') {
    // Navigate to client page
    navigateTo('/client')
  } else {
    // Reset after a delay
    setTimeout(() => {
      submitText.value = 'ENTRAR AL SISTEMA'
      alert('Credenciales incorrectas')
    }, 1000)
  }
}
</script>

<style scoped>
/* ─── MAIN LOGIN LAYOUT ─── */
.main-login {
  flex: 1;
  width: 100%; max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px;
  display: grid; grid-template-columns: 1fr 440px; gap: 40px;
  align-items: center;
}

.login-left-col {
  display: flex; flex-direction: column; gap: 16px;
  padding-right: 20px;
}
.login-headline {
  font-family: 'Orbitron', sans-serif;
  font-size: 38px; font-weight: 900;
  color: #fff;
  line-height: 1.15;
  text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 2px;
}
.login-hl-green { color: var(--green); }
.login-subheadline {
  font-family: 'Exo 2', sans-serif;
  font-size: 20px; font-weight: 600;
  color: var(--cyan);
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 4px;
}
.login-desc {
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px; font-weight: 500;
  color: var(--text-dim);
  line-height: 1.5;
  max-width: 440px;
}

/* ─── LOGIN CARD (RIGHT COL) ─── */
.login-card {
  width: 100%;
  background: linear-gradient(180deg, #0d348a 0%, #061b5c 100%);
  border: 2px solid #2354b5;
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.8), inset 0 2px 4px rgba(100,160,255,0.4);
  position: relative;
  overflow: hidden;
}
.login-card::before {
  content: '';
  position: absolute; top: 0; left: 10%; right: 10%; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(150,200,255,0.6), transparent);
}
.login-header {
  text-align: center;
  margin-bottom: 26px;
}
.login-icon-top {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: rgba(10,22,60,0.8);
  border: 2px solid var(--cyan);
  color: var(--cyan);
  font-size: 26px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 0 20px rgba(0,207,255,0.4), inset 0 0 10px rgba(0,207,255,0.3);
}
.login-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 22px; font-weight: 800;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
  margin-bottom: 6px;
}
.login-subtitle {
  font-family: 'Exo 2', sans-serif;
  font-size: 13px; font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.5px;
}

/* ─── FORM ─── */
.form-group {
  margin-bottom: 18px;
  position: relative;
}
.form-label {
  display: block;
  font-family: 'Exo 2', sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
  color: #8ab0d4;
  margin-bottom: 8px;
  padding-left: 2px;
}
.form-input-wrap {
  position: relative;
}
.form-input-icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: #4a6a9a; font-size: 18px;
  transition: color 0.3s;
}
.form-input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  background: #081636;
  border: 2px solid #16326e;
  border-radius: 12px;
  font-family: 'Exo 2', sans-serif;
  font-size: 15px; font-weight: 600;
  color: #fff;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}
.form-input::placeholder { color: #4a6a9a; font-weight: 500; }
.form-input:focus {
  border-color: var(--cyan);
  box-shadow: 0 0 15px rgba(0,207,255,0.3);
}
.form-input:focus + .form-input-icon {
  color: var(--cyan);
}

.form-options {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: -4px; margin-bottom: 24px;
}
.remember-wrapper {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
}
.remember-box {
  width: 16px; height: 16px;
  border: 2px solid #3c78ff;
  border-radius: 4px;
  background: #081636;
  display: flex; align-items: center; justify-content: center;
  color: transparent;
  transition: all 0.2s;
}
.remember-text {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px; font-weight: 600;
  color: #8ab0d4;
}
.forgot-link {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px; font-weight: 700;
  color: var(--cyan);
  text-decoration: none;
  transition: color 0.2s;
}
.forgot-link:hover { color: #fff; text-shadow: 0 0 8px var(--cyan); }

.btn-submit {
  display: block; width: 100%;
  padding: 16px;
  background: linear-gradient(180deg, #33cc44 0%, #1a8a2a 100%);
  border: 2px solid #44dd55;
  border-radius: 12px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 15px; font-weight: 800; letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,200,60,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: all 0.2s;
  text-align: center;
}
.btn-submit:hover {
  background: linear-gradient(180deg, #44dd55 0%, #25a035 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,220,80,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
}

.login-footer {
  margin-top: 20px;
  text-align: center;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px; font-weight: 600;
  color: #8ab0d4;
}
.login-footer a {
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  margin-left: 4px;
  border-bottom: 1px solid var(--cyan);
  transition: color 0.2s;
}
.login-footer a:hover {
  color: var(--cyan);
}
</style>