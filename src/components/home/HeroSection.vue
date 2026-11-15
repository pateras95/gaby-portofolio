<script setup>
import { ref, onMounted } from 'vue'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import { useParallax } from '@/composables/useParallax'
import { prefersReducedMotion } from '@/composables/useMotion'
import { site } from '@/config'

const ready = ref(false)
const par = ref(null)
useParallax(par, 0.1)

onMounted(() => requestAnimationFrame(() => (ready.value = true)))

function explore(e) {
  const target = document.getElementById('work')
  if (!target) return
  e.preventDefault()
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
</script>

<template>
  <section class="hero" :class="{ 'is-ready': ready }" aria-labelledby="hero-title">
    <div class="hero__media" aria-hidden="true">
      <div ref="par" class="hero__par">
        <img :src="site.home.hero.image" alt="" fetchpriority="high" decoding="async" :style="{ objectPosition: site.home.hero.imagePosition }" />
      </div>
    </div>

    <AnimatedText id="hero-title" tag="h1" class="hero__title display display--xl" :lines="site.home.hero.lines" immediate :delay="350" />

    <div class="hero__foot">
      <p class="hero__sub">{{ site.home.hero.sub }}</p>
      <a href="#work" class="hero__explore link-line" @click="explore">Explore the work ↓</a>
      <span class="scroll-hint" aria-hidden="true"><span class="scroll-hint__line" /></span>
    </div>
  </section>
</template>

<style>
.hero {
  position: relative; min-height: 100vh; min-height: 100svh;
  display: grid; grid-template-rows: 1fr auto; align-items: center;
  padding: calc(var(--header-h) + 1rem) var(--gutter) 2rem; overflow: hidden;
}
.hero__media {
  position: absolute; z-index: 0;
  top: calc(var(--header-h) + 1rem); bottom: 7rem; right: var(--gutter); width: min(40vw, 600px);
  overflow: hidden; clip-path: inset(100% 0 0 0);
  transition: clip-path 1.3s var(--ease-io) 0.1s;
}
.hero.is-ready .hero__media { clip-path: inset(0); }
.hero__par { position: absolute; inset: -8% 0; will-change: transform; }
.hero__par img {
  width: 100%; height: 100%; object-fit: cover; transform: scale(1.3);
  transition: transform 1.8s var(--ease-out) 0.1s;
}
.hero.is-ready .hero__par img { transform: none; }

/* Difference blend: stays legible over both the off-white page and the photo. */
.hero__title { position: relative; z-index: 2; color: #fff; mix-blend-mode: difference; align-self: center; font-size: clamp(3.4rem, 11.5vw, 12.5rem); padding-bottom: 0.22em; }

.hero__foot {
  position: relative; z-index: 2; display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1.25rem 2rem;
}
.hero__foot > * { opacity: 0; transform: translate3d(0, 18px, 0); transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out); }
.hero.is-ready .hero__foot > * { opacity: 1; transform: none; }
.hero__sub { max-width: 21rem; font-size: 1rem; transition-delay: 0.85s !important; }
.hero__explore { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; min-height: 44px; display: inline-flex; align-items: center; transition-delay: 1s !important; }

.scroll-hint { position: absolute; left: 50%; bottom: 0; width: 1px; height: 3.5rem; background: color-mix(in srgb, var(--ink) 18%, transparent); overflow: hidden; transition-delay: 1.1s !important; }
.scroll-hint__line { display: block; width: 100%; height: 100%; background: var(--ink); animation: scroll-line 2.4s var(--ease-io) infinite; }

@media (max-width: 767px) {
  .hero__media { width: 72vw; bottom: 9rem; top: calc(var(--header-h) + 4rem); }
  .hero__title { font-size: clamp(3.2rem, 15.5vw, 6rem); }
  .scroll-hint { display: none; }
}
</style>
