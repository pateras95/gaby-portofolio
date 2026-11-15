<script setup>
defineProps({ modelValue: { type: String, required: true }, options: { type: Array, required: true }, counts: { type: Object, default: () => ({}) } })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="filters" role="group" aria-label="Filter projects by category">
    <button
      v-for="o in options"
      :key="o"
      type="button"
      class="filters__btn"
      :class="{ 'is-active': modelValue === o }"
      :aria-pressed="modelValue === o"
      @click="$emit('update:modelValue', o)"
    >
      {{ o }}<sup v-if="counts[o] !== undefined">{{ counts[o] }}</sup>
    </button>
  </div>
</template>

<style>
.filters { display: flex; flex-wrap: wrap; gap: 0.25rem 1.75rem; }
.filters__btn {
  position: relative; min-height: 44px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted-text); transition: color 0.3s ease;
}
.filters__btn sup { font-size: 0.6rem; margin-left: 0.25em; }
.filters__btn::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0.45rem; height: 2px; background: var(--accent);
  transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease-out);
}
.filters__btn:hover, .filters__btn.is-active { color: var(--ink); }
.filters__btn.is-active::after { transform: scaleX(1); }
</style>
