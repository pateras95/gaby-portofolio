<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <dl class="meta-grid">
    <div><dt>Client</dt><dd>{{ project.client }} <span class="meta">(demo)</span></dd></div>
    <div><dt>Year</dt><dd>{{ project.year }}</dd></div>
    <div><dt>Industry</dt><dd>{{ project.industry }}</dd></div>
    <div><dt>Project type</dt><dd>{{ project.type }}</dd></div>
    <div><dt>My role</dt><dd>{{ project.role }}</dd></div>
    <div>
      <dt>Deliverables</dt>
      <dd><ul><li v-for="d in project.deliverables" :key="d">{{ d }}</li></ul></dd>
    </div>
  </dl>
</template>

<style>
.meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; padding-block: 2rem; border-block: 1px solid var(--line); }
.meta-grid dt { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted-text); margin-bottom: 0.4rem; }
.meta-grid dd { font-size: 1rem; font-weight: 500; line-height: 1.4; }
@media (min-width: 900px) { .meta-grid { grid-template-columns: repeat(6, 1fr); } }
</style>
