<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { observe } from '@/composables/useInView'
import { prefersReducedMotion } from '@/composables/useMotion'

const props = defineProps({
  tag: { type: String, default: 'div' },
  variant: { type: String, default: 'up' }, // up | fade | mask
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const shown = ref(false)
let stop = () => {}

onMounted(() => {
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    shown.value = true
    return
  }
  stop = observe(
    el.value,
    (entry) => {
      if (!entry.isIntersecting) return
      shown.value = true
      stop()
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
})
onBeforeUnmount(() => stop())
</script>

<template>
  <component
    :is="tag"
    ref="el"
    class="reveal"
    :class="[`reveal--${variant}`, { 'is-in': shown }]"
    :style="{ '--delay': `${delay}ms` }"
  >
    <!-- The clip-path lives on an inner wrapper: the observed element is never clipped,
         otherwise the browser may consider it invisible and never fire the reveal. -->
    <div v-if="variant === 'mask'" class="reveal__clip"><slot /></div>
    <slot v-else />
  </component>
</template>
