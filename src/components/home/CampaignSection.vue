<script setup>
// 01 — one campaign, presented like a campaign: slogan key visual, the video layered over it,
// the metadata, and supporting social creatives.
import { ref, computed } from 'vue'
import { mdiArrowRight } from '@mdi/js'
import { useParallax } from '@/composables/useParallax'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import EmbedCard from '@/components/projects/EmbedCard.vue'
import CapabilityHead from './CapabilityHead.vue'

const props = defineProps({ section: { type: Object, required: true } })
const f = computed(() => props.section.featured)
const theme = computed(() => ({ '--c-bg': f.value.theme.bg, '--c-fg': f.value.theme.fg, '--c-accent': f.value.theme.accent }))

const art = ref(null)
useParallax(art, 0.05)
</script>

<template>
  <section :id="`section-${section.id}`" class="camp" :style="theme" :aria-labelledby="`${section.id}-title`">
    <CapabilityHead :section="section" />

    <div class="container camp__stage">
      <RevealOnScroll variant="mask" class="camp__panel">
        <RouterLink :to="f.to" class="camp__link" data-cursor="view" :aria-label="`${f.name} — view the project`">
          <img v-if="f.keyVisual" :src="f.keyVisual" alt="" class="camp__image" loading="lazy" />
          <div v-else ref="art" class="camp__art">
            <p class="camp__name">{{ f.name }}</p>
            <p class="display camp__slogan" lang="el"><span v-for="l in f.slogan" :key="l">{{ l }}</span></p>
          </div>
        </RouterLink>
      </RevealOnScroll>

      <RevealOnScroll class="camp__video" :delay="200">
        <EmbedCard :link="f.video" variant="compact" />
      </RevealOnScroll>
    </div>

    <div class="container camp__details">
      <div class="camp__info">
        <dl class="camp__meta">
          <div v-for="m in f.meta" :key="m.label"><dt>{{ m.label }}</dt><dd>{{ m.value }}</dd></div>
        </dl>
        <ul class="camp__tags" aria-label="Contribution">
          <li v-for="c in f.contribution" :key="c">{{ c }}</li>
        </ul>
        <MagneticLink :to="f.to" class="camp__cta">
          <span class="btn">{{ f.cta }} <v-icon class="arrow" :icon="mdiArrowRight" /></span>
        </MagneticLink>
      </div>

      <ul class="camp__posts">
        <RevealOnScroll v-for="(p, i) in f.posts" :key="p.url" tag="li" :delay="i * 140"><EmbedCard :link="p" variant="compact" /></RevealOnScroll>
      </ul>
    </div>
  </section>
</template>

<style>
.camp { padding-bottom: var(--section-space); }

/* key visual + the video layered over its corner */
.camp__stage { position: relative; padding-bottom: 5rem; }
.camp__panel { width: 86%; aspect-ratio: 16 / 10; overflow: hidden; background: var(--c-bg); }
.camp__link { position: absolute; inset: 0; display: block; color: var(--c-fg); }
.camp__image { width: 100%; height: 100%; object-fit: cover; }
.camp__art { position: absolute; inset: -6% 0; display: grid; align-content: center; gap: 1.25rem; padding: 0 clamp(1.5rem, 5vw, 5rem); will-change: transform; }
.camp__name { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-accent); }
.camp__slogan { font-size: clamp(2.2rem, 6.4vw, 6.6rem); line-height: 0.95; }
.camp__slogan span { display: block; }
.camp__slogan span:last-child { color: var(--c-accent); }
.camp__link:hover .camp__slogan span:last-child, .camp__link:focus-visible .camp__slogan span:last-child { text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 0.12em; }

.camp__video { position: absolute; right: var(--gutter); bottom: 0; width: min(44%, 560px); }
.camp__video .embed { width: 100%; }
.camp__video .embed__tile { height: auto; aspect-ratio: 16 / 9; }

.camp__details { display: grid; gap: 3rem; padding-top: clamp(2rem, 4vw, 3rem); }
.camp__meta { display: grid; gap: 1.1rem; }
.camp__meta dt { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted-text); margin-bottom: 0.2rem; }
.camp__meta dd { font-weight: 500; line-height: 1.4; max-width: 34rem; }
.camp__info { display: grid; gap: 1.75rem; align-content: start; }
.camp__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.camp__tags li { padding: 0.4rem 0.8rem; border: 1px solid var(--line); border-radius: 999px; font-size: 0.74rem; font-weight: 500; }
.camp__cta { justify-self: start; }

.camp__posts { --embed-w: 330px; --embed-h: var(--embed-h-compact); display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-start; }

@media (min-width: 1000px) {
  .camp__details { grid-template-columns: 5fr 7fr; column-gap: 5vw; }
  .camp__posts { justify-content: flex-end; }
}
@media (max-width: 899px) {
  .camp__stage { padding-bottom: 0; display: grid; gap: 1.25rem; }
  .camp__panel { width: 100%; aspect-ratio: 4 / 5; }
  .camp__video { position: static; width: 100%; }
  .camp__video .embed { width: 100%; }
}
</style>
