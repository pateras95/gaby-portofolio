<script setup>
// One work sample, embedded directly (Instagram with caption, TikTok, YouTube, Issuu, LinkedIn,
// article pages). Every tile has the same fixed size (--embed-w × --embed-h in tokens.css);
// long content scrolls inside the tile. The iframe is only created when the tile is about to be
// seen, so a page with 14 Instagram posts doesn't load them all at once.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { mdiArrowTopRight } from '@mdi/js'
import { observe } from '@/composables/useInView'

const props = defineProps({
  link: { type: Object, required: true },
  variant: { type: String, default: 'full' }, // 'compact' → Instagram without its caption (shorter)
  caption: { type: Boolean, default: true },
})
const src = computed(() => (props.variant === 'compact' ? props.link.embedCompact : props.link.embed))

const root = ref(null)
const show = ref(false)
let stop = () => {}

onMounted(() => {
  if (!props.link.embed) return
  if (typeof IntersectionObserver === 'undefined') return (show.value = true)
  stop = observe(
    root.value,
    (e) => {
      if (!e.isIntersecting) return
      show.value = true
      stop()
    },
    { rootMargin: '0px 300px' },
  )
})
onBeforeUnmount(() => stop())
</script>

<template>
  <figure ref="root" class="embed" :class="`embed--${link.kind.toLowerCase()}`">
    <div v-if="link.embed" class="embed__tile">
      <span class="embed__loading" aria-hidden="true">{{ link.kind }}</span>
      <iframe
        v-if="show"
        :src="src"
        :title="`${link.label} — ${link.kind}`"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      />
    </div>
    <a v-else :href="link.url" target="_blank" rel="noopener" class="embed__tile embed__plain">
      <span class="embed__plain-kind">{{ link.kind }}</span>
      <span class="embed__plain-title">{{ link.label }}</span>
    </a>

    <figcaption v-if="caption" class="embed__caption">
      <span class="embed__label">{{ link.label }}</span>
      <a :href="link.url" target="_blank" rel="noopener" class="embed__open link-line">
        Open on {{ link.kind === 'Web' ? 'site' : link.kind }} <v-icon :icon="mdiArrowTopRight" size="14" />
      </a>
    </figcaption>
  </figure>
</template>

<style>
/* viewport-based max width: a % here would be circular inside the scrolling row */
.embed { width: min(var(--embed-w), calc(100vw - 2 * var(--gutter))); flex: none; display: grid; gap: 0.75rem; align-content: start; }

/* the tile: identical size for every platform */
.embed__tile { position: relative; display: block; height: var(--embed-h); overflow: hidden; border-radius: 14px; border: 1px solid var(--line); background: #fff; }
.embed--youtube .embed__tile { background: #000; border-color: transparent; }
.embed--issuu .embed__tile { background: #2b2b2e; border-color: transparent; }
.embed__tile iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
/* Instagram draws its own border: push it outside the rounded clip */
.embed--instagram .embed__tile iframe { inset: -1px; width: calc(100% + 2px); height: calc(100% + 2px); }
.embed__loading {
  position: absolute; inset: 0; display: grid; place-items: center; color: var(--muted);
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
}

/* links that can't be embedded (profiles, channels) — same tile size */
.embed__plain {
  display: grid; align-content: end; gap: 0.6rem; padding: 1.75rem; color: #fff; border-color: transparent;
  background: radial-gradient(120% 70% at 20% 0%, var(--accent), transparent 62%), linear-gradient(170deg, #2b2b2e, #0b0b0c);
}
.embed__plain-kind { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8; }
.embed__plain-title { font-family: var(--font-display); font-weight: 800; font-stretch: 82%; font-size: 1.8rem; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; word-break: break-word; }

/* fixed-height caption row so the "Open on …" links line up under every tile */
.embed__caption { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; min-height: 3rem; }
.embed__label { font-size: 0.85rem; font-weight: 600; line-height: 1.35; padding-top: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.embed__open { flex: none; display: inline-flex; align-items: center; gap: 0.2rem; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; min-height: 44px; }
</style>
