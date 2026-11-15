<script setup>
import { site, contactItems } from '@/config'

function toTop() {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="site-footer container">
    <p class="meta">© {{ new Date().getFullYear() }} {{ site.name }}</p>
    <ul class="site-footer__links">
      <li v-for="c in contactItems" :key="c.label">
        <a :href="c.href" :target="c.external ? '_blank' : null" rel="noopener" class="link-line">{{ c.label }}</a>
      </li>
    </ul>
    <button class="site-footer__top link-line" @click="toTop">Back to top ↑</button>
  </footer>
</template>

<style>
.site-footer {
  display: flex; flex-wrap: wrap; gap: 1rem 2.5rem; align-items: center; justify-content: space-between;
  padding-block: 2rem; border-top: 1px solid var(--line); font-size: 0.8rem;
}
.site-footer__links { display: flex; gap: 1.75rem; }
.site-footer__top { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; min-height: 44px; }
</style>
