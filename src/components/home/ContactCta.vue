<script setup>
// Closing call-to-action — also used at the end of the About and Experience pages.
import { mdiArrowRight } from '@mdi/js'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import { home, contactItems } from '@/config'

const cta = home.cta
const primary = contactItems[0] // email if set, otherwise the first social link
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="container cta__inner">
      <RevealOnScroll tag="p" class="eyebrow">{{ cta.eyebrow }}</RevealOnScroll>
      <AnimatedText id="cta-title" tag="h2" class="display display--xl" :lines="cta.headline" />
      <div class="cta__row">
        <RevealOnScroll v-if="primary">
          <MagneticLink :href="primary.href" :strength="0.2">
            <span class="btn cta__btn">{{ cta.button }} <v-icon class="arrow" :icon="mdiArrowRight" /></span>
          </MagneticLink>
        </RevealOnScroll>
        <RevealOnScroll v-if="primary" :delay="120"><span class="cta__text">{{ primary.text }}</span></RevealOnScroll>
        <RevealOnScroll :delay="200">
          <RouterLink to="/contact" class="tap cta__more"><span class="link-line">All contact details</span></RouterLink>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<style>
.cta { background: var(--invert-bg); color: var(--invert-fg); padding-block: var(--section-space); }
.cta__inner { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(1.5rem, 3vw, 2.5rem); } /* minmax: a long word can't widen the column */
.cta .display--xl { font-size: clamp(2rem, 11vw, 13.5rem); }
.cta .display em { color: var(--accent); }
.cta__row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem 2.5rem; margin-top: clamp(1rem, 3vw, 3rem); }
.cta__btn { padding: 1.25rem 2.2rem; font-size: 0.85rem; }
.cta__text { font-size: clamp(1.1rem, 2vw, 1.6rem); font-weight: 600; letter-spacing: -0.01em; word-break: break-word; }
.cta__more { margin-left: auto; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
@media (max-width: 700px) { .cta__more { margin-left: 0; } }
</style>
