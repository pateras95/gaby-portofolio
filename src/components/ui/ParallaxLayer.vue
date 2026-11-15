<script setup>
// Wraps decorative content in a gently scrolling layer (see useParallax).
import { ref } from 'vue'
import { useParallax } from '@/composables/useParallax'

const props = defineProps({ speed: { type: Number, default: 0.1 } })
const el = ref(null)
useParallax(el, props.speed)
</script>

<template>
  <div ref="el" class="parallax-layer"><slot /></div>
</template>

<style>
.parallax-layer { will-change: transform; }
</style>
