<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { projects } from '@/config'
import { observe } from '@/composables/useInView'
import { prefersReducedMotion } from '@/composables/useMotion'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import FeaturedProjectPanel from './FeaturedProjectPanel.vue'

const active = ref(0)
const panels = []
const stops = []
const pad = (n) => String(n).padStart(2, '0')
const current = computed(() => projects[active.value])

// The panel crossing the middle of the viewport is the "current" project.
onMounted(() => {
  panels.forEach((el, i) => {
    if (!el) return
    stops.push(observe(el, (e) => e.isIntersecting && (active.value = i), { rootMargin: '-50% 0px -50% 0px' }))
  })
})
onBeforeUnmount(() => stops.forEach((s) => s()))

function go(dir) {
  const i = Math.min(projects.length - 1, Math.max(0, active.value + dir))
  panels[i]?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
</script>

<template>
  <section id="work" class="featured" aria-labelledby="featured-title">
    <div class="rail">
      <div class="rail__inner">
        <p class="rail__count" aria-live="polite">
          <span>{{ pad(active + 1) }}</span> / {{ pad(projects.length) }}
          <span class="sr-only">{{ current.title }}</span>
        </p>
        <p class="rail__title" aria-hidden="true">{{ current.title }}</p>
        <div class="rail__bar" aria-hidden="true"><i :style="{ transform: `scaleX(${(active + 1) / projects.length})` }" /></div>
        <div class="rail__ctrl">
          <button type="button" aria-label="Previous project" data-cursor="prev" :disabled="active === 0" @click="go(-1)">←</button>
          <button type="button" aria-label="Next project" data-cursor="next" :disabled="active === projects.length - 1" @click="go(1)">→</button>
        </div>
      </div>
    </div>

    <header class="featured__head container">
      <AnimatedText id="featured-title" tag="h2" class="display display--l" text="Selected *work*" />
      <p class="meta">({{ pad(projects.length) }}) — demo projects</p>
    </header>

    <FeaturedProjectPanel
      v-for="(p, i) in projects"
      :key="p.slug"
      :ref="(c) => (panels[i] = c?.$el)"
      :project="p"
      :index="i"
      :total="projects.length"
    />
  </section>
</template>

<style>
.featured { position: relative; overflow: clip; }
.featured__head {
  display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1rem;
  padding-block: clamp(4rem, 9vw, 8rem) clamp(2rem, 4vw, 3.5rem);
}

/* Sticky progress rail: zero-height sticky anchor, content pinned near the bottom of the viewport */
.rail { position: sticky; top: 0; z-index: 20; height: 0; pointer-events: none; }
.rail__inner {
  position: absolute; left: var(--gutter); right: var(--gutter); top: calc(100vh - 4.25rem); top: calc(100svh - 4.25rem);
  display: flex; align-items: center; gap: 1.5rem; color: #fff; mix-blend-mode: difference;
}
.rail__count { font-size: 0.78rem; letter-spacing: 0.14em; font-variant-numeric: tabular-nums; }
.rail__count span:first-child { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.01em; margin-right: 0.1em; }
.rail__title { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; white-space: nowrap; }
.rail__bar { flex: 1; height: 1px; background: rgb(255 255 255 / 0.35); overflow: hidden; }
.rail__bar i { display: block; height: 100%; background: #fff; transform-origin: left; transition: transform 0.7s var(--ease-out); }
.rail__ctrl { display: flex; gap: 0.5rem; pointer-events: auto; }
.rail__ctrl button {
  width: 44px; height: 44px; border: 1px solid rgb(255 255 255 / 0.6); border-radius: 50%; color: #fff; font-size: 1.1rem;
  transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
}
.rail__ctrl button:hover:not(:disabled) { background: #fff; color: #000; }
.rail__ctrl button:disabled { opacity: 0.3; cursor: default; }

@media (hover: none), (max-width: 767px) {
  .rail__ctrl { display: none; }
  .rail__title { display: none; }
}
</style>
