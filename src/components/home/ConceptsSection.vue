<script setup>
// 03 — two concept boards (challenge → concept → experience), each with its own graphic language,
// plus the real work they produced:  quiz = a bright poster with answer options,
// hunt = a route on a dotted map that ends with an X.
import { mdiArrowRight } from '@mdi/js'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import ParallaxLayer from '@/components/ui/ParallaxLayer.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import PostCard from '@/components/projects/PostCard.vue'
import CapabilityHead from './CapabilityHead.vue'

defineProps({ section: { type: Object, required: true } })

const MARKS = { quiz: ['A', 'B', 'C'], hunt: ['1', '2', 'X'] }
const vars = (b) => ({ '--bd-bg': b.theme.bg, '--bd-fg': b.theme.fg, '--bd-accent': b.theme.accent })
const pad = (n) => String(n + 1).padStart(2, '0')
const greek = (t) => (/[Ͱ-Ͽ]/.test(t) ? 'el' : null)
</script>

<template>
  <section :id="`section-${section.id}`" class="concepts" :aria-labelledby="`${section.id}-title`">
    <CapabilityHead :section="section" />

    <article v-for="(b, i) in section.boards" :key="b.name" class="board" :class="`board--${b.style}`" :style="vars(b)">
      <ParallaxLayer v-if="b.style === 'hunt'" class="board__num-wrap" :speed="0.14"><span class="board__num" aria-hidden="true">{{ pad(i) }}</span></ParallaxLayer>

      <div class="container board__inner">
        <header class="board__head">
          <p class="eyebrow"><template v-if="b.style === 'quiz'">{{ pad(i) }} — </template>{{ b.title }}</p>
          <h3 class="display board__name" :lang="greek(b.name)">{{ b.name }}</h3>
          <ul class="board__focus" aria-label="Focus">
            <li v-for="f in b.focus" :key="f">{{ f }}</li>
          </ul>
          <MagneticLink :to="b.to">
            <span class="board__cta">View the project <v-icon class="arrow" :icon="mdiArrowRight" /></span>
          </MagneticLink>
        </header>

        <ol class="board__beats">
          <RevealOnScroll v-for="(beat, j) in b.beats" :key="beat.label" tag="li" class="beat" :delay="j * 120">
            <span class="beat__mark" aria-hidden="true">{{ MARKS[b.style][j] }}</span>
            <div>
              <p class="beat__label">{{ beat.label }}</p>
              <p class="beat__text">{{ beat.text }}</p>
            </div>
          </RevealOnScroll>
        </ol>

        <ul class="board__tiles" :aria-label="`${b.name} — the work`">
          <li v-for="(e, k) in b.examples" :key="k"><PostCard :link="e" /></li>
        </ul>
      </div>
    </article>
  </section>
</template>

<style>
.concepts { background: #100e0c; color: #f4f0e9; padding-bottom: var(--section-space); }

.board { position: relative; overflow: hidden; background: var(--bd-bg); color: var(--bd-fg); margin-top: clamp(1.5rem, 3vw, 2.5rem); --post-tag: var(--bd-accent); }
.board :focus-visible { outline-color: var(--bd-accent); }
.board .post { width: 100%; }

.board__inner { position: relative; z-index: 1; display: grid; gap: 3rem; padding-block: clamp(3rem, 7vw, 6rem); }
.board__head { display: grid; gap: 1.25rem; align-content: start; }
.board__name { font-size: clamp(2.6rem, 6vw, 6rem); color: var(--bd-accent); }
.board__focus { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.board__focus li { padding: 0.4rem 0.8rem; border: 1px solid color-mix(in srgb, var(--bd-fg) 35%, transparent); font-size: 0.74rem; font-weight: 500; letter-spacing: 0.04em; }
.board__cta { display: inline-flex; align-items: center; gap: 0.75rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; border-bottom: 1px solid currentColor; padding-bottom: 0.3rem; min-height: 44px; transition: color 0.3s ease, opacity 0.3s ease; }

/* beats: challenge → concept → experience */
.board__beats { display: grid; gap: 0; align-content: start; }
.beat { position: relative; display: grid; grid-template-columns: auto 1fr; gap: 1.25rem; padding-block: 1.25rem; }
.beat__mark { display: grid; place-items: center; width: 3rem; height: 3rem; flex: none; font-family: var(--font-serif); font-style: italic; font-size: 1.5rem; line-height: 1; border: 1px solid var(--bd-accent); color: var(--bd-accent); }
.beat__label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--bd-accent); margin-bottom: 0.4rem; }
.beat__text { font-size: clamp(1rem, 1.3vw, 1.15rem); line-height: 1.55; max-width: 36rem; }

/* the work, laid out like a collage */
.board__tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 420px)); gap: 28px; align-items: start; justify-content: start; }
.board__tiles li { transition: transform 0.5s var(--ease-out); }
.board__tiles li:nth-child(even) { margin-top: 3.5rem; }
@media (hover: hover) { .board__tiles li:hover { transform: translate3d(0, -8px, 0); } }

/* ── hunt: treasure map ─────────────────────────────────────────────────── */
.board--hunt { background-image: radial-gradient(color-mix(in srgb, var(--bd-fg) 16%, transparent) 1.2px, transparent 1.4px); background-size: 30px 30px; }
.board__num-wrap { position: absolute; right: var(--gutter); top: 1rem; z-index: 0; pointer-events: none; }
.board__num { display: block; font-weight: 800; font-stretch: 82%; font-size: clamp(9rem, 30vw, 26rem); line-height: 0.8; letter-spacing: -0.05em; user-select: none; color: transparent; -webkit-text-stroke: 2px color-mix(in srgb, var(--bd-accent) 55%, transparent); }
.board--hunt .beat:not(:last-child)::after { content: ''; position: absolute; left: 1.5rem; top: calc(1.25rem + 3rem); bottom: -1.25rem; border-left: 2px dashed color-mix(in srgb, var(--bd-accent) 70%, transparent); }
.board--hunt .beat:last-child .beat__mark { background: var(--bd-accent); color: var(--bd-bg); font-style: normal; font-weight: 800; font-family: var(--font-display); }
.board--hunt .board__cta:hover, .board--hunt .board__cta:focus-visible { color: var(--bd-accent); }

/* ── quiz: a bright poster, answers A / B / C ───────────────────────────── */
.board--quiz { --line: rgb(0 0 0 / 0.28); --post-tag: var(--bd-fg); }
.board--quiz .board__name { color: var(--bd-fg); }
.board--quiz .board__focus li { border-color: var(--bd-fg); font-weight: 600; }
.board--quiz .beat { border-top: 2px solid var(--bd-fg); padding-block: 1.5rem; }
.board--quiz .beat:last-child { border-bottom: 2px solid var(--bd-fg); }
.board--quiz .beat__mark { width: 3.4rem; height: 3.4rem; font-size: 1.8rem; background: var(--bd-fg); color: var(--bd-bg); border-color: var(--bd-fg); }
.board--quiz .beat__label { color: var(--bd-fg); opacity: 0.7; }
.board--quiz .beat__text { font-weight: 500; }
.board--quiz .board__cta:hover, .board--quiz .board__cta:focus-visible { opacity: 0.65; }

@media (min-width: 1000px) {
  .board__inner { grid-template-columns: 5fr 7fr; column-gap: 5vw; }
  .board__head { position: sticky; top: calc(var(--header-h) + 2rem); align-self: start; }
  .board__tiles { grid-column: 1 / -1; }
  .board--hunt .board__head { order: 2; } /* mirrored composition: text on the right */
  .board--hunt .board__beats { order: 1; }
  .board--hunt .board__tiles { order: 3; justify-content: end; }
  .board--hunt .board__inner { grid-template-columns: 7fr 5fr; }
}
@media (max-width: 899px) { .board__tiles li:nth-child(even) { margin-top: 0; } }
</style>
