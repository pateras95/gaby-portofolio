<script setup>
import { ref, computed } from 'vue'
import { projects, categories } from '@/config'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import WorkFilters from '@/components/projects/WorkFilters.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const active = ref('All Work')
const list = computed(() => (active.value === 'All Work' ? projects : projects.filter((p) => p.categories.includes(active.value))))
const counts = computed(() =>
  Object.fromEntries(categories.map((c) => [c, c === 'All Work' ? projects.length : projects.filter((p) => p.categories.includes(c)).length])),
)

// Pin leaving cards in place so the rest can glide to their new positions.
function beforeLeave(el) {
  el.style.width = `${el.offsetWidth}px`
  el.style.height = `${el.offsetHeight}px`
  el.style.left = `${el.offsetLeft}px`
  el.style.top = `${el.offsetTop}px`
}
</script>

<template>
  <div class="page work container page-top">
    <header class="work__head">
      <AnimatedText tag="h1" class="display display--xl" :lines="['The', '*archive.*']" immediate />
      <RevealOnScroll tag="p" class="lead work__intro">
        Social media strategy, campaigns, events and editorial work — filter by category.
      </RevealOnScroll>
    </header>

    <div class="work__bar">
      <WorkFilters v-model="active" :options="categories" :counts="counts" />
      <p class="meta" aria-live="polite">{{ list.length }} {{ list.length === 1 ? 'project' : 'projects' }}</p>
    </div>

    <TransitionGroup tag="ul" name="work" class="work-grid" @before-leave="beforeLeave">
      <ProjectCard v-for="p in list" :key="p.slug" :project="p" />
    </TransitionGroup>
  </div>
</template>

<style>
.work__head { display: grid; gap: 2rem; padding-bottom: clamp(2rem, 5vw, 4rem); }
.work__intro { max-width: 32rem; }
.work__bar {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 2rem;
  padding-block: 0.5rem; border-block: 1px solid var(--line); margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.work-grid { position: relative; display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem); padding-bottom: var(--section-space); grid-auto-flow: dense; align-items: start; }
.card--s7 { grid-column: span 7; }
.card--s5 { grid-column: span 5; }
.card--s4 { grid-column: span 4; }
@media (max-width: 1023px) {
  .card--s7, .card--s5, .card--s4 { grid-column: span 6; }
}
@media (max-width: 599px) {
  .card--s7, .card--s5, .card--s4 { grid-column: 1 / -1; }
}

.work-move { transition: transform 0.75s var(--ease-io); }
.work-enter-active { transition: opacity 0.6s ease 0.2s, transform 0.7s var(--ease-out) 0.2s; }
.work-leave-active { position: absolute; transition: opacity 0.35s ease, transform 0.35s ease; z-index: 0; }
.work-enter-from, .work-leave-to { opacity: 0; transform: translate3d(0, 24px, 0) scale(0.98); }
</style>
