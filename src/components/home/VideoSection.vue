<script setup>
// 05 — a production-style showcase: four different storytelling approaches, one per brand,
// staggered like a film strip. The players are the real posts (play in place, or open the original).
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import EmbedCard from '@/components/projects/EmbedCard.vue'
import CapabilityHead from './CapabilityHead.vue'

defineProps({ section: { type: Object, required: true } })
const pad = (n) => String(n + 1).padStart(2, '0')
</script>

<template>
  <section :id="`section-${section.id}`" class="video" :aria-labelledby="`${section.id}-title`">
    <CapabilityHead :section="section" />

    <ol class="container video__strip">
      <RevealOnScroll v-for="(v, i) in section.items" :key="v.url" tag="li" class="video__item" :delay="i * 120">
        <p class="video__top"><span class="video__num">{{ pad(i) }}</span><span class="eyebrow">{{ v.category }}</span></p>
        <EmbedCard :link="v" variant="compact" />
        <p class="video__note">{{ v.note }}</p>
        <RouterLink :to="v.to" class="link-line video__more">View project →</RouterLink>
      </RevealOnScroll>
    </ol>
  </section>
</template>

<style>
.video { background: #0b0b0c; color: #f4f0e9; padding-bottom: var(--section-space); }
.video .embed__tile { border-color: rgb(255 255 255 / 0.14); }
.video :focus-visible { outline-color: #ff8a5c; }

.video__strip { --embed-w: 300px; --embed-h: calc(var(--embed-h-compact) - 35px); display: grid; gap: 3.5rem 28px; justify-content: center; }
.video__item { display: grid; gap: 0.9rem; align-content: start; width: min(var(--embed-w), calc(100vw - 2 * var(--gutter))); }
.video__top { display: flex; align-items: baseline; gap: 0.75rem; }
.video__num { font-family: var(--font-serif); font-style: italic; font-size: 2.4rem; line-height: 1; color: #ff8a5c; }
.video__note { font-size: 0.92rem; line-height: 1.5; color: #b9b4ab; }
.video__more { justify-self: start; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; min-height: 44px; display: inline-flex; align-items: center; }

@media (min-width: 700px) { .video__strip { grid-template-columns: repeat(2, auto); } }
@media (min-width: 1280px) {
  .video__strip { grid-template-columns: repeat(4, auto); }
  /* film-strip rhythm */
  .video__item:nth-child(even) { margin-top: 4.5rem; }
}
</style>
