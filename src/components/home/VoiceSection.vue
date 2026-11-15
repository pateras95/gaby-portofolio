<script setup>
// 04 — typography-led. Pick a voice: the writing is the visual, set differently for each tone.
// The text is always visible (no hiding behind animation); switching just cross-fades.
import { ref, computed } from 'vue'
import { mdiArrowTopRight } from '@mdi/js'
import CapabilityHead from './CapabilityHead.vue'

const props = defineProps({ section: { type: Object, required: true } })
const active = ref(0)
const voice = computed(() => props.section.voices[active.value])
const pad = (n) => String(n + 1).padStart(2, '0')
const greek = (t) => (/[Ͱ-Ͽ]/.test(t) ? 'el' : null) // lets uppercase Greek drop its accents correctly
</script>

<template>
  <section :id="`section-${section.id}`" class="voices" :aria-labelledby="`${section.id}-title`">
    <CapabilityHead :section="section" />

    <div class="container">
      <p class="eyebrow voices__prompt">{{ section.prompt }}</p>
      <ul class="voices__tabs">
        <li v-for="(v, i) in section.voices" :key="v.tone">
          <button type="button" class="voices__tab" :class="{ 'is-active': active === i }" :aria-pressed="active === i" aria-controls="voice-stage" @click="active = i">
            <span class="voices__tab-num">{{ pad(i) }}</span>
            <span class="voices__tab-tone">{{ v.tone }}</span>
            <span class="voices__tab-brand" :lang="greek(v.brand)">{{ v.brand }}</span>
          </button>
        </li>
      </ul>

      <Transition name="voice" mode="out-in">
        <div id="voice-stage" :key="active" class="voice" :class="`voice--${voice.style}`" aria-live="polite">
          <ol class="voice__samples">
            <li v-for="s in voice.samples" :key="s" class="voice__text" :lang="greek(s)">{{ s }}</li>
          </ol>
          <div class="voice__meta">
            <p class="voice__context"><strong :lang="greek(voice.brand)">{{ voice.brand }}</strong> — {{ voice.context }}</p>
            <p class="meta">{{ voice.source }}</p>
            <a v-if="voice.link" :href="voice.link.url" target="_blank" rel="noopener" class="link-line voice__link">
              See it in context <v-icon class="arrow" :icon="mdiArrowTopRight" />
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style>
.voices { background: #ebe6dc; padding-bottom: var(--section-space); }
:root[data-theme='dark'] .voices { background: #1a1815; }

.voices__prompt { margin-bottom: 1rem; }
.voices__tabs { display: grid; border-top: 1px solid var(--line); }
.voices__tab {
  position: relative; display: grid; grid-template-columns: auto 1fr; gap: 0 0.9rem; align-items: baseline; width: 100%; text-align: left;
  padding: 1rem 0; min-height: 44px; border-bottom: 1px solid var(--line); opacity: 0.55; transition: opacity 0.3s ease;
}
.voices__tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease-out); }
.voices__tab:hover, .voices__tab:focus-visible, .voices__tab.is-active { opacity: 1; }
.voices__tab.is-active::after { transform: scaleX(1); }
.voices__tab-num { font-family: var(--font-serif); font-style: italic; color: var(--accent); font-size: 1.15rem; }
.voices__tab-tone { font-weight: 700; font-size: 1.05rem; line-height: 1.2; }
.voices__tab-brand { grid-column: 2; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted-text); margin-top: 0.25rem; }

.voice { display: grid; gap: 2rem; padding-block: clamp(2.5rem, 6vw, 5rem) 0; min-height: 22rem; }
.voice__samples { display: grid; gap: 1.25rem; align-content: start; }
.voice__meta { display: grid; gap: 0.5rem; justify-items: start; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.voice__context { font-size: 1.05rem; }
.voice__link { display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 0.5rem; font-size: 0.74rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; min-height: 44px; }

/* one typographic treatment per tone of voice */
.voice--shout .voice__text { font-weight: 800; font-stretch: 82%; text-transform: uppercase; font-size: clamp(3rem, 11vw, 11rem); line-height: 0.88; letter-spacing: -0.03em; color: var(--accent); }
.voice--serif .voice__text { font-family: var(--font-serif); font-style: italic; font-size: clamp(1.9rem, 4.6vw, 4.6rem); line-height: 1.1; max-width: 24ch; }
.voice--headline .voice__samples { gap: 0; }
.voice--headline .voice__text { font-family: var(--font-serif); font-size: clamp(1.8rem, 4vw, 4rem); line-height: 1.08; padding-block: 1.25rem; border-top: 1px solid var(--line); max-width: 26ch; }
.voice--headline .voice__text:last-child { border-bottom: 1px solid var(--line); }
.voice--list .voice__samples { counter-reset: s; gap: 0; }
.voice--list .voice__text { counter-increment: s; display: flex; gap: 1.25rem; align-items: baseline; padding-block: 1rem; border-bottom: 1px solid var(--line); font-weight: 700; font-size: clamp(1.2rem, 2.4vw, 2.2rem); line-height: 1.15; letter-spacing: -0.01em; }
.voice--list .voice__text::before { content: counter(s, decimal-leading-zero); font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: 1rem; color: var(--accent); }

.voice-enter-active { transition: opacity 0.45s var(--ease-out), transform 0.5s var(--ease-out); }
.voice-leave-active { transition: opacity 0.2s ease; }
.voice-enter-from { opacity: 0; transform: translate3d(0, 14px, 0); }
.voice-leave-to { opacity: 0; }

@media (min-width: 900px) {
  .voices__tabs { grid-template-columns: repeat(4, 1fr); column-gap: 2rem; border-top: 0; }
  .voices__tab { border-top: 1px solid var(--line); border-bottom: 0; padding-block: 1.25rem; }
  .voices__tab::after { top: -1px; bottom: auto; }
  .voice { grid-template-columns: 2fr 1fr; column-gap: 6vw; align-items: start; }
  .voice__meta { border-top: 0; padding-top: 0.5rem; position: sticky; top: calc(var(--header-h) + 2rem); }
}
</style>
