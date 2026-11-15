<script setup>
import { mdiArrowRight } from '@mdi/js'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import { site, contactItems } from '@/config'

const primary = contactItems[0] // email if set, otherwise the first social link
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="container cta__inner">
      <RevealOnScroll tag="p" class="eyebrow">Available for new opportunities</RevealOnScroll>
      <AnimatedText id="cta-title" tag="h2" class="display display--xl" :lines="site.home.cta" />
      <div class="cta__row">
        <RevealOnScroll v-if="primary">
          <MagneticLink :href="primary.href" :strength="0.2" class="cta__main">
            <span>{{ primary.text }}</span>
            <v-icon class="arrow" :icon="mdiArrowRight" />
          </MagneticLink>
        </RevealOnScroll>
        <RevealOnScroll :delay="120">
          <RouterLink to="/contact" class="link-line cta__more">More ways to reach me</RouterLink>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<style>
.cta { background: var(--invert-bg); color: var(--invert-fg); padding-block: var(--section-space); }
.cta__inner { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }
.cta .display em { color: var(--accent); }
.cta__row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem 3rem; margin-top: clamp(1rem, 3vw, 3rem); }
.cta__main .magnetic__inner { font-size: clamp(1.3rem, 3vw, 2.6rem); font-weight: 600; letter-spacing: -0.02em; border-bottom: 2px solid currentColor; padding-bottom: 0.25rem; transition: color 0.3s ease; word-break: break-word; }
.cta__main .magnetic__inner:hover, .cta__main .magnetic__inner:focus-visible { color: var(--accent); }
.cta__more { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; min-height: 44px; display: inline-flex; align-items: center; }
</style>
