<script setup>
import { computed } from 'vue'
import { projects } from '@/config'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'

const props = defineProps({
  project: { type: Object, required: true },
  uniform: { type: Boolean, default: false }, // equal-size cards (e.g. About highlights)
})

// Shape is tied to the project (not its position in the filtered list) so cards keep their size when filtering.
const SHAPES = ['s7', 's5', 's4', 's4', 's4', 's5']
const shape = computed(() => (props.uniform ? 'u' : SHAPES[projects.indexOf(props.project) % SHAPES.length]))
</script>

<template>
  <li class="card" :class="`card--${shape}`">
    <RouterLink :to="`/projects/${project.slug}`" class="card__link" data-cursor="view">
      <RevealOnScroll variant="mask" class="card__media">
        <img :src="project.image" alt="" loading="lazy" decoding="async" :style="{ objectPosition: project.imagePosition }" />
      </RevealOnScroll>
      <div class="card__meta">
        <h3 class="card__title">{{ project.title }}</h3>
        <p v-if="project.year" class="card__year">{{ project.year }}</p>
        <p class="card__cats">{{ project.categories.join(' / ') }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style>
.card__link { display: block; }
.card__media { overflow: hidden; aspect-ratio: 4 / 5; background: color-mix(in srgb, var(--ink) 8%, transparent); }
.card--s7 .card__media { aspect-ratio: 16 / 11; }
.card--s4 .card__media { aspect-ratio: 1; }
.card--u .card__media { aspect-ratio: 4 / 5; }
.card__media img { width: 100%; height: 100%; object-fit: cover; transition: scale 1.2s var(--ease-out); }
@media (hover: hover) { .card__link:hover img { scale: 1.06; } }
.card__meta { display: grid; grid-template-columns: 1fr auto; gap: 0.15rem 1rem; padding-top: 0.9rem; }
.card__title { font-size: clamp(1.15rem, 1.7vw, 1.55rem); font-weight: 700; letter-spacing: -0.01em; line-height: 1.15; }
.card__year { font-size: 0.8rem; font-variant-numeric: tabular-nums; color: var(--muted-text); }
.card__cats { grid-column: 1 / -1; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-text); }
.card__link:hover .card__title { text-decoration: underline; text-underline-offset: 0.2em; text-decoration-thickness: 1px; }
</style>
