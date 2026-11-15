<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/config'

defineProps({ menuOpen: Boolean })
defineEmits(['toggle'])

const route = useRoute()
const here = computed(() => route.meta.label || '')
const ready = ref(false)
const btn = ref(null)

onMounted(() => requestAnimationFrame(() => (ready.value = true)))
defineExpose({ focus: () => btn.value?.focus() })
</script>

<template>
  <header class="site-header" :class="{ 'is-ready': ready }">
    <RouterLink to="/" class="brand" style="--i: 0" aria-label="Home">
      <span class="brand__name">{{ site.name }}</span>
      <span class="brand__role">{{ site.descriptor }}</span>
    </RouterLink>

    <p class="site-header__here" style="--i: 1" aria-hidden="true">
      <span v-if="here">( {{ here }} )</span>
    </p>

    <button
      ref="btn"
      class="menu-toggle"
      style="--i: 2"
      :aria-expanded="menuOpen"
      aria-controls="site-menu"
      data-cursor="link"
      @click="$emit('toggle')"
    >
      <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
      <span class="menu-toggle__label" aria-hidden="true">
        <span :class="{ 'is-up': menuOpen }">Menu</span>
        <span :class="{ 'is-up': menuOpen }">Close</span>
      </span>
      <span class="menu-toggle__icon" :class="{ 'is-open': menuOpen }" aria-hidden="true"><i /><i /></span>
    </button>
  </header>
</template>

<style>
.site-header {
  position: fixed; inset: 0 0 auto 0; z-index: 200; height: var(--header-h);
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  padding-inline: var(--gutter);
  color: #fff; mix-blend-mode: difference; pointer-events: none;
}
.site-header > * {
  pointer-events: auto; opacity: 0; transform: translate3d(0, -14px, 0);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
  transition-delay: calc(0.45s + var(--i) * 0.12s);
}
.site-header.is-ready > * { opacity: 1; transform: none; }

.brand { display: grid; line-height: 1.1; justify-self: start; }
.brand__name { font-weight: 800; font-stretch: 85%; text-transform: uppercase; letter-spacing: 0.04em; font-size: 1rem; }
.brand__role { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; }

.site-header__here { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; justify-self: center; }

.menu-toggle {
  justify-self: end; display: inline-flex; align-items: center; gap: 0.9rem;
  min-height: 44px; padding: 0 0.25rem;
}
.menu-toggle__label {
  display: grid; height: 1.1em; overflow: hidden; text-align: right;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; line-height: 1.1;
}
.menu-toggle__label > span { transition: transform 0.6s var(--ease-io); }
.menu-toggle__label > .is-up { transform: translate3d(0, -100%, 0); }
.menu-toggle__icon { position: relative; width: 28px; height: 12px; }
.menu-toggle__icon i {
  position: absolute; left: 0; width: 100%; height: 2px; background: currentColor;
  transition: transform 0.6s var(--ease-io), top 0.6s var(--ease-io);
}
.menu-toggle__icon i:first-child { top: 0; }
.menu-toggle__icon i:last-child { top: 10px; }
.menu-toggle__icon.is-open i:first-child { top: 5px; transform: rotate(45deg); }
.menu-toggle__icon.is-open i:last-child { top: 5px; transform: rotate(-45deg); }

@media (max-width: 640px) {
  .site-header { grid-template-columns: 1fr auto; }
  .site-header__here, .brand__role { display: none; }
}
</style>
