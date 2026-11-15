<script setup>
// 04 — pick a voice. The whole post is embedded, and everything we know about it is pulled apart into
// floating badges around it: tone, brand, the words themselves (set in type for that voice), every
// hashtag, context, source and links. All text stays visible — the drift animation is only motion.
import { ref, computed } from 'vue'
import { mdiArrowTopRight } from '@mdi/js'
import PostCard from '@/components/projects/PostCard.vue'
import CapabilityHead from './CapabilityHead.vue'

const props = defineProps({ section: { type: Object, required: true } })
const active = ref(0)
const voice = computed(() => props.section.voices[active.value])
const lines = computed(() => (voice.value.samples?.length ? voice.value.samples : [voice.value.post.text].filter(Boolean)))
const links = computed(() => [{ ...voice.value.post, label: 'See the original' }, ...voice.value.also])
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
          <div class="voice__post"><PostCard :link="voice.post" :caption="false" :crop="false" /></div>

          <div class="voice__cloud">
            <span class="bubble bubble--tone">{{ voice.tone }}</span>
            <span class="bubble bubble--brand" :lang="greek(voice.brand)">{{ voice.brand }} <small>{{ voice.post.kind === 'Web' ? 'Article' : voice.post.kind }}</small></span>

            <div class="bubble bubble--text">
              <p v-for="l in lines" :key="l" class="voice__text" :lang="greek(l)">{{ l }}</p>
            </div>

            <ul v-if="voice.post.tags.length" class="voice__tags" aria-label="Hashtags">
              <li v-for="(t, i) in voice.post.tags" :key="t" class="bubble bubble--tag" :style="{ '--i': i }">{{ t }}</li>
            </ul>

            <span class="bubble bubble--context">{{ voice.context }}</span>
            <span class="bubble bubble--source">{{ voice.source }}</span>

            <div class="voice__links">
              <a v-for="l in links" :key="l.url" :href="l.url" target="_blank" rel="noopener" class="bubble bubble--link">
                {{ l.label }} <v-icon :icon="mdiArrowTopRight" size="16" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style>
.voices { --paper: #fffdf8; background: #ebe6dc; padding-bottom: var(--section-space); }
:root[data-theme='dark'] .voices { --paper: #26231f; background: #1a1815; }

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

.voice { display: grid; gap: 2.5rem; padding-top: clamp(2.5rem, 6vw, 5rem); align-items: start; }
.voice__post .post { width: 100%; }

/* ── the exploded information ─────────────────────────────────────────── */
.voice__cloud { position: relative; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1.1rem 1rem; align-content: start; }
.bubble {
  position: relative; display: inline-flex; align-items: center; gap: 0.5rem; width: fit-content; max-width: 100%;
  padding: 0.65rem 1.15rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; line-height: 1.3;
  background: color-mix(in srgb, var(--ink) 9%, var(--bg)); color: var(--ink);
  box-shadow: 0 16px 28px -20px rgb(0 0 0 / 0.45);
  animation: drift var(--dur, 7s) ease-in-out var(--delay, 0s) infinite;
}
@keyframes drift { 0%, 100% { transform: translate3d(var(--dx, 0), 0, 0); } 50% { transform: translate3d(var(--dx, 0), -7px, 0); } }

.bubble--tone { grid-column: 1 / span 5; background: var(--accent); color: #fff; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.8rem 1.4rem; --dur: 8s; }
.bubble--brand { grid-column: 3 / -1; justify-self: end; background: var(--ink); color: var(--bg); --dx: -1rem; --dur: 6.5s; --delay: -2s; }
.bubble--brand small { font-weight: 500; opacity: 0.7; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }

/* the words, in a speech bubble — set in type for the voice */
.bubble--text { grid-column: 1 / -1; display: grid; gap: 0.5rem; width: 100%; padding: clamp(1.4rem, 3vw, 2.2rem) clamp(1.5rem, 3.4vw, 2.6rem); border-radius: 30px 30px 30px 6px; background: var(--paper); font-weight: 400; --dx: 0.6rem; --dur: 9s; --delay: -1s; }
.voice__text { overflow-wrap: anywhere; white-space: pre-line; }
.voice--shout .voice__text { font-weight: 800; font-stretch: 82%; text-transform: uppercase; font-size: clamp(2.2rem, 4.8vw, 4.6rem); line-height: 0.92; letter-spacing: -0.03em; color: var(--accent); }
.voice--serif .voice__text { font-family: var(--font-serif); font-style: italic; font-size: clamp(1.5rem, 2.6vw, 2.5rem); line-height: 1.15; }
.voice--headline .voice__text { font-family: var(--font-serif); font-size: clamp(1.4rem, 2.4vw, 2.3rem); line-height: 1.1; padding-block: 0.9rem; border-top: 1px solid var(--line); }
.voice--headline .voice__text:first-child { border-top: 0; padding-top: 0; }
.voice--list { counter-reset: s; }
.voice--list .voice__text { counter-increment: s; display: flex; gap: 1rem; align-items: baseline; padding-block: 0.7rem; border-top: 1px solid var(--line); font-weight: 700; font-size: clamp(1.05rem, 1.7vw, 1.6rem); line-height: 1.15; }
.voice--list .voice__text:first-child { border-top: 0; padding-top: 0; }
.voice--list .voice__text::before { content: counter(s, decimal-leading-zero); font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: 1rem; color: var(--accent); }

/* every hashtag is its own little floating badge */
.voice__tags { grid-column: 2 / -1; display: flex; flex-wrap: wrap; gap: 0.6rem; }
.bubble--tag { padding: 0.4rem 0.85rem; font-size: 0.78rem; font-weight: 600; background: transparent; color: var(--accent); border: 1px solid color-mix(in srgb, var(--accent) 60%, transparent); box-shadow: none; --dur: 6s; animation-delay: calc(var(--i, 0) * -1.1s); }
.voice__tags li:nth-child(odd) { --dx: 0.4rem; }
.bubble--context { grid-column: 1 / span 5; font-weight: 500; --dur: 7.5s; --delay: -3s; }
.bubble--source { grid-column: 2 / -1; justify-self: end; font-weight: 500; font-size: 0.78rem; color: var(--muted-text); background: transparent; border: 1px dashed color-mix(in srgb, var(--ink) 35%, transparent); box-shadow: none; --dur: 8.5s; --delay: -4s; }
.voice__links { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 0.7rem; }
.bubble--link { background: var(--ink); color: var(--bg); text-decoration: none; letter-spacing: 0.04em; transition: background-color 0.3s ease, transform 0.3s ease; --dur: 7s; }
.bubble--link:hover, .bubble--link:focus-visible { background: var(--accent); color: #fff; }

.voice-enter-active { transition: opacity 0.45s var(--ease-out), transform 0.5s var(--ease-out); }
.voice-leave-active { transition: opacity 0.2s ease; }
.voice-enter-from { opacity: 0; transform: translate3d(0, 14px, 0); }
.voice-leave-to { opacity: 0; }

@media (min-width: 900px) {
  .voices__tabs { grid-template-columns: repeat(4, 1fr); column-gap: 2rem; border-top: 0; }
  .voices__tab { border-top: 1px solid var(--line); border-bottom: 0; padding-block: 1.25rem; }
  .voices__tab::after { top: -1px; bottom: auto; }
  .voice { grid-template-columns: minmax(300px, 420px) 1fr; column-gap: 4vw; }
  /* dashed connectors: the post is "taken apart" into the badges */
  .voice__cloud::before { content: ''; position: absolute; left: -2vw; top: 1.5rem; bottom: 1.5rem; border-left: 1px dashed color-mix(in srgb, var(--ink) 40%, transparent); }
  .bubble--tone::before, .bubble--text::before, .bubble--context::before, .voice__links::before { content: ''; position: absolute; right: 100%; top: 50%; width: 2vw; border-top: 1px dashed color-mix(in srgb, var(--ink) 40%, transparent); }
  .voice__links::before { position: absolute; top: 1.3rem; }
  .voice__links { position: relative; }
}
@media (max-width: 899px) {
  .voice__cloud { grid-template-columns: 1fr; }
  .voice__cloud > *, .voice__tags { grid-column: 1 / -1 !important; justify-self: start !important; }
}
</style>
