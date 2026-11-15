<script setup>
// One work sample inside a phone. The iframe is only created when the phone is about to be
// seen (so 14 Instagram embeds don't all load at once). The embed itself is interactive.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mdiArrowTopRight } from '@mdi/js'
import { observe } from '@/composables/useInView'

const props = defineProps({ link: { type: Object, required: true } })

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
    { rootMargin: '0px 200px' },
  )
})
onBeforeUnmount(() => stop())
</script>

<template>
  <figure ref="root" class="phone" :class="`phone--${link.kind.toLowerCase()}`">
    <div class="phone__device">
      <span class="phone__island" aria-hidden="true" />
      <div class="phone__screen">
        <template v-if="link.embed">
          <span class="phone__loading" aria-hidden="true">{{ link.kind }}</span>
          <iframe
            v-if="show"
            :src="link.embed"
            :title="`${link.label} — ${link.kind}`"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
          />
        </template>
        <a v-else :href="link.url" target="_blank" rel="noopener" class="phone__card">
          <span class="phone__card-kind">{{ link.kind }}</span>
          <span class="phone__card-title">{{ link.label }}</span>
          <span class="phone__card-open">Open <v-icon :icon="mdiArrowTopRight" size="16" /></span>
        </a>
      </div>
      <span class="phone__home" aria-hidden="true" />
    </div>

    <figcaption class="phone__caption">
      <span class="phone__label">{{ link.label }}</span>
      <a :href="link.url" target="_blank" rel="noopener" class="phone__open link-line">
        Open on {{ link.kind === 'Web' ? 'site' : link.kind }} <v-icon :icon="mdiArrowTopRight" size="14" />
      </a>
    </figcaption>
  </figure>
</template>

<style>
.phone { width: min(350px, 100%); flex: none; display: grid; gap: 1rem; }

.phone__device {
  position: relative; padding: 10px; border-radius: 50px;
  background: linear-gradient(150deg, #4a4a4d 0%, #151516 38%, #232326 100%);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14), 0 44px 60px -34px rgb(0 0 0 / 0.55), 0 14px 26px -14px rgb(0 0 0 / 0.4);
}
/* side buttons */
.phone__device::before, .phone__device::after { content: ''; position: absolute; width: 3px; border-radius: 2px; background: #2c2c2e; }
.phone__device::before { left: -3px; top: 120px; height: 56px; box-shadow: 0 74px 0 #2c2c2e; }
.phone__device::after { right: -3px; top: 160px; height: 84px; }

.phone__screen { position: relative; height: 640px; border-radius: 40px; overflow: hidden; background: #0b0b0c; isolation: isolate; }
/* safe areas: status bar (island) on top, home indicator at the bottom — the embed never sits under them */
.phone__screen iframe { position: absolute; left: 0; right: 0; top: 46px; bottom: 28px; width: 100%; height: calc(100% - 74px); border: 0; background: #fff; }
.phone__loading {
  position: absolute; inset: 0; display: grid; place-items: center; color: #5b5b60;
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
}
.phone__island { position: absolute; z-index: 3; top: 20px; left: 50%; width: 92px; height: 27px; margin-left: -46px; border-radius: 20px; background: #000; pointer-events: none; }
.phone__home { position: absolute; z-index: 3; bottom: 19px; left: 50%; width: 118px; height: 4px; margin-left: -59px; border-radius: 4px; background: rgb(255 255 255 / 0.85); mix-blend-mode: difference; pointer-events: none; }

/* No embeddable form (profiles / channels): a card on the phone screen */
.phone__card {
  position: absolute; inset: 0; display: grid; align-content: end; gap: 0.75rem; padding: 2rem 1.75rem 3.25rem; color: #fff;
  background: radial-gradient(120% 70% at 20% 0%, var(--accent), transparent 60%), linear-gradient(170deg, #2b2b2e, #0b0b0c);
}
.phone__card-kind { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8; }
.phone__card-title { font-family: var(--font-display); font-weight: 800; font-stretch: 82%; font-size: 2rem; line-height: 0.98; letter-spacing: -0.02em; text-transform: uppercase; word-break: break-word; }
.phone__card-open { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }

.phone__caption { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; padding-inline: 0.4rem; }
.phone__label { font-size: 0.82rem; font-weight: 600; line-height: 1.3; }
.phone__open { flex: none; display: inline-flex; align-items: center; gap: 0.2rem; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; min-height: 44px; }
</style>
