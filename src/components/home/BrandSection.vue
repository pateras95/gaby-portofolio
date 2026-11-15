<script setup>
// 02 — pick a brand: the stage changes colour and typography, the insight and the content examples
// update without leaving the page. Embeds only load for the selected brand.
import { ref, computed } from 'vue'
import { mdiArrowRight } from '@mdi/js'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import EmbedCard from '@/components/projects/EmbedCard.vue'
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

    <div class="container brands__stage">
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
        <p class="eyebrow">{{ brand.label }}</p>
        <p class="serif serif--lead brands__insight">{{ brand.insight }}</p>
        <ul class="brands__examples" :aria-label="`${brand.name} content examples`">
          <li v-for="e in brand.examples" :key="e.url"><EmbedCard :link="e" variant="compact" /></li>
        </ul>
        <MagneticLink :to="brand.to">
          <span class="brands__cta">View the project <v-icon class="arrow" :icon="mdiArrowRight" /></span>
        </MagneticLink>
      </div>
    </div>
  </section>
</template>

<style>
.brands { background: var(--b-bg); color: var(--b-fg); transition: background-color 0.8s var(--ease-out), color 0.8s var(--ease-out); padding-bottom: var(--section-space); }
.brands .embed__tile { border-color: color-mix(in srgb, var(--b-fg) 18%, transparent); }
.brands :focus-visible { outline-color: var(--b-accent); }
.brands__stage { display: grid; gap: 3rem; }

.brands__list { display: grid; gap: 0.25rem; align-content: start; }
.brands__btn { display: grid; grid-template-columns: auto 1fr; gap: 0 1rem; align-items: baseline; width: 100%; text-align: left; padding: 0.9rem 0; min-height: 44px; border-top: 1px solid color-mix(in srgb, var(--b-fg) 22%, transparent); opacity: 0.45; transition: opacity 0.4s ease; }
.brands__btn:hover, .brands__btn:focus-visible, .brands__btn.is-active { opacity: 1; }
.brands__num { font-family: var(--font-serif); font-style: italic; color: var(--b-accent); font-size: 1.2rem; }
.brands__name { font-size: clamp(2rem, 4.6vw, 4.4rem); line-height: 0.95; letter-spacing: -0.02em; transition: transform 0.5s var(--ease-out); }
.brands__btn.is-active .brands__name { transform: translateX(0.6rem); }
.brands__label { grid-column: 2; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.7; margin-top: 0.4rem; }
/* each brand gets its own type personality */
.brands__btn--0 .brands__name { font-weight: 800; font-stretch: 82%; text-transform: uppercase; }
.brands__btn--1 .brands__name { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: clamp(2.4rem, 5.4vw, 5.2rem); }
.brands__btn--2 .brands__name { font-weight: 800; font-stretch: 100%; color: transparent; -webkit-text-stroke: 1.5px var(--b-fg); letter-spacing: 0; }
.brands__btn--2.is-active .brands__name { color: var(--b-fg); -webkit-text-stroke-color: transparent; }

.brands__panel { display: grid; gap: 1.5rem; align-content: start; animation: brand-in 0.6s var(--ease-out); }
.brands__insight { max-width: 24ch; font-size: clamp(1.5rem, 2.6vw, 2.4rem); }
.brands__examples { --embed-w: 330px; --embed-h: var(--embed-h-compact); display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-start; }
.brands__cta { display: inline-flex; align-items: center; gap: 0.75rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; border-bottom: 1px solid currentColor; padding-bottom: 0.3rem; min-height: 44px; }
@keyframes brand-in { from { opacity: 0; transform: translate3d(0, 16px, 0); } }

@media (min-width: 1000px) {
  .brands__stage { grid-template-columns: 5fr 7fr; column-gap: 5vw; align-items: start; }
  .brands__list { position: sticky; top: calc(var(--header-h) + 2rem); }
}
</style>
