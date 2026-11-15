<script setup>
// A horizontal, swipeable row of phones (stacked vertically on small screens).
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { prefersReducedMotion } from '@/composables/useMotion'
import PhoneEmbed from './PhoneEmbed.vue'

defineProps({ links: { type: Array, required: true }, label: { type: String, default: 'Work samples' } })

const track = ref(null)
const atStart = ref(true)
const atEnd = ref(true)
let raf = 0

function update() {
  raf = 0
  const t = track.value
  if (!t) return
  atStart.value = t.scrollLeft < 8
  atEnd.value = t.scrollLeft + t.clientWidth >= t.scrollWidth - 8
}
const schedule = () => { raf ||= requestAnimationFrame(update) }

function go(dir) {
  const t = track.value
  const card = t.querySelector('.phone')
  const step = (card?.offsetWidth ?? 350) + 28
  t.scrollBy({ left: dir * step * Math.max(1, Math.floor(t.clientWidth / step)), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', schedule, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', schedule)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="phones">
    <div v-if="!(atStart && atEnd)" class="phones__ctrl container">
      <button type="button" aria-label="Previous samples" data-cursor="prev" :disabled="atStart" @click="go(-1)"><v-icon :icon="mdiChevronLeft" /></button>
      <button type="button" aria-label="Next samples" data-cursor="next" :disabled="atEnd" @click="go(1)"><v-icon :icon="mdiChevronRight" /></button>
    </div>
    <ul ref="track" class="phones__track" role="region" :aria-label="label" tabindex="0" @scroll.passive="schedule">
      <li v-for="l in links" :key="l.url" class="phones__item"><PhoneEmbed :link="l" /></li>
    </ul>
  </div>
</template>

<style>
.phones { display: grid; gap: 0.5rem; }
.phones__ctrl { display: flex; justify-content: flex-end; gap: 0.5rem; }
.phones__ctrl button {
  width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%;
  transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
}
.phones__ctrl button:hover:not(:disabled) { background: var(--ink); color: var(--bg); }
.phones__ctrl button:disabled { opacity: 0.3; cursor: default; }

.phones__track {
  display: flex; gap: 28px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity;
  padding: 1.25rem var(--gutter) 2.5rem; scroll-padding-inline: var(--gutter); scrollbar-width: thin;
}
.phones__item { scroll-snap-align: start; flex: none; }

@media (max-width: 700px) {
  .phones__ctrl { display: none; }
  .phones__track { flex-direction: column; align-items: center; overflow: visible; gap: 2.5rem; padding-inline: 1rem; }
}
</style>
