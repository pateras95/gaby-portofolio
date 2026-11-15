<script setup>
import AnimatedText from '@/components/ui/AnimatedText.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
</script>

<template>
  <div class="page notfound container page-top">
    <p class="eyebrow">Error 404</p>
    <AnimatedText tag="h1" class="display display--xl" :lines="['This page', 'left the', '*campaign.*']" immediate />
    <p class="lead">The page you are looking for does not exist or has moved.</p>
    <MagneticLink to="/" class="btn-wrap">
      <span class="btn">Back to home <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></span>
    </MagneticLink>
  </div>
</template>

<style>
.notfound { display: grid; gap: 1.75rem; justify-items: start; padding-bottom: var(--section-space); min-height: 80svh; align-content: center; }
</style>
