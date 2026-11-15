<script setup>
import { site } from '@/data/site'
import { projects } from '@/data/projects'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ContactCta from '@/components/home/ContactCta.vue'

const highlights = projects.slice(0, 3)
const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="page about">
    <header class="about__hero container page-top">
      <AnimatedText tag="h1" class="display display--xl about__title" :lines="site.about.headline" immediate />
      <RevealOnScroll variant="mask" class="about__portrait">
        <img v-if="site.about.portrait" :src="site.about.portrait" alt="Portrait" />
        <div v-else class="portrait" role="img" aria-label="Portrait placeholder">
          <span class="portrait__initials">{{ site.initials }}</span>
          <span class="portrait__note">Portrait placeholder</span>
        </div>
      </RevealOnScroll>
    </header>

    <section class="container about__intro" aria-label="Introduction">
      <RevealOnScroll tag="p" class="serif serif--lead about__lead">{{ site.about.intro }}</RevealOnScroll>
      <div class="about__body">
        <RevealOnScroll v-for="(t, i) in site.about.body" :key="i" tag="p" class="lead" :delay="i * 100">{{ t }}</RevealOnScroll>
      </div>
    </section>

    <section class="container section" aria-labelledby="philosophy-h">
      <h2 id="philosophy-h" class="eyebrow about__label">Creative philosophy</h2>
      <ol class="principles">
        <RevealOnScroll v-for="(p, i) in site.about.principles" :key="p.title" tag="li" class="principle" :delay="i * 120">
          <span class="principle__num">{{ pad(i + 1) }}</span>
          <h3 class="display display--s">{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </RevealOnScroll>
      </ol>
    </section>

    <section class="container about__skills" aria-labelledby="skills-h">
      <h2 id="skills-h" class="eyebrow about__label">Disciplines</h2>
      <ul class="skills">
        <RevealOnScroll v-for="(s, i) in site.about.disciplines" :key="s" tag="li" :delay="(i % 4) * 70">{{ s }}</RevealOnScroll>
      </ul>
    </section>

    <section class="container section" aria-labelledby="highlights-h">
      <div class="about__row">
        <h2 id="highlights-h" class="eyebrow about__label">Selected work</h2>
        <RouterLink to="/work" class="link-line eyebrow">See all work →</RouterLink>
      </div>
      <ul class="highlights">
        <ProjectCard v-for="p in highlights" :key="p.id" :project="p" uniform />
      </ul>
      <RevealOnScroll class="about__exp">
        <MagneticLink to="/experience" class="btn-wrap">
          <span class="btn">View experience <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></span>
        </MagneticLink>
      </RevealOnScroll>
    </section>

    <ContactCta />
  </div>
</template>

<style>
.about__hero { display: grid; gap: 2rem; padding-bottom: clamp(3rem, 7vw, 6rem); }
.about__title { position: relative; z-index: 2; color: #fff; mix-blend-mode: difference; }
.about__portrait { width: min(100%, 26rem); justify-self: end; aspect-ratio: 4 / 5; overflow: hidden; }
.about__portrait img { width: 100%; height: 100%; object-fit: cover; }
.portrait {
  position: relative; width: 100%; height: 100%; display: grid; place-items: center; color: #fff;
  background: radial-gradient(120% 80% at 25% 15%, var(--accent), transparent 62%), linear-gradient(165deg, #34312d, #151515);
}
.portrait__initials { font-family: var(--font-serif); font-style: italic; font-size: clamp(5rem, 14vw, 9rem); line-height: 1; }
.portrait__note { position: absolute; left: 1rem; bottom: 1rem; font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.8; }

.about__intro { display: grid; gap: 2rem; }
.about__lead { max-width: 30ch; }
.about__body { display: grid; gap: 1.25rem; max-width: 40rem; }
.about__label { padding-bottom: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--line); }

.principles { display: grid; gap: 2.5rem; }
.principle { display: grid; gap: 0.75rem; align-content: start; }
.principle__num { font-family: var(--font-serif); font-style: italic; font-size: 1.6rem; color: var(--accent); }
.principle p { color: var(--muted-text); max-width: 26rem; }

.about__skills { padding-bottom: 0; }
.skills { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.skills li { padding: 0.65rem 1.1rem; border: 1px solid var(--line); border-radius: 999px; font-size: 0.9rem; }

.about__row { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
.about__row .about__label { flex: 1; }
.highlights { display: grid; gap: 2.5rem 1.5rem; }
.about__exp { margin-top: clamp(2.5rem, 5vw, 4rem); }

@media (min-width: 900px) {
  .about__hero { grid-template-columns: 1fr 26rem; align-items: end; }
  .about__hero .about__title { grid-column: 1 / -1; grid-row: 1; align-self: center; }
  .about__hero .about__portrait { grid-row: 1; grid-column: 2; margin-top: 4rem; }
  .about__intro { grid-template-columns: 1.1fr 1fr; column-gap: 6vw; align-items: start; }
  .principles { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
  .highlights { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 600px) and (max-width: 899px) { .highlights { grid-template-columns: repeat(2, 1fr); } }
</style>
