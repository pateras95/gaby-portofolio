<script setup>
// Password gate for /admin. The editor itself (AdminView) is only loaded after the password is right.
// Note: the site is static, so this is a lock on the editor, not server-side security (see README / notes).
import { ref, defineAsyncComponent } from 'vue'
import { auth } from './auth.config'

const Editor = defineAsyncComponent(() => import('./AdminView.vue'))
const OK = 'gk-cms-ok'
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
const check = async (pw) => {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits'])
  const salt = Uint8Array.from(auth.salt.match(/../g).map((h) => parseInt(h, 16)))
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: auth.iterations }, key, 256)) === auth.hash
}

let remembered = false
try { remembered = sessionStorage.getItem(OK) === auth.hash } catch { /* ignore */ }
const unlocked = ref(remembered)
const pw = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  busy.value = true
  error.value = ''
  try {
    if (await check(pw.value)) {
      try { sessionStorage.setItem(OK, auth.hash) } catch { /* ignore */ }
      unlocked.value = true
    } else {
      await new Promise((r) => setTimeout(r, 1000))
      error.value = 'Wrong password.'
    }
  } catch {
    error.value = 'The browser blocked the check (it needs https or localhost).'
  }
  busy.value = false
  pw.value = ''
}
</script>

<template>
  <Editor v-if="unlocked" />
  <main v-else class="gate">
    <form @submit.prevent="submit">
      <h1>Content editor</h1>
      <input v-model="pw" type="password" autocomplete="current-password" placeholder="Password" autofocus required />
      <button type="submit" :disabled="busy">{{ busy ? 'Checking…' : 'Enter' }}</button>
      <p v-if="error" role="alert">{{ error }}</p>
    </form>
  </main>
</template>

<style scoped>
.gate { position: fixed; inset: 0; display: grid; place-items: center; background: #fafaf8; color: #1a1a1a; font: 14px var(--font-body); cursor: auto; z-index: 50; }
form { display: grid; gap: .7rem; width: min(320px, 86vw); }
h1 { font: 600 20px var(--font-body); text-transform: none; letter-spacing: 0; margin: 0 0 .3rem; }
input { padding: .6rem .7rem; border: 1px solid #e3e0da; border-radius: 8px; font: inherit; background: #fff; cursor: text; }
button { padding: .6rem; border-radius: 8px; background: #1a1a1a; color: #fff; font: inherit; cursor: pointer; }
button:disabled { opacity: .5; }
p { margin: 0; color: #c0341b; }
</style>
