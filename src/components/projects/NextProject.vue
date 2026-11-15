<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <RouterLink :to="`/projects/${project.slug}`" class="next" data-cursor="view" data-cursor-label="Next">
    <div class="next__bg" aria-hidden="true">
      <img :src="project.image" alt="" loading="lazy" decoding="async" :style="{ objectPosition: project.imagePosition }" />
    </div>
    <div class="next__content container">
      <p class="eyebrow">Next project</p>
      <h2 class="display display--xl next__title"><span class="sr-only">Next project: </span>{{ project.title }}</h2>
      <p class="next__meta">{{ project.subtitle }}</p>
    </div>
  </RouterLink>
</template>

<style>
.next {
  position: relative; display: grid; align-items: end; min-height: 85vh; min-height: 85svh;
  padding-block: clamp(3rem, 7vw, 6rem); color: #fff; overflow: hidden; background: #111;
}
.next__bg { position: absolute; inset: 0; }
.next__bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.5); transition: scale 1.4s var(--ease-out), filter 0.8s ease; }
.next__content { position: relative; display: grid; gap: 1rem; transition: transform 0.9s var(--ease-out); }
.next__title { font-size: clamp(2.8rem, 10vw, 10rem); }
.next__meta { font-family: var(--font-serif); font-style: italic; font-size: clamp(1.2rem, 2vw, 1.8rem); opacity: 0.85; }
.next:hover .next__bg img, .next:focus-visible .next__bg img { scale: 1.07; filter: brightness(0.7); }
.next:hover .next__content, .next:focus-visible .next__content { transform: translate3d(0, -0.6rem, 0); }
</style>
