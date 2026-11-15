<script setup>
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import AnimatedText from '@/components/ui/AnimatedText.vue'

defineProps({ block: { type: Object, required: true } })
</script>

<template>
  <!-- Typographic quote -->
  <blockquote v-if="block.layout === 'quote'" class="gb gb--quote container">
    <AnimatedText tag="p" class="display display--m" :text="block.text" />
    <footer v-if="block.cite" class="meta">— {{ block.cite }}</footer>
  </blockquote>

  <!-- Video placeholder (set `video: '/file.mp4'` on the block for a real player) -->
  <figure v-else-if="block.layout === 'video'" class="gb gb--video container">
    <RevealOnScroll variant="fade" class="gb__frame">
      <video v-if="block.video" :src="block.video" :poster="block.images[0].src" controls preload="none" />
      <template v-else>
        <img :src="block.images[0].src" alt="" loading="lazy" decoding="async" />
        <span class="gb__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
        <span class="gb__vlabel">Video placeholder — {{ block.label }}</span>
      </template>
    </RevealOnScroll>
  </figure>

  <!-- Image layouts: full | landscape | two | asymmetric | portrait | spread -->
  <section v-else class="gb" :class="[`gb--${block.layout}`, { container: block.layout !== 'full' }]">
    <figure v-for="(im, i) in block.images" :key="i" class="gb__fig" :class="`gb__fig--${i + 1}`">
      <RevealOnScroll variant="mask" :delay="i * 120" class="gb__frame">
        <img :src="im.src" :alt="im.alt" loading="lazy" decoding="async" />
      </RevealOnScroll>
    </figure>
    <p v-if="block.caption" class="gb__caption meta">{{ block.caption }}</p>
  </section>
</template>

<style>
.gb { margin-block: clamp(2rem, 5vw, 5rem); }
.gb__frame { position: relative; overflow: hidden; background: color-mix(in srgb, var(--ink) 8%, transparent); }
.gb__frame img { width: 100%; height: 100%; object-fit: cover; }

.gb--full .gb__frame { aspect-ratio: 16 / 9; }
.gb--full .gb__caption { padding: 0.75rem var(--gutter) 0; }

.gb--landscape { display: grid; }
.gb--landscape .gb__fig { width: min(100%, 78rem); margin-left: auto; }
.gb--landscape .gb__frame { aspect-ratio: 21 / 9; }
.gb--landscape .gb__caption { margin-top: 0.75rem; }

.gb--two { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.75rem, 2vw, 2rem); }
.gb--two .gb__frame { aspect-ratio: 4 / 5; }

.gb--asymmetric { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(0.75rem, 2vw, 2rem); align-items: start; }
.gb--asymmetric .gb__fig--1 { grid-column: 1 / 9; }
.gb--asymmetric .gb__fig--1 .gb__frame { aspect-ratio: 4 / 3; }
.gb--asymmetric .gb__fig--2 { grid-column: 9 / 13; align-self: end; }
.gb--asymmetric .gb__fig--2 .gb__frame { aspect-ratio: 3 / 4; }
.gb--asymmetric .gb__fig--3 { grid-column: 3 / 10; margin-top: clamp(1rem, 4vw, 4rem); }
.gb--asymmetric .gb__fig--3 .gb__frame { aspect-ratio: 16 / 9; }

.gb--portrait { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(0.75rem, 2vw, 2rem); }
.gb--portrait .gb__fig--1 { grid-column: 2 / 7; }
.gb--portrait .gb__fig--2 { grid-column: 7 / 12; margin-top: clamp(2rem, 9vw, 9rem); }
.gb--portrait .gb__frame { aspect-ratio: 3 / 4; }

/* Magazine spread mockup */
.gb--spread {
  display: grid; grid-template-columns: 1fr 1fr; width: min(100% - 2 * var(--gutter), 1100px); margin-inline: auto;
  padding: clamp(0.5rem, 2vw, 1.5rem); background: #f7f4ee; padding-inline: clamp(0.5rem, 2vw, 1.5rem);
}
.gb--spread.container { padding-inline: clamp(0.5rem, 2vw, 1.5rem); }
.gb--spread .gb__frame { aspect-ratio: 3 / 4; background: #e7e2d8; }
.gb--spread .gb__fig { position: relative; }
.gb--spread .gb__fig::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 14%; pointer-events: none;
  background: linear-gradient(to var(--spine, right), transparent, rgb(0 0 0 / 0.22));
}
.gb--spread .gb__fig--1 { --spine: right; }
.gb--spread .gb__fig--1::after { right: 0; }
.gb--spread .gb__fig--2 { --spine: left; }
.gb--spread .gb__fig--2::after { left: 0; }
.gb--spread .gb__caption { grid-column: 1 / -1; padding-top: 0.5rem; }

.gb--video .gb__frame { aspect-ratio: 16 / 9; }
.gb--video .gb__frame img, .gb--video video { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); }
.gb--video video { filter: none; }
.gb__play {
  position: absolute; left: 50%; top: 50%; width: clamp(64px, 9vw, 110px); aspect-ratio: 1; display: grid; place-items: center;
  transform: translate(-50%, -50%); border: 1px solid #fff; border-radius: 50%; color: #fff;
}
.gb__play svg { width: 38%; margin-left: 6%; }
.gb__vlabel { position: absolute; left: 1rem; bottom: 1rem; color: #fff; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }

.gb--quote { margin-block: clamp(4rem, 10vw, 10rem); display: grid; gap: 1.5rem; }
.gb--quote .display { max-width: 22ch; }

@media (max-width: 700px) {
  .gb--two { grid-template-columns: 1fr; }
  .gb--asymmetric .gb__fig--1, .gb--asymmetric .gb__fig--2, .gb--asymmetric .gb__fig--3 { grid-column: 1 / -1; margin-top: 0; }
  .gb--portrait .gb__fig--1, .gb--portrait .gb__fig--2 { grid-column: 1 / -1; margin-top: 0; }
  .gb--landscape .gb__frame { aspect-ratio: 4 / 3; }
}
</style>
