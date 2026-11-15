<script setup>
// Shared heading of the five capability sections: eyebrow, title, description + an outlined number.
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'

defineProps({ section: { type: Object, required: true } })
</script>

<template>
  <header class="cap-head container">
    <span class="cap-head__num" aria-hidden="true">{{ section.number }}</span>
    <p class="eyebrow">{{ section.eyebrow }}</p>
    <AnimatedText :id="`${section.id}-title`" tag="h2" class="display cap-head__title" :text="section.title" />
    <RevealOnScroll tag="p" class="lead cap-head__desc">{{ section.description }}</RevealOnScroll>
  </header>
</template>

<style>
.cap-head { position: relative; display: grid; gap: 1.25rem; padding-block: var(--section-space) clamp(2rem, 5vw, 4rem); }
.cap-head__title { font-size: clamp(2.4rem, 7vw, 7rem); max-width: 14ch; }
.cap-head__desc { max-width: 34rem; }
.cap-head__num {
  position: absolute; right: var(--gutter); top: calc(var(--section-space) * 0.55); z-index: 0; pointer-events: none; user-select: none;
  font-weight: 800; font-stretch: 82%; font-size: clamp(7rem, 22vw, 20rem); line-height: 0.8; letter-spacing: -0.04em;
  color: transparent; -webkit-text-stroke: 1.5px color-mix(in srgb, currentColor 22%, transparent);
}
.cap-head > :not(.cap-head__num) { position: relative; z-index: 1; }
</style>
