<script setup>
// A link that gently leans toward the pointer (fine-pointer devices only).
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { hasFinePointer, prefersReducedMotion } from '@/composables/useMotion'

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  strength: { type: Number, default: 0.3 },
})

const wrap = ref(null)
const tag = computed(() => (props.to ? RouterLink : 'a'))
const attrs = computed(() => (props.to ? { to: props.to } : { href: props.href }))
const enabled = () => hasFinePointer() && !prefersReducedMotion()

function move(e) {
  if (!enabled()) return
  const r = wrap.value.getBoundingClientRect()
  const x = (e.clientX - (r.left + r.width / 2)) * props.strength
  const y = (e.clientY - (r.top + r.height / 2)) * props.strength
  wrap.value.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
}
function leave() {
  if (wrap.value) wrap.value.style.transform = ''
}
</script>

<template>
  <span ref="wrap" class="magnetic" @pointermove="move" @pointerleave="leave">
    <component :is="tag" v-bind="attrs" class="magnetic__inner"><slot /></component>
  </span>
</template>

<style>
.magnetic { display: inline-block; transition: transform 0.45s var(--ease-out); }
.magnetic__inner { display: inline-flex; align-items: center; gap: 0.75rem; }
</style>
