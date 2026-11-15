<script setup>
// Work samples side by side in a row you can scroll sideways (stacked on small screens).
// The arrows stay in the middle of the screen while the row is in view, so they can never end up
// under the fixed header / menu button.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { prefersReducedMotion } from '@/composables/useMotion'
import PostCard from './PostCard.vue'

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
  const step = (t.querySelector('.post')?.offsetWidth ?? 400) + 28
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
  <div class="embeds">
    <div v-if="!(atStart && atEnd)" class="embeds__nav">
      <button type="button" class="embeds__btn embeds__btn--prev" aria-label="Previous samples" :disabled="atStart" @click="go(-1)"><v-icon :icon="mdiChevronLeft" /></button>
      <button type="button" class="embeds__btn embeds__btn--next" aria-label="Next samples" :disabled="atEnd" @click="go(1)"><v-icon :icon="mdiChevronRight" /></button>
    </div>
    <ul ref="track" class="embeds__track" role="region" :aria-label="label" tabindex="0" @scroll.passive="schedule">
      <li v-for="l in links" :key="l.url" class="embeds__item"><PostCard :link="l" /></li>
    </ul>
  </div>
</template>

<style>
.embeds { position: relative; }
.embeds__track {
  display: flex; align-items: flex-start; gap: 28px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity;
  padding: 1.25rem var(--gutter) 2rem; scroll-padding-inline: var(--gutter); scrollbar-width: thin;
}
.embeds__item { scroll-snap-align: start; flex: none; }

/* zero-height sticky anchor → the arrows follow the middle of the screen while the row is visible */
.embeds__nav { position: sticky; top: calc(50vh - 26px); height: 0; z-index: 10; pointer-events: none; }
.embeds__btn {
  position: absolute; top: 0; width: 52px; height: 52px; display: grid; place-items: center; pointer-events: auto;
  border-radius: 50%; background: var(--ink); color: var(--bg); border: 1px solid color-mix(in srgb, var(--bg) 35%, transparent);
  transition: opacity 0.3s ease, transform 0.3s var(--ease-out);
}
.embeds__btn--prev { left: 0.75rem; }
.embeds__btn--next { right: 0.75rem; }
.embeds__btn:hover:not(:disabled) { transform: scale(1.08); }
.embeds__btn:disabled { opacity: 0; pointer-events: none; }

@media (max-width: 700px) {
  .embeds__nav { display: none; }
  .embeds__track { flex-direction: column; align-items: center; overflow: visible; gap: 2.5rem; padding-inline: 1rem; }
}
</style>
