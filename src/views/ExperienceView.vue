<script setup>
import { experience, capabilities } from '@/data/experience'
import { site } from '@/data/site'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import ContactCta from '@/components/home/ContactCta.vue'

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="page exp">
    <header class="container page-top exp__head">
      <AnimatedText tag="h1" class="display display--xl" :lines="['A career,', 'framed in', '*chapters.*']" immediate />
      <RevealOnScroll tag="p" class="lead">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder timeline — fictional roles and companies, to be replaced with real experience.
      </RevealOnScroll>
    </header>

    <section class="container section exp__timeline" aria-labelledby="timeline-h">
      <h2 id="timeline-h" class="eyebrow exp__label">Professional experience</h2>
      <ol>
        <RevealOnScroll v-for="(job, i) in experience" :key="job.role" tag="li" class="job">
          <p class="job__years"><span class="job__num">{{ pad(i + 1) }}</span>{{ job.years }}</p>
          <div class="job__main">
            <h3 class="display display--s">{{ job.role }}</h3>
            <p class="serif serif--lead job__company">{{ job.company }} <span class="meta">(demo)</span></p>
            <p class="job__summary">{{ job.summary }}</p>
            <ul class="job__list">
              <li v-for="r in job.responsibilities" :key="r">{{ r }}</li>
            </ul>
            <ul class="job__tags" aria-label="Disciplines">
              <li v-for="d in job.disciplines" :key="d">{{ d }}</li>
            </ul>
          </div>
        </RevealOnScroll>
      </ol>
    </section>

    <section class="container exp__caps" aria-labelledby="caps-h">
      <h2 id="caps-h" class="eyebrow exp__label">Key disciplines</h2>
      <ul class="caps">
        <RevealOnScroll v-for="(c, i) in capabilities" :key="c" tag="li" class="display display--s" :delay="(i % 2) * 80">
          <span>{{ pad(i + 1) }}</span>{{ c }}
        </RevealOnScroll>
      </ul>
    </section>

    <section class="container section" aria-labelledby="cv-h">
      <RevealOnScroll class="cv">
        <div>
          <h2 id="cv-h" class="display display--m">Curriculum <em>vitae</em></h2>
          <p class="meta cv__hint">{{ site.cv.href ? 'PDF — ready to download.' : 'Coming soon — add a PDF and set it in src/data/site.js.' }}</p>
        </div>
        <a v-if="site.cv.href" :href="site.cv.href" class="btn" download>{{ site.cv.label }}</a>
        <button v-else type="button" class="btn" disabled aria-disabled="true">{{ site.cv.label }}</button>
      </RevealOnScroll>
    </section>

    <ContactCta />
  </div>
</template>

<style>
.exp__head { display: grid; gap: 2rem; padding-bottom: clamp(2rem, 5vw, 4rem); }
.exp__label { padding-bottom: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--line); }

.job { display: grid; gap: 1rem; padding-block: clamp(2rem, 4vw, 3.5rem); border-bottom: 1px solid var(--line); }
.job__years { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; display: flex; gap: 1rem; align-items: baseline; }
.job__num { font-family: var(--font-serif); font-style: italic; font-size: 1.6rem; color: var(--accent); letter-spacing: 0; }
.job__main { display: grid; gap: 0.9rem; max-width: 46rem; }
.job__summary { color: var(--muted-text); }
.job__list { display: grid; gap: 0.35rem; font-size: 0.95rem; }
.job__list li { padding-left: 1.2rem; position: relative; }
.job__list li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 0.5rem; height: 1px; background: currentColor; }
.job__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
.job__tags li { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.4rem 0.8rem; border: 1px solid var(--line); border-radius: 999px; }
@media (min-width: 900px) {
  .job { grid-template-columns: 1fr 2fr; column-gap: 6vw; }
  .job__years { position: sticky; top: calc(var(--header-h) + 1rem); align-self: start; }
}

.exp__caps { padding-bottom: 0; }
.caps { display: grid; grid-template-columns: 1fr; }
.caps li { display: flex; align-items: baseline; gap: 1rem; padding-block: 1.1rem; border-bottom: 1px solid var(--line); }
.caps li span { font-family: var(--font-serif); font-style: italic; font-size: 1rem; color: var(--accent); text-transform: none; min-width: 2rem; }
@media (min-width: 700px) { .caps { grid-template-columns: 1fr 1fr; column-gap: 4vw; } }

.cv { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem 3rem; padding: clamp(1.5rem, 4vw, 3rem); border: 1px solid var(--line); }
.cv__hint { margin-top: 0.75rem; }
</style>
