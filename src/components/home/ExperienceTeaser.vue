<script setup>
// Editorial bridge from the five capabilities to the full career history.
import { mdiArrowRight } from '@mdi/js'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import { home } from '@/config'

const e = home.experience
</script>

<template>
  <section class="teaser" aria-labelledby="teaser-title">
    <div class="container teaser__inner">
      <RevealOnScroll tag="p" class="eyebrow">{{ e.eyebrow }}</RevealOnScroll>
      <AnimatedText id="teaser-title" tag="h2" class="display teaser__title" :lines="e.headline" />
      <div class="teaser__row">
        <div class="teaser__copy">
          <RevealOnScroll tag="p" class="serif serif--lead">{{ e.statement }}</RevealOnScroll>
          <RevealOnScroll tag="p" class="lead teaser__desc" :delay="100">{{ e.description }}</RevealOnScroll>
        </div>
        <RevealOnScroll :delay="160">
          <MagneticLink :to="e.to">
            <span class="btn">{{ e.cta }} <v-icon class="arrow" :icon="mdiArrowRight" /></span>
          </MagneticLink>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<style>
.teaser { padding-block: var(--section-space); border-top: 1px solid var(--line); }
.teaser__inner { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }
.teaser__title { font-size: clamp(3rem, 11vw, 11.5rem); }
.teaser__row { display: grid; gap: 2rem; align-items: end; margin-top: clamp(1rem, 3vw, 3rem); }
.teaser__copy { display: grid; gap: 1.25rem; max-width: 40rem; }
.teaser__desc { color: var(--muted-text); }
@media (min-width: 900px) { .teaser__row { grid-template-columns: 1fr auto; column-gap: 6vw; } }
</style>
