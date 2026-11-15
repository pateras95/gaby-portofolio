<script setup>
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import { mdiArrowRight } from '@mdi/js'
import { site } from '@/config'

const items = [...site.about.coreSkills, ...site.about.coreSkills] // doubled for a seamless loop
</script>

<template>
  <section class="philosophy" aria-labelledby="philosophy-title">
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="(t, i) in items" :key="i" class="marquee__item">{{ t }}<i /></span>
      </div>
    </div>

    <div class="philosophy__body container">
      <AnimatedText id="philosophy-title" tag="h2" class="display display--l" :lines="site.home.philosophy.lines" />
      <div class="philosophy__side">
        <RevealOnScroll tag="p" class="lead">{{ site.home.philosophy.text }}</RevealOnScroll>
        <RevealOnScroll :delay="120">
          <MagneticLink to="/about">
            <span class="btn">About me <v-icon class="arrow" :icon="mdiArrowRight" /></span>
          </MagneticLink>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<style>
.philosophy { padding-block: clamp(3rem, 8vw, 7rem) var(--section-space); }
.marquee { overflow: hidden; border-block: 1px solid var(--line); padding-block: 1.1rem; margin-bottom: var(--section-space); }
.marquee__track { display: flex; width: max-content; animation: marquee 38s linear infinite; }
.marquee__item {
  display: inline-flex; align-items: center; gap: 2.5rem; padding-right: 2.5rem; white-space: nowrap;
  font-family: var(--font-serif); font-style: italic; font-size: clamp(1.4rem, 2.6vw, 2.2rem);
}
.marquee__item i { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--accent); }
.philosophy__body { display: grid; gap: 3rem; }
.philosophy__side { display: grid; gap: 2rem; justify-items: start; }
@media (min-width: 900px) {
  .philosophy__body { grid-template-columns: 1.6fr 1fr; align-items: end; column-gap: 6vw; }
}
</style>
