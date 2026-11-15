<script setup>
import { mdiArrowRight } from '@mdi/js'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
</script>

<template>
  <div class="notfound container page-top">
    <p class="eyebrow">Error 404</p>
    <AnimatedText tag="h1" class="display display--xl" :lines="['This page', 'left the', '*campaign.*']" immediate />
    <p class="lead">The page you are looking for does not exist or has moved.</p>
    <MagneticLink to="/">
      <span class="btn">Back to home <v-icon class="arrow" :icon="mdiArrowRight" /></span>
    </MagneticLink>
  </div>
</template>

<style>
.notfound { display: grid; gap: 1.75rem; justify-items: start; padding-bottom: var(--section-space); min-height: 80svh; align-content: center; }
</style>
