<script setup>
// Line-by-line headline reveal. Use "\n" in `text` or pass `lines`.
// Wrap a word in *asterisks* to render it as a serif italic accent.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { observe } from '@/composables/useInView'
import { prefersReducedMotion } from '@/composables/useMotion'

const props = defineProps({
  tag: { type: String, default: 'h2' },
  text: { type: String, default: '' },
  lines: { type: Array, default: null },
  immediate: { type: Boolean, default: false }, // animate on mount (hero)
  delay: { type: Number, default: 0 },
})

const rows = computed(() =>
  (props.lines ?? props.text.split('\n')).map((line) =>
    line
      .split(/(\*[^*]+\*)/)
      .filter(Boolean)
      .map((part) => (part.startsWith('*') ? { t: part.slice(1, -1), em: true } : { t: part, em: false })),
  ),
)
const plain = computed(() => rows.value.map((r) => r.map((p) => p.t).join('')).join(' '))

const el = ref(null)
const shown = ref(false)
let stop = () => {}

onMounted(() => {
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    shown.value = true
  } else if (props.immediate) {
    requestAnimationFrame(() => requestAnimationFrame(() => (shown.value = true)))
  } else {
    stop = observe(
      el.value,
      (e) => {
        if (!e.isIntersecting) return
        shown.value = true
        stop()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
  }
})
onBeforeUnmount(() => stop())
</script>

<template>
  <component :is="tag" ref="el" class="anim-text" :class="{ 'is-in': shown }" :style="{ '--delay': `${delay}ms` }">
    <span class="sr-only">{{ plain }}</span>
    <span v-for="(row, i) in rows" :key="i" class="anim-text__line" aria-hidden="true">
      <span class="anim-text__inner" :style="{ '--i': i }"
        ><template v-for="(p, j) in row" :key="j"><em v-if="p.em">{{ p.t }}</em
        ><template v-else>{{ p.t }}</template></template></span
      >
    </span>
  </component>
</template>
