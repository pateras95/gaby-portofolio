<script setup>
import { ref, onMounted } from 'vue'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import { useParallax } from '@/composables/useParallax'
import { prefersReducedMotion } from '@/composables/useMotion'
import { home } from '@/config'

const hero = home.hero
const ready = ref(false)
const par = ref(null)
useParallax(par, 0.1)

onMounted(() => requestAnimationFrame(() => (ready.value = true)))

function jump(e, id) {
  const target = document.getElementById(`section-${id}`)
  if (!target) return
  e.preventDefault()
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
</script>

<template>
  <section class="hero" :class="{ 'is-ready': ready }" aria-labelledby="hero-title">
    <div class="hero__media" aria-hidden="true">
      <div ref="par" class="hero__par">
        <img :src="hero.image" alt="" fetchpriority="high" decoding="async" :style="{ objectPosition: hero.imagePosition }" />
      </div>
      <span class="hero__mark">{{ hero.mark }}</span>
    </div>

    <div class="hero__head">
      <p class="eyebrow hero__eyebrow">{{ hero.eyebrow }}</p>
      <AnimatedText id="hero-title" tag="h1" class="display hero__title" :lines="hero.headline" immediate :delay="350" />
    </div>

    <div class="hero__foot">
      <p class="hero__statement">{{ hero.statement }}</p>
      <nav class="hero__index" :aria-label="hero.discover">
        <p class="eyebrow">{{ hero.discover }} ↓</p>
        <ol>
          <li v-for="s in home.sections" :key="s.id">
            <a :href="`#section-${s.id}`" class="link-line" @click="jump($event, s.id)"><span>{{ s.number }}</span>{{ s.title }}</a>
          </li>
        </ol>
      </nav>
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
  top: calc(var(--header-h) + 1rem); bottom: 16rem; right: var(--gutter); width: min(36vw, 520px);
  overflow: hidden; clip-path: inset(100% 0 0 0);
  transition: clip-path 1.3s var(--ease-io) 0.1s;
}
.hero.is-ready .hero__media { clip-path: inset(0); }
.hero__par { position: absolute; inset: -8% 0; will-change: transform; }
.hero__par img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.3); transition: transform 1.8s var(--ease-out) 0.1s; }
.hero.is-ready .hero__par img { transform: none; }
.hero__mark {
  position: absolute; right: 1.25rem; bottom: 1.25rem; width: 5rem; height: 5rem; display: grid; place-items: center; border-radius: 50%;
  background: var(--accent); color: #fff; font-family: var(--font-serif); font-style: italic; font-size: 2rem; line-height: 1;
}

.hero__head { display: grid; gap: 1.25rem; align-self: center; } /* no z-index here: it would isolate the blend below */
.hero__eyebrow { position: relative; z-index: 2; color: #fff; mix-blend-mode: difference; }
/* Difference blend: stays legible over both the page and the photo. */
.hero__title { position: relative; z-index: 2; color: #fff; mix-blend-mode: difference; font-size: clamp(2.2rem, 7.4vw, 8.4rem); padding-bottom: 0.18em; }

.hero__foot { position: relative; z-index: 2; display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1.5rem 3rem; }
.hero__foot > * { opacity: 0; transform: translate3d(0, 18px, 0); transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out); }
.hero.is-ready .hero__foot > * { opacity: 1; transform: none; }
.hero__statement { max-width: 30rem; font-family: var(--font-serif); font-style: italic; font-size: clamp(1.25rem, 2vw, 1.75rem); line-height: 1.2; transition-delay: 0.85s !important; }
.hero__index { display: grid; gap: 0.4rem; transition-delay: 1s !important; }
.hero__index ol { display: grid; }
.hero__index a { display: inline-flex; gap: 0.9rem; align-items: baseline; min-height: 30px; font-size: 0.85rem; font-weight: 600; }
.hero__index a span { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--accent); min-width: 1.5rem; }

@media (max-width: 767px) {
  .hero__media { width: 62vw; bottom: 18rem; top: calc(var(--header-h) + 5rem); }
  .hero__index ol { display: none; }
}
</style>
