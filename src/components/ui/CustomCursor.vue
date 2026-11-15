<script setup>
// Eased custom cursor. Only active on fine-pointer devices and when motion is
// allowed. Elements opt in with data-cursor="view|link|prev|next" and an
// optional data-cursor-label.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { hasFinePointer, prefersReducedMotion } from '@/composables/useMotion'

const enabled = ref(false)
const el = ref(null)
const label = ref('')
const mode = ref('')
const visible = ref(false)

let x = 0, y = 0, tx = 0, ty = 0, raf = 0, ready = false

function loop() {
  x += (tx - x) * 0.2
  y += (ty - y) * 0.2
  if (el.value) el.value.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
  raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0
}
function onMove(e) {
  tx = e.clientX
  ty = e.clientY
  if (!ready) {
    x = tx
    y = ty
    ready = true
  }
  visible.value = true
  if (!raf) raf = requestAnimationFrame(loop)
}
function onOver(e) {
  const t = e.target.closest?.('[data-cursor], a, button')
  if (!t) {
    mode.value = ''
    label.value = ''
    return
  }
  const m = t.dataset.cursor || 'link'
  mode.value = m
  label.value = t.dataset.cursorLabel || { view: 'View', prev: '←', next: '→' }[m] || ''
}
const onLeave = () => (visible.value = false)

onMounted(() => {
  if (!hasFinePointer() || prefersReducedMotion()) return
  enabled.value = true
  document.documentElement.classList.add('has-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
})
onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-cursor')
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerover', onOver)
  document.documentElement.removeEventListener('mouseleave', onLeave)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div v-if="enabled" ref="el" class="cursor" :class="[mode && `cursor--${mode}`, { 'is-visible': visible }]" aria-hidden="true">
    <span class="cursor__dot"><span class="cursor__label">{{ label }}</span></span>
  </div>
</template>

<style>
.cursor {
  position: fixed; left: 0; top: 0; z-index: 500; pointer-events: none;
  opacity: 0; transition: opacity 0.3s ease;
}
.cursor.is-visible { opacity: 1; }
.cursor__dot {
  display: grid; place-items: center;
  width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%;
  background: #fff; mix-blend-mode: difference;
  transition: width 0.45s var(--ease-out), height 0.45s var(--ease-out), margin 0.45s var(--ease-out), background-color 0.3s ease;
}
.cursor--link .cursor__dot { width: 46px; height: 46px; margin: -23px 0 0 -23px; }
.cursor--view .cursor__dot,
.cursor--prev .cursor__dot,
.cursor--next .cursor__dot { width: 92px; height: 92px; margin: -46px 0 0 -46px; mix-blend-mode: normal; background: var(--accent); }
.cursor__label {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #fff;
  opacity: 0; transition: opacity 0.25s ease;
}
.cursor--view .cursor__label, .cursor--prev .cursor__label, .cursor--next .cursor__label { opacity: 1; }
.cursor--prev .cursor__label, .cursor--next .cursor__label { font-size: 1.2rem; }
</style>
