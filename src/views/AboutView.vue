<script setup>
import { mdiArrowRight } from '@mdi/js'
import { site } from '@/config'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import MagneticLink from '@/components/ui/MagneticLink.vue'
import ContactCta from '@/components/home/ContactCta.vue'

const a = site.about
const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div>
    <header class="container about__hero page-top">
      <p class="eyebrow about__eyebrow">{{ site.name }} — {{ site.title }}</p>
      <AnimatedText tag="h1" class="display display--xl about__title" :lines="a.headline" immediate />
      <RevealOnScroll variant="mask" class="about__portrait">
        <img v-if="a.portrait" :src="a.portrait" :alt="site.name" />
        <div v-else class="portrait" role="img" aria-label="Portrait placeholder">
          <span class="portrait__initials">{{ site.initials }}</span>
          <span class="portrait__note">Portrait placeholder</span>
        </div>
      </RevealOnScroll>
    </header>

    <section class="container about__summary" aria-label="Summary">
      <RevealOnScroll tag="p" class="serif serif--lead">{{ a.summary }}</RevealOnScroll>
    </section>

    <section v-if="a.coreSkills.length" class="container section" aria-labelledby="skills-h">
      <h2 id="skills-h" class="eyebrow about__label">Core skills</h2>
      <ul class="skills">
        <RevealOnScroll v-for="(s, i) in a.coreSkills" :key="s" tag="li" class="display display--s" :delay="(i % 2) * 80">
          <span>{{ pad(i + 1) }}</span>{{ s }}
        </RevealOnScroll>
      </ul>
    </section>

    <div class="container about__facts">
      <section v-if="a.education.length" aria-labelledby="edu-h">
        <h2 id="edu-h" class="eyebrow about__label">Education</h2>
        <ul class="facts">
          <RevealOnScroll v-for="e in a.education" :key="e.degree" tag="li">
            <p class="facts__meta">{{ e.years }}</p>
            <p class="facts__title">{{ e.degree }}</p>
            <p class="facts__sub">{{ e.institution }}</p>
          </RevealOnScroll>
        </ul>
      </section>

      <section v-if="a.certificates.length" aria-labelledby="cert-h">
        <h2 id="cert-h" class="eyebrow about__label">Certificates</h2>
        <ul class="facts">
          <RevealOnScroll v-for="c in a.certificates" :key="c.title" tag="li">
            <p class="facts__title">{{ c.title }}</p>
            <p class="facts__sub">{{ c.issuer }}</p>
          </RevealOnScroll>
        </ul>
      </section>

      <section v-if="a.publications.length" aria-labelledby="pub-h">
        <h2 id="pub-h" class="eyebrow about__label">Publications</h2>
        <ul class="facts">
          <RevealOnScroll v-for="p in a.publications" :key="p.title" tag="li">
            <p class="facts__meta">{{ p.kind }}<template v-if="p.date"> · {{ p.date }}</template></p>
            <p class="facts__title">{{ p.title }}</p>
            <p v-if="p.publisher" class="facts__sub">{{ p.publisher }}</p>
          </RevealOnScroll>
        </ul>
      </section>

      <section v-if="a.tools.length || a.languages.length" aria-labelledby="tools-h">
        <h2 id="tools-h" class="eyebrow about__label">Tools &amp; languages</h2>
        <ul v-if="a.tools.length" class="tags">
          <li v-for="t in a.tools" :key="t">{{ t }}</li>
        </ul>
        <p v-if="a.languages.length" class="facts__sub about__langs">{{ a.languages.join(' · ') }}</p>
      </section>
    </div>

    <section class="container about__links">
      <MagneticLink to="/experience"><span class="btn">View experience <v-icon class="arrow" :icon="mdiArrowRight" /></span></MagneticLink>
      <MagneticLink to="/work"><span class="btn">See work <v-icon class="arrow" :icon="mdiArrowRight" /></span></MagneticLink>
    </section>

    <ContactCta />
  </div>
</template>

<style>
.about__hero { display: grid; gap: 1.25rem; padding-bottom: clamp(3rem, 7vw, 6rem); }
.about__title { position: relative; z-index: 2; color: #fff; mix-blend-mode: difference; }
.about__portrait { width: min(100%, 26rem); justify-self: end; aspect-ratio: 4 / 5; overflow: hidden; }
.about__portrait img { width: 100%; height: 100%; object-fit: cover; }
.portrait {
  position: relative; width: 100%; height: 100%; display: grid; place-items: center; color: #fff;
  background: radial-gradient(120% 80% at 25% 15%, var(--accent), transparent 62%), linear-gradient(165deg, #34312d, #151515);
}
.portrait__initials { font-family: var(--font-serif); font-style: italic; font-size: clamp(5rem, 14vw, 9rem); line-height: 1; }
.portrait__note { position: absolute; left: 1rem; bottom: 1rem; font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.8; }

.about__summary .serif { max-width: 34ch; }
.about__label { padding-bottom: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--line); }

.skills { display: grid; }
.skills li { display: flex; align-items: baseline; gap: 1rem; padding-block: 1.1rem; border-bottom: 1px solid var(--line); }
.skills li span { font-family: var(--font-serif); font-style: italic; font-size: 1rem; color: var(--accent); text-transform: none; min-width: 2rem; }

.about__facts { display: grid; gap: 3.5rem 6vw; padding-block: var(--section-space) 0; }
.facts { display: grid; gap: 1.5rem; }
.facts li { display: grid; gap: 0.15rem; }
.facts__meta { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted-text); }
.facts__title { font-size: 1.1rem; font-weight: 600; line-height: 1.3; }
.facts__sub { color: var(--muted-text); }
.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tags li { padding: 0.5rem 1rem; border: 1px solid var(--line); border-radius: 999px; font-size: 0.9rem; }
.about__langs { margin-top: 1.25rem; font-weight: 600; }

.about__links { display: flex; flex-wrap: wrap; gap: 1rem; padding-block: var(--section-space); }

@media (min-width: 700px) {
  .skills { grid-template-columns: 1fr 1fr; column-gap: 4vw; }
  .about__facts { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 900px) {
  .about__hero { grid-template-columns: 1fr 26rem; align-items: end; }
  .about__hero .about__eyebrow { grid-column: 1 / -1; }
  .about__hero .about__title { grid-column: 1 / -1; grid-row: 2; align-self: center; }
  .about__hero .about__portrait { grid-row: 2; grid-column: 2; margin-top: 4rem; }
}
</style>
