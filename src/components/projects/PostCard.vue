<script setup>
// One embedded work sample — the same card everywhere (home page, project pages):
//   media (the real post, playable)  ·  its text + hashtags  ·  a footer row with the label and a link to the original.
// The media has a fixed proportion (5:7; YouTube 16:9; Issuu 4:3), so cards line up in any row.
// Instagram posts are cropped just above their like/comment bar; `crop=false` shows the whole post instead.
// The iframe is only created when the card is about to be seen (so 14 Instagram posts don't load at once).
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { mdiArrowTopRight } from '@mdi/js'
import { observe } from '@/composables/useInView'

const props = defineProps({
  link: { type: Object, required: true },
  caption: { type: Boolean, default: true }, // text + hashtags under the media
  crop: { type: Boolean, default: true },
})

const root = ref(null)
const frame = ref(null)
const textEl = ref(null)
const show = ref(false)
const measured = ref(0) // Instagram reports the height of the whole post (used when crop=false)
const open = ref(false)
const clamped = ref(false)
let stop = () => {}
let raf = 0

const whole = computed(() => props.link.kind === 'Instagram' && !props.crop)
const mediaStyle = computed(() => (whole.value ? { height: `${measured.value || 740}px` } : {}))
const lang = computed(() => (/[Ͱ-Ͽ]/.test(props.link.text) ? 'el' : null))

function onMessage(e) {
  if (!whole.value || !e.origin.includes('instagram.com') || e.source !== frame.value?.contentWindow) return
  try {
    const msg = JSON.parse(e.data)
    if (msg.type === 'MEASURE' && msg.details?.height) measured.value = Math.ceil(msg.details.height)
  } catch {}
}
// "Read more" only appears when the text is actually cut off
function check() {
  raf = 0
  if (textEl.value && !open.value) clamped.value = textEl.value.scrollHeight > textEl.value.clientHeight + 1
}
const schedule = () => { raf ||= requestAnimationFrame(check) }

onMounted(async () => {
  window.addEventListener('message', onMessage)
  window.addEventListener('resize', schedule, { passive: true })
  await nextTick()
  check()
  document.fonts?.ready.then(check)
  if (!props.link.embed) return
  if (typeof IntersectionObserver === 'undefined') return (show.value = true)
  stop = observe(root.value, (e) => e.isIntersecting && ((show.value = true), stop()), { rootMargin: '0px 300px' })
})
onBeforeUnmount(() => {
  stop()
  window.removeEventListener('message', onMessage)
  window.removeEventListener('resize', schedule)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <figure ref="root" class="post" :class="[`post--${link.kind.toLowerCase()}`, { 'post--whole': whole, 'is-open': open }]">
    <div class="post__media" :style="mediaStyle">
      <div v-if="link.placeholder" class="post__placeholder">
        <span class="post__ph-kind">Placeholder</span>
        <span class="post__ph-label">{{ link.label }}</span>
        <span class="post__ph-hint">Choose a post in home.config.js</span>
      </div>
      <template v-else-if="link.embed">
        <span class="post__loading" aria-hidden="true">{{ link.kind }}</span>
        <iframe
          v-if="show"
          ref="frame"
          :src="link.embed"
          :title="`${link.label} — ${link.kind}`"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        />
      </template>
      <a v-else :href="link.url" target="_blank" rel="noopener" class="post__plain">
        <span class="post__plain-kind">{{ link.kind }}</span>
        <span class="post__plain-title">{{ link.label }}</span>
      </a>
    </div>

    <div v-if="caption && (link.text || link.tags.length)" class="post__body">
      <p v-if="link.text" ref="textEl" class="post__text" :lang="lang">{{ link.text }}</p>
      <p v-if="link.tags.length" class="post__tags">{{ link.tags.join(' ') }}</p>
      <button v-if="clamped || open" type="button" class="tap post__more" :aria-expanded="open" @click="open = !open; schedule()">
        <span class="link-line">{{ open ? 'Show less' : 'Read more' }}</span>
      </button>
    </div>

    <figcaption class="post__foot">
      <span class="post__label">{{ link.label }}</span>
      <a v-if="link.url" :href="link.url" target="_blank" rel="noopener" class="tap post__open">
        <span class="link-line">Open on {{ link.kind === 'Web' ? 'site' : link.kind }} <v-icon :icon="mdiArrowTopRight" size="14" /></span>
      </a>
    </figcaption>
  </figure>
</template>

<style>
/* width: fixed in sideways rows (--post-w); containers that lay cards out in a grid set  .post { width: 100% } */
.post { --post-w: 400px; width: min(var(--post-w), calc(100vw - 2 * var(--gutter))); min-width: 0; display: grid; gap: 0.9rem; align-content: start; }

.post__media { position: relative; overflow: hidden; aspect-ratio: 5 / 7; border-radius: 14px; border: 1px solid var(--line); background: #fff; }
.post--youtube .post__media { aspect-ratio: 16 / 9; background: #000; border-color: transparent; }
.post--issuu .post__media { aspect-ratio: 4 / 3; background: #2b2b2e; border-color: transparent; }
.post--whole .post__media { aspect-ratio: auto; }
.post__media iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
/* Instagram: a taller frame than the visible media, so the part below (likes, comment bar) is cropped away */
.post--instagram:not(.post--whole) .post__media iframe { top: -1px; left: -1px; width: calc(100% + 2px); height: 165%; }
.post--instagram.post--whole .post__media iframe { top: -1px; left: -1px; width: calc(100% + 2px); height: calc(100% + 2px); }
.post__loading { position: absolute; inset: 0; display: grid; place-items: center; color: var(--muted); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; }

/* profiles / channels that can't be embedded */
.post__plain { position: absolute; inset: 0; display: grid; align-content: end; gap: 0.6rem; padding: 1.75rem; color: #fff; background: radial-gradient(120% 70% at 20% 0%, var(--accent), transparent 62%), linear-gradient(170deg, #2b2b2e, #0b0b0c); }
.post__plain-kind { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8; }
.post__plain-title { font-family: var(--font-display); font-weight: 800; font-stretch: 82%; font-size: 1.8rem; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; word-break: break-word; }
/* empty slot, to be replaced in home.config.js */
.post__placeholder { position: absolute; inset: 0; display: grid; align-content: center; justify-items: center; gap: 0.6rem; padding: 1.5rem; text-align: center; border: 2px dashed color-mix(in srgb, currentColor 35%, transparent); border-radius: 14px; background: color-mix(in srgb, currentColor 5%, transparent); color: inherit; }
.post--placeholder .post__media { background: transparent; border-color: transparent; }
.post__ph-kind { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); }
.post__ph-label { font-family: var(--font-display); font-weight: 800; font-stretch: 82%; font-size: 1.6rem; line-height: 1; text-transform: uppercase; }
.post__ph-hint { font-size: 0.8rem; opacity: 0.7; }

/* text + hashtags (fixed minimum height, so the footers line up across a row) */
.post__body { display: grid; gap: 0.5rem; align-content: start; min-height: 9.75rem; }
.post__text { font-size: 0.92rem; line-height: 1.5; white-space: pre-line; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.post__tags { font-size: 0.8rem; line-height: 1.45; color: var(--post-tag, var(--accent)); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; }
.post.is-open .post__text, .post.is-open .post__tags { -webkit-line-clamp: unset; display: block; }
.post.is-open .post__body { min-height: 0; }
.post__more { justify-self: start; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }

/* footer: label and link on the same baseline, underline right under the text */
.post__foot { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; }
.post__label { font-size: 0.85rem; font-weight: 600; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.post__open { flex: none; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
</style>
