<script setup>
import { computed, ref } from 'vue'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import { useParallax } from '@/composables/useParallax'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
})

const par = ref(null)
useParallax(par, 0.06)

const pad = (n) => String(n).padStart(2, '0')
const variant = computed(() => props.index % 4)
// Portrait frames use the thumbnail image, wide frames use the hero image.
const src = computed(() => (variant.value === 1 || variant.value === 3 ? props.project.thumbnailImage : props.project.heroImage))

// Split the title into two balanced lines for the headline reveal.
const titleLines = computed(() => {
  const words = props.project.title.split(' ')
  if (words.length < 3) return words
  let best = 1
  let diff = Infinity
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length)
    if (d < diff) { diff = d; best = i }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
})

const theme = computed(() => ({
  '--p-bg': props.project.theme.bg,
  '--p-fg': props.project.theme.fg,
  '--p-accent': props.project.theme.accent,
}))
</script>

<template>
  <article class="panel" :class="`panel--v${variant}`" :style="theme" :aria-label="project.title">
    <RouterLink :to="`/projects/${project.slug}`" class="panel__media" data-cursor="view" tabindex="-1" aria-hidden="true">
      <RevealOnScroll variant="mask" class="panel__frame">
        <div ref="par" class="panel__par">
          <img :src="src" :alt="`${project.title} — demo visual`" loading="lazy" decoding="async" :style="{ objectPosition: project.heroPosition }" />
        </div>
        <span class="panel__shade" />
        <span class="panel__peek">{{ project.description }}</span>
      </RevealOnScroll>
    </RouterLink>

    <div class="panel__info">
      <p class="panel__index"><span>{{ pad(index + 1) }}</span> / {{ pad(total) }}</p>
      <p class="eyebrow panel__client">{{ project.client }} <span>— demo client</span></p>
      <AnimatedText tag="h3" class="display panel__title" :lines="titleLines" />
      <p class="panel__type serif serif--lead">{{ project.type }}</p>
      <ul class="panel__tags" aria-label="Categories">
        <li v-for="c in project.categories" :key="c">{{ c }}</li>
      </ul>
      <MagneticLink :to="`/projects/${project.slug}`" class="panel__cta" :strength="0.25">
        <span class="panel__cta-label">View project <span class="sr-only">{{ project.title }}</span></span>
        <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
      </MagneticLink>
    </div>
  </article>
</template>

<style>
.panel {
  position: relative; display: grid; gap: 1.5rem; align-items: center;
  min-height: 100vh; min-height: 100svh;
  padding: clamp(4.5rem, 9vw, 8rem) var(--gutter);
  background: var(--p-bg); color: var(--p-fg);
}
.panel__media { display: block; position: relative; }
.panel__frame { position: relative; overflow: hidden; aspect-ratio: 4 / 5; }
.panel__par { position: absolute; inset: -6% 0; will-change: transform; }
.panel__par img { width: 100%; height: 100%; object-fit: cover; transition: scale 1.3s var(--ease-out); }
.panel__shade { position: absolute; inset: 0; background: linear-gradient(to top, rgb(0 0 0 / 0.55), transparent 55%); opacity: 0; transition: opacity 0.6s ease; pointer-events: none; }
.panel__peek {
  position: absolute; left: 1.25rem; right: 1.25rem; bottom: 1.25rem; color: #fff; font-size: 0.9rem; max-width: 26rem;
  transform: translate3d(0, 24px, 0); opacity: 0; transition: transform 0.7s var(--ease-out), opacity 0.5s ease; pointer-events: none;
}
@media (hover: hover) {
  .panel__media:hover .panel__par img { scale: 1.06; }
  .panel__media:hover .panel__shade { opacity: 1; }
  .panel__media:hover .panel__peek { transform: none; opacity: 1; }
}

.panel__info { position: relative; display: grid; gap: 1rem; align-content: end; }
.panel__index { font-size: 0.8rem; letter-spacing: 0.12em; font-variant-numeric: tabular-nums; opacity: 0.8; }
.panel__index span { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; font-stretch: 82%; letter-spacing: -0.02em; margin-right: 0.15em; }
.panel__client span { opacity: 0.6; font-weight: 500; }
.panel__title { font-size: clamp(2.6rem, 6vw, 6.2rem); }
.panel__type { opacity: 0.85; }
.panel__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.panel__tags li { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.4rem 0.8rem; border: 1px solid color-mix(in srgb, var(--p-fg) 40%, transparent); border-radius: 999px; }
.panel__cta { margin-top: 0.75rem; justify-self: start; }
.panel__cta .magnetic__inner {
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
  min-height: 44px; border-bottom: 1px solid currentColor; padding-bottom: 0.3rem;
  transition: color 0.3s ease, gap 0.45s var(--ease-out);
}
.panel__cta .magnetic__inner:hover, .panel__cta .magnetic__inner:focus-visible { color: var(--p-accent); gap: 1.25rem; }
.panel :focus-visible { outline-color: var(--p-accent); }

/* Desktop compositions — each panel is composed differently */
@media (min-width: 900px) {
  .panel { grid-template-columns: repeat(12, 1fr); column-gap: 2rem; }
  .panel__media, .panel__info { grid-row: 1; }

  .panel--v0 .panel__media { grid-column: 6 / 13; }
  .panel--v0 .panel__frame { aspect-ratio: 16 / 11; }
  .panel--v0 .panel__info { grid-column: 1 / 6; align-self: end; }

  .panel--v1 .panel__media { grid-column: 1 / 7; }
  .panel--v1 .panel__frame { aspect-ratio: 4 / 5; max-height: 82svh; }
  .panel--v1 .panel__info { grid-column: 8 / 13; }

  .panel--v2 { color: #fff; }
  .panel--v2 .panel__media { position: absolute; inset: 0; grid-column: auto; grid-row: auto; }
  .panel--v2 .panel__frame { position: absolute; inset: 0; aspect-ratio: auto; }
  .panel--v2 .panel__shade { opacity: 1; background: linear-gradient(to top, rgb(0 0 0 / 0.65), rgb(0 0 0 / 0.1) 60%); }
  .panel--v2 .panel__peek { display: none; }
  .panel--v2 .panel__info { grid-column: 1 / 9; align-self: end; z-index: 1; }
  .panel--v2 .panel__tags li { border-color: rgb(255 255 255 / 0.5); }

  .panel--v3 .panel__media { grid-column: 1 / 6; }
  .panel--v3 .panel__frame { aspect-ratio: 3 / 4; max-height: 80svh; }
  .panel--v3 .panel__info { grid-column: 7 / 13; align-self: center; }
}
@media (max-width: 899px) {
  .panel { min-height: 0; padding-block: 3.5rem; gap: 1.75rem; }
  .panel--v2 .panel__frame { aspect-ratio: 4 / 5; }
}
</style>
