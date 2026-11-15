<script setup>
import { site } from '@/data/site'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
</script>

<template>
  <div class="page contact">
    <header class="container page-top contact__head">
      <AnimatedText tag="h1" class="display display--xl" :lines="site.contact.headline" immediate />
      <RevealOnScroll tag="p" class="lead">{{ site.contact.availability }}</RevealOnScroll>
    </header>

    <section class="container contact__links" aria-label="Contact details">
      <RevealOnScroll class="contact__mail-wrap">
        <p class="eyebrow">Email</p>
        <MagneticLink :href="`mailto:${site.email}`" :strength="0.15" class="contact__mail">
          <span class="contact__mail-text">{{ site.email }}</span>
          <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
        </MagneticLink>
      </RevealOnScroll>

      <ul class="contact__list">
        <RevealOnScroll v-for="(s, i) in site.socials" :key="s.label" tag="li" :delay="i * 100">
          <a :href="s.href" target="_blank" rel="noopener" class="contact__row">
            <span class="eyebrow">{{ s.label }}</span>
            <span class="contact__handle">{{ s.handle }}</span>
            <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
          </a>
        </RevealOnScroll>
        <RevealOnScroll tag="li" :delay="200">
          <div class="contact__row contact__row--static">
            <span class="eyebrow">Based in</span>
            <span class="contact__handle">{{ site.location }}</span>
          </div>
        </RevealOnScroll>
      </ul>
    </section>
  </div>
</template>

<style>
.contact__head { display: grid; gap: 2rem; padding-bottom: clamp(3rem, 7vw, 6rem); }
.contact__links { display: grid; gap: clamp(2.5rem, 6vw, 5rem); padding-bottom: var(--section-space); }
.contact__mail-wrap { display: grid; gap: 1rem; }
.contact__mail .magnetic__inner {
  font-size: clamp(1.6rem, 6vw, 5.5rem); font-weight: 700; font-stretch: 85%; letter-spacing: -0.03em;
  border-bottom: 3px solid currentColor; padding-bottom: 0.2rem; word-break: break-word; transition: color 0.3s ease;
}
.contact__mail .magnetic__inner:hover, .contact__mail .magnetic__inner:focus-visible { color: var(--accent); }
.contact__list { border-top: 1px solid var(--line); }
.contact__row {
  display: grid; grid-template-columns: 8rem 1fr auto; align-items: center; gap: 1rem; min-height: 4.5rem;
  border-bottom: 1px solid var(--line); transition: padding 0.5s var(--ease-out), color 0.3s ease;
}
a.contact__row:hover, a.contact__row:focus-visible { padding-inline: 1rem; color: var(--accent); }
.contact__row--static { grid-template-columns: 8rem 1fr; }
.contact__handle { font-size: clamp(1.1rem, 2.4vw, 1.8rem); font-weight: 500; }
@media (max-width: 520px) { .contact__row, .contact__row--static { grid-template-columns: 1fr auto; } .contact__row .eyebrow { grid-column: 1 / -1; padding-top: 0.75rem; } .contact__row--static { grid-template-columns: 1fr; } }
</style>
