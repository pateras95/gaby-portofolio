<script setup>
// 05 — a production-style showcase: five different storytelling approaches, one per card, on a dark
// "screening" background. Same card as everywhere else; the real posts play in place.
import { mdiArrowRight } from '@mdi/js'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import PostCard from '@/components/projects/PostCard.vue'
import CapabilityHead from './CapabilityHead.vue'

defineProps({ section: { type: Object, required: true } })
const pad = (n) => String(n + 1).padStart(2, '0')
</script>

<template>
  <section :id="`section-${section.id}`" class="video" :aria-labelledby="`${section.id}-title`">
    <CapabilityHead :section="section" />

    <ol class="container video__strip">
      <RevealOnScroll v-for="(v, i) in section.items" :key="i" tag="li" class="video__item" :delay="(i % 3) * 120">
        <p class="video__top"><span class="video__num">{{ pad(i) }}</span><span class="eyebrow">{{ v.category }}</span></p>
        <PostCard :link="v" />
        <RouterLink :to="v.to" class="tap video__more"><span class="link-line">View project →</span></RouterLink>
      </RevealOnScroll>

      <RevealOnScroll v-if="section.more" tag="li" class="video__item video__item--more" :delay="240">
        <RouterLink :to="section.more.to" class="video__all">
          <span class="eyebrow">{{ section.more.eyebrow }}</span>
          <span class="display video__all-text">{{ section.more.text }}</span>
          <span class="video__all-cta">{{ section.more.label }} <v-icon class="arrow" :icon="mdiArrowRight" /></span>
        </RouterLink>
      </RevealOnScroll>
    </ol>
  </section>
</template>

<style>
.video { background: #0b0b0c; color: #f4f0e9; padding-bottom: var(--section-space); --post-tag: #ff8a5c; --line: rgb(255 255 255 / 0.16); }
.video :focus-visible { outline-color: #ff8a5c; }

.video__strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 3.5rem 28px; align-items: start; }
.video__item { display: grid; gap: 0.9rem; align-content: start; min-width: 0; }
.video__item .post { width: 100%; }
.video__top { display: flex; align-items: baseline; gap: 0.75rem; }
.video__num { font-family: var(--font-serif); font-style: italic; font-size: 2.4rem; line-height: 1; color: #ff8a5c; }
.video__more { justify-self: start; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }

/* the last slot: a way into the full projects */
.video__all { display: grid; align-content: end; gap: 1.1rem; min-height: 20rem; padding: 1.75rem; border: 1px solid rgb(255 255 255 / 0.22); transition: background-color 0.4s ease, border-color 0.4s ease; }
.video__all:hover, .video__all:focus-visible { background: #ff8a5c; border-color: #ff8a5c; color: #0b0b0c; }
.video__all-text { font-size: clamp(1.8rem, 3vw, 2.8rem); }
.video__all-cta { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }

@media (min-width: 1280px) {
  /* film-strip rhythm */
  .video__item:nth-child(3n + 2) { margin-top: 4rem; }
}
</style>
