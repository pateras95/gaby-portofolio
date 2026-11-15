<script setup>
import { site } from '@/data/site'

function toTop() {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="site-footer container">
    <p class="meta">© {{ site.year }} {{ site.name }} — demo content</p>
    <ul class="site-footer__links">
      <li v-for="s in site.socials" :key="s.label">
        <a :href="s.href" target="_blank" rel="noopener" class="link-line">{{ s.label }}</a>
      </li>
      <li><a :href="`mailto:${site.email}`" class="link-line">Email</a></li>
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
