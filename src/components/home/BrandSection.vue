<script setup>
// 02 — pick a brand: the stage changes colour and typography, the insight and its three posts update
// without leaving the page. Posts only load for the selected brand.
import { ref, computed } from 'vue'
import { mdiArrowRight } from '@mdi/js'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import PostCard from '@/components/projects/PostCard.vue'
import CapabilityHead from './CapabilityHead.vue'

const props = defineProps({ section: { type: Object, required: true } })
const active = ref(0)
const brand = computed(() => props.section.brands[active.value])
const theme = computed(() => ({ '--b-bg': brand.value.theme.bg, '--b-fg': brand.value.theme.fg, '--b-accent': brand.value.theme.accent }))
const pad = (n) => String(n + 1).padStart(2, '0')

// Hover selects on a mouse; touch and keyboard just click / press the button.
const hover = (e, i) => e.pointerType === 'mouse' && (active.value = i)
</script>

<template>
  <section :id="`section-${section.id}`" class="brands" :style="theme" :aria-labelledby="`${section.id}-title`">
    <CapabilityHead :section="section" />

    <div class="container">
      <ul class="brands__list" aria-label="Brands">
        <li v-for="(b, i) in section.brands" :key="b.name">
          <button
            type="button"
            class="brands__btn"
            :class="[`brands__btn--${i % 3}`, { 'is-active': active === i }]"
            :aria-pressed="active === i"
            :aria-controls="`${section.id}-panel`"
            lang="el"
            @click="active = i"
            @pointerenter="hover($event, i)"
          >
            <span class="brands__num">{{ pad(i) }}</span>
            <span class="brands__name">{{ b.name }}</span>
            <span class="brands__label">{{ b.label }}</span>
          </button>
        </li>
      </ul>

      <div :id="`${section.id}-panel`" :key="active" class="brands__panel" aria-live="polite">
        <div class="brands__lead">
          <p class="serif serif--lead brands__insight">{{ brand.insight }}</p>
          <MagneticLink :to="brand.to">
            <span class="brands__cta">View the project <v-icon class="arrow" :icon="mdiArrowRight" /></span>
          </MagneticLink>
        </div>
        <ul class="brands__posts" :aria-label="`${brand.name} — posts`">
          <li v-for="(e, i) in brand.examples" :key="i"><PostCard :link="e" /></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.brands { background: var(--b-bg); color: var(--b-fg); transition: background-color 0.8s var(--ease-out), color 0.8s var(--ease-out); padding-bottom: var(--section-space); --post-tag: var(--b-accent); }
.brands .post__media { border-color: color-mix(in srgb, var(--b-fg) 18%, transparent); }
.brands :focus-visible { outline-color: var(--b-accent); }

.brands__list { display: grid; gap: 0.25rem; }
.brands__btn { display: grid; grid-template-columns: auto 1fr; gap: 0 1rem; align-items: baseline; width: 100%; text-align: left; padding: 0.9rem 0; min-height: 44px; border-top: 1px solid color-mix(in srgb, var(--b-fg) 22%, transparent); opacity: 0.45; transition: opacity 0.4s ease; }
.brands__btn:hover, .brands__btn:focus-visible, .brands__btn.is-active { opacity: 1; }
.brands__num { font-family: var(--font-serif); font-style: italic; color: var(--b-accent); font-size: 1.2rem; }
.brands__name { font-size: clamp(2rem, 3.8vw, 3.8rem); line-height: 0.95; letter-spacing: -0.02em; transition: transform 0.5s var(--ease-out); }
.brands__btn.is-active .brands__name { transform: translateX(0.6rem); }
.brands__label { grid-column: 2; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.7; margin-top: 0.4rem; }
/* each brand gets its own type personality */
.brands__btn--0 .brands__name { font-weight: 800; font-stretch: 82%; text-transform: uppercase; }
.brands__btn--1 .brands__name { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: clamp(2.3rem, 4.4vw, 4.4rem); }
.brands__btn--2 .brands__name { font-weight: 800; font-stretch: 100%; color: transparent; -webkit-text-stroke: 1.5px var(--b-fg); letter-spacing: 0; }
.brands__btn--2.is-active .brands__name { color: var(--b-fg); -webkit-text-stroke-color: transparent; }

.brands__panel { display: grid; gap: 2.5rem; padding-top: clamp(2rem, 5vw, 4rem); animation: brand-in 0.6s var(--ease-out); }
.brands__lead { display: grid; gap: 1.5rem; align-items: end; }
.brands__insight { max-width: 26ch; font-size: clamp(1.5rem, 2.6vw, 2.4rem); }
.brands__cta { display: inline-flex; align-items: center; gap: 0.75rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; border-bottom: 1px solid currentColor; padding-bottom: 0.3rem; min-height: 44px; }
.brands__posts { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 28px; align-items: start; }
.brands__posts .post { width: 100%; }
@keyframes brand-in { from { opacity: 0; transform: translate3d(0, 16px, 0); } }

@media (min-width: 900px) {
  .brands__list { grid-template-columns: repeat(3, 1fr); column-gap: 2rem; }
  .brands__lead { grid-template-columns: 1fr auto; column-gap: 4rem; }
}
</style>
