<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getProject, getNextProject, partId, site } from '@/config'
import { useParallax } from '@/composables/useParallax'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import ProjectSections from '@/components/projects/ProjectSections.vue'
import NextProject from '@/components/projects/NextProject.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
const next = computed(() => (project.value ? getNextProject(project.value.slug) : null))
const par = ref(null)
useParallax(par, 0.08)

// Two balanced lines for the headline.
const titleLines = computed(() => {
  const words = (project.value?.title ?? '').split(' ')
  if (words.length < 3) return words
  const half = Math.ceil(words.length / 2)
  return [words.slice(0, half).join(' '), words.slice(half).join(' ')]
})
const vars = computed(() => ({ '--p-bg': project.value?.theme.bg, '--p-fg': project.value?.theme.fg }))

watchEffect(() => {
  if (project.value) document.title = `${project.value.title} — ${site.name}`
})
</script>

<template>
  <NotFoundView v-if="!project" />
  <article v-else :style="vars">
    <header class="p-hero container page-top">
      <p class="eyebrow">{{ project.categories.join(' · ') }}</p>
      <AnimatedText tag="h1" class="display display--xl" :lines="titleLines" immediate />
      <p class="p-hero__sub">{{ project.subtitle }}</p>
    </header>

    <RevealOnScroll variant="mask" class="p-hero__img">
      <div ref="par" class="p-hero__par">
        <img :src="project.image" alt="" fetchpriority="high" decoding="async" :style="{ objectPosition: project.imagePosition }" />
      </div>
    </RevealOnScroll>

    <section v-if="project.meta.length" class="container p-section" aria-label="Project information">
      <dl class="meta-grid">
        <div v-for="m in project.meta" :key="m.label">
          <dt>{{ m.label }}</dt>
          <dd>{{ m.value }}</dd>
        </div>
      </dl>
    </section>

    <section v-if="project.stats.length" class="container p-section" aria-label="Results">
      <ul class="stats">
        <RevealOnScroll v-for="(s, i) in project.stats" :key="s.label" tag="li" class="stat" :delay="i * 100">
          <p class="display display--l stat__value">{{ s.value }}</p>
          <p class="stat__label">{{ s.label }}</p>
          <p class="meta">{{ s.detail }}</p>
        </RevealOnScroll>
      </ul>
    </section>

    <ProjectSections :sections="project.sections" />

    <section v-for="part in project.parts" :id="partId(part.label)" :key="part.title" class="p-part">
      <header class="container p-part__head">
        <p class="p-part__label">{{ part.label }}</p>
        <AnimatedText tag="h2" class="display display--m" :text="part.title" />
      </header>
      <ProjectSections :sections="part.sections" />
    </section>

    <div class="p-end" />
    <NextProject :project="next" />
  </article>
</template>

<style>
.p-hero { display: grid; gap: 1.25rem; padding-bottom: clamp(2rem, 5vw, 4rem); background: var(--p-bg); color: var(--p-fg); }
.p-hero__sub { font-family: var(--font-serif); font-style: italic; font-size: clamp(1.3rem, 2.4vw, 2.2rem); line-height: 1.15; max-width: 32ch; }
.p-hero__img { height: clamp(320px, 70vh, 820px); overflow: hidden; }
.p-hero__par { position: absolute; inset: -8% 0; will-change: transform; }
.p-hero__par img { width: 100%; height: 100%; object-fit: cover; }

.meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.75rem 1.5rem; padding-block: 1.75rem; border-block: 1px solid var(--line); }
.meta-grid dt { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted-text); margin-bottom: 0.4rem; }
.meta-grid dd { font-weight: 500; line-height: 1.4; }

.stats { display: grid; gap: 1.5rem; }
.stat { display: grid; gap: 0.25rem; padding: 1.5rem 0; border-top: 1px solid var(--line); }
.stat__value { color: var(--accent); line-height: 1; padding-bottom: 0.12em; }
.stat__label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
@media (min-width: 700px) { .stats { grid-template-columns: repeat(3, 1fr); gap: 2rem; } .meta-grid { grid-template-columns: repeat(4, 1fr); } }

/* Numbered chapters */
.p-part { margin-top: var(--section-space); padding-top: clamp(2rem, 5vw, 4rem); border-top: 1px solid var(--line); }
.p-part__head { display: grid; gap: 1rem; padding-bottom: 0.5rem; }
.p-part__label { font-family: var(--font-serif); font-style: italic; font-size: 1.8rem; color: var(--accent); }
.p-part .display { max-width: 18ch; }
.p-end { height: var(--section-space); }
</style>
