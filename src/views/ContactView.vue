<script setup>
import { mdiArrowRight, mdiArrowTopRight } from '@mdi/js'
import { site, contactDetails } from '@/config'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'

const [primary, ...others] = contactDetails
</script>

<template>
  <div>
    <header class="container page-top contact__head">
      <AnimatedText tag="h1" class="display display--xl" :lines="site.contactPage.headline" immediate />
      <RevealOnScroll tag="p" class="lead">{{ site.contactPage.availability }}</RevealOnScroll>
    </header>

    <section class="container contact__links" aria-label="Contact details">
      <RevealOnScroll v-if="primary" class="contact__primary">
        <p class="eyebrow">{{ primary.label }}</p>
        <MagneticLink :href="primary.href" :strength="0.15" class="contact__main">
          <span>{{ primary.text }}</span>
          <v-icon class="arrow" :icon="mdiArrowRight" />
        </MagneticLink>
      </RevealOnScroll>

      <ul v-if="others.length || site.location" class="contact__list">
        <RevealOnScroll v-for="(c, i) in others" :key="c.label" tag="li" :delay="i * 100">
          <a :href="c.href" :target="c.external ? '_blank' : null" rel="noopener" class="contact__row">
            <span class="eyebrow">{{ c.label }}</span>
            <span class="contact__text">{{ c.text }}</span>
            <v-icon class="arrow" :icon="mdiArrowTopRight" />
          </a>
        </RevealOnScroll>
        <RevealOnScroll v-if="site.location" tag="li" :delay="200">
          <div class="contact__row contact__row--static">
            <span class="eyebrow">Based in</span>
            <span class="contact__text">{{ site.location }}</span>
          </div>
        </RevealOnScroll>
      </ul>
    </section>
  </div>
</template>

<style>
.contact__head { display: grid; gap: 2rem; padding-bottom: clamp(3rem, 7vw, 6rem); }
.contact__links { display: grid; gap: clamp(2.5rem, 6vw, 5rem); padding-bottom: var(--section-space); }
.contact__primary { display: grid; gap: 1rem; }
.contact__main .magnetic__inner {
  font-size: clamp(1.4rem, 5.2vw, 4.8rem); font-weight: 700; font-stretch: 85%; letter-spacing: -0.03em;
  border-bottom: 3px solid currentColor; padding-bottom: 0.2rem; word-break: break-word; transition: color 0.3s ease;
}
.contact__main .magnetic__inner:hover, .contact__main .magnetic__inner:focus-visible { color: var(--accent); }
.contact__list { border-top: 1px solid var(--line); }
.contact__row {
  display: grid; grid-template-columns: 8rem 1fr auto; align-items: center; gap: 1rem; min-height: 4.5rem;
  border-bottom: 1px solid var(--line); transition: padding 0.5s var(--ease-out), color 0.3s ease;
}
a.contact__row:hover, a.contact__row:focus-visible { padding-inline: 1rem; color: var(--accent); }
.contact__row--static { grid-template-columns: 8rem 1fr; }
.contact__text { font-size: clamp(1.1rem, 2.4vw, 1.8rem); font-weight: 500; word-break: break-word; }
@media (max-width: 520px) {
  .contact__row { grid-template-columns: 1fr auto; }
  .contact__row .eyebrow { grid-column: 1 / -1; padding-top: 0.75rem; }
  .contact__row--static { grid-template-columns: 1fr; }
}
</style>
