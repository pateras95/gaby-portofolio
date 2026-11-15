<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getProject, getNextProject } from '@/data/projects'
import { site } from '@/data/site'
import { useParallax } from '@/composables/useParallax'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import ProjectMetadata from '@/components/projects/ProjectMetadata.vue'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import NextProject from '@/components/projects/NextProject.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
const next = computed(() => (project.value ? getNextProject(project.value.slug) : null))
const par = ref(null)
useParallax(par, 0.08)

const titleLines = computed(() => {
  const words = (project.value?.title ?? '').split(' ')
  if (words.length < 3) return words
  const half = Math.ceil(words.length / 2)
  return [words.slice(0, half).join(' '), words.slice(half).join(' ')]
})
const vars = computed(() =>
  project.value ? { '--p-bg': project.value.theme.bg, '--p-fg': project.value.theme.fg, '--p-accent': project.value.theme.accent } : {},
)

watchEffect(() => {
  if (project.value) document.title = `${project.value.title} — ${site.name}`
})
</script>

<template>
  <NotFoundView v-if="!project" />
  <article v-else class="page project" :style="vars">
    <header class="p-hero container page-top">
      <p class="eyebrow">{{ project.type }} <span class="p-hero__sep">/</span> {{ project.categories.join(' · ') }}</p>
      <AnimatedText tag="h1" class="display display--xl" :lines="titleLines" immediate />
      <p class="p-hero__client">{{ project.client }} <span class="meta">— demo client</span></p>
    </header>

    <RevealOnScroll variant="mask" class="p-hero__img">
      <div ref="par" class="p-hero__par">
        <img :src="project.heroImage" :alt="`${project.title} — hero visual (demo)`" fetchpriority="high" decoding="async" :style="{ objectPosition: project.heroPosition }" />
      </div>
    </RevealOnScroll>

    <section class="container p-section" aria-label="Project information">
      <ProjectMetadata :project="project" />
    </section>

    <section class="container p-section p-two" aria-labelledby="about-h">
      <h2 id="about-h" class="p-label">About the project</h2>
      <div class="p-copy">
        <RevealOnScroll v-for="(para, i) in project.about" :key="i" tag="p" class="lead" :delay="i * 100">{{ para }}</RevealOnScroll>
      </div>
    </section>

    <section class="container p-section p-two" aria-labelledby="challenge-h">
      <h2 id="challenge-h" class="p-label">The challenge</h2>
      <RevealOnScroll tag="p" class="serif serif--lead p-copy">{{ project.challenge }}</RevealOnScroll>
    </section>

    <section class="p-idea" aria-labelledby="idea-h">
      <div class="container p-idea__inner">
        <h2 id="idea-h" class="p-label">Strategy / The big idea</h2>
        <AnimatedText tag="p" class="display display--l" :text="project.strategy.idea" />
        <RevealOnScroll tag="p" class="lead p-idea__text">{{ project.strategy.text }}</RevealOnScroll>
      </div>
    </section>

    <section aria-label="Project gallery" class="p-gallery">
      <ProjectGallery :gallery="project.gallery" />
    </section>

    <section class="container p-section p-two" aria-labelledby="outcome-h">
      <h2 id="outcome-h" class="p-label">Outcome</h2>
      <div class="p-copy">
        <RevealOnScroll v-for="(para, i) in project.outcome" :key="i" tag="p" class="lead" :delay="i * 100">{{ para }}</RevealOnScroll>
      </div>
    </section>

    <NextProject :project="next" />
  </article>
</template>

<style>
.p-hero { display: grid; gap: 1.25rem; padding-bottom: clamp(2rem, 5vw, 4rem); }
.p-hero__sep { opacity: 0.4; margin-inline: 0.4em; }
.p-hero__client { font-family: var(--font-serif); font-style: italic; font-size: clamp(1.3rem, 2.2vw, 2rem); }
.p-hero__img { position: relative; height: clamp(320px, 75vh, 900px); overflow: hidden; }
.p-hero__par { position: absolute; inset: -8% 0; will-change: transform; }
.p-hero__par img { width: 100%; height: 100%; object-fit: cover; }

.p-section { padding-block: clamp(2.5rem, 6vw, 5rem) 0; }
.p-two { display: grid; gap: 1.5rem; }
.p-label { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.p-copy { display: grid; gap: 1.5rem; max-width: 46rem; }
@media (min-width: 900px) { .p-two { grid-template-columns: 1fr 2fr; column-gap: 6vw; } }

.p-idea { margin-top: var(--section-space); background: var(--p-bg); color: var(--p-fg); padding-block: var(--section-space); }
.p-idea__inner { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }
.p-idea .display { max-width: 16ch; }
.p-idea__text { max-width: 40rem; opacity: 0.85; }
.p-idea :focus-visible { outline-color: var(--p-accent); }

.p-gallery { padding-top: var(--section-space); }
.project .p-two:last-of-type { padding-bottom: var(--section-space); }
</style>
