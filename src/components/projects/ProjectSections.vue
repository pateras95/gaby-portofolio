<script setup>
// Renders a list of sections: { title, body: [...], links: [...] } (see config/projects.config.js).
// Text sections use two columns; sections with links show the work embedded in a row.
import EmbedRail from './EmbedRail.vue'

defineProps({ sections: { type: Array, required: true } })
</script>

<template>
  <template v-for="s in sections" :key="s.title">
    <section class="container p-section p-two">
      <h3 class="p-label">{{ s.title }}</h3>
      <div v-if="s.body.length" class="p-copy">
        <template v-for="(block, i) in s.body" :key="i">
          <ul v-if="Array.isArray(block)" class="p-list">
            <li v-for="(item, j) in block" :key="j">
              <template v-if="item.lead"><strong>{{ item.lead }}:</strong> {{ item.text }}</template>
              <template v-else>{{ item }}</template>
            </li>
          </ul>
          <p v-else class="p-text">{{ block }}</p>
        </template>
      </div>
    </section>
    <EmbedRail v-if="s.links.length" :links="s.links" :label="s.title" />
  </template>
</template>

<style>
.p-section { padding-block: clamp(1.75rem, 4vw, 3.5rem) 0; }
.p-two { display: grid; gap: 1.25rem; }
.p-label { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.p-copy { display: grid; gap: 1.25rem; max-width: 46rem; align-content: start; }
.p-text { font-size: clamp(1.05rem, 1.3vw, 1.2rem); line-height: 1.6; }
.p-list { display: grid; gap: 0.6rem; }
.p-list li { position: relative; padding-left: 1.4rem; line-height: 1.5; }
.p-list li::before { content: ''; position: absolute; left: 0; top: 0.8em; width: 0.6rem; height: 1px; background: var(--accent); }

@media (min-width: 900px) { .p-two { grid-template-columns: 1fr 2fr; column-gap: 6vw; } }
</style>
