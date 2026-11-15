<script setup>
import ProjectGalleryBlock from './ProjectGalleryBlock.vue'
defineProps({ gallery: { type: Array, required: true } })
</script>

<template>
  <div class="gallery">
    <ProjectGalleryBlock v-for="(block, i) in gallery" :key="i" :block="block" />
  </div>
</template>
