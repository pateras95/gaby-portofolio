<script setup>
import { site, getProject } from '@/config'
import AnimatedText from '@/components/ui/AnimatedText.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import ContactCta from '@/components/home/ContactCta.vue'

const e = site.experience
const groups = [
  { id: 'jobs', title: 'Professional experience', items: e.jobs },
  { id: 'independent', title: 'Volunteer & independent projects', items: e.independent },
].filter((g) => g.items.length)
const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div>
    <header class="container page-top exp__head">
      <AnimatedText tag="h1" class="display display--xl" :lines="e.headline" immediate />
    </header>

    <section v-for="g in groups" :key="g.id" class="container section exp__group" :aria-labelledby="`${g.id}-h`">
      <h2 :id="`${g.id}-h`" class="eyebrow exp__label">{{ g.title }}</h2>
      <ol>
        <RevealOnScroll v-for="(job, i) in g.items" :key="job.company + job.period" tag="li" class="job">
          <p class="job__years">
            <span class="job__num">{{ pad(i + 1) }}</span>
            <span>{{ job.period }}<small v-if="job.note">{{ job.note }}</small></span>
          </p>
          <div class="job__main">
            <h3 class="display display--s">{{ job.company }}</h3>
            <p v-if="job.role" class="serif serif--lead">{{ job.role }}</p>
            <ul v-if="job.bullets.length" class="job__list">
              <li v-for="b in job.bullets" :key="b">{{ b }}</li>
            </ul>
            <RouterLink v-if="getProject(job.project)" :to="`/projects/${job.project}`" class="link-line job__link">View project →</RouterLink>
          </div>
        </RevealOnScroll>
      </ol>
    </section>

    <section class="container section" aria-labelledby="cv-h">
      <RevealOnScroll class="cv">
        <div>
          <h2 id="cv-h" class="display display--m">Curriculum <em>vitae</em></h2>
          <p class="meta cv__hint">{{ e.cv.href ? 'PDF — ready to download.' : 'Coming soon.' }}</p>
        </div>
        <a v-if="e.cv.href" :href="e.cv.href" class="btn" download>{{ e.cv.label }}</a>
        <button v-else type="button" class="btn" disabled aria-disabled="true">{{ e.cv.label }}</button>
      </RevealOnScroll>
    </section>

    <ContactCta />
  </div>
</template>

<style>
.exp__head { padding-bottom: clamp(1rem, 3vw, 2rem); }
.exp__group { padding-block: clamp(2.5rem, 6vw, 5rem) 0; }
.exp__group:last-of-type { padding-bottom: 0; }
.exp__label { padding-bottom: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--line); }

.job { display: grid; gap: 1rem; padding-block: clamp(2rem, 4vw, 3.5rem); border-bottom: 1px solid var(--line); }
.job__years { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; display: flex; gap: 1rem; align-items: baseline; }
.job__years small { display: block; margin-top: 0.3rem; font-size: 0.7rem; font-weight: 500; color: var(--muted-text); letter-spacing: 0.1em; }
.job__num { font-family: var(--font-serif); font-style: italic; font-size: 1.6rem; color: var(--accent); letter-spacing: 0; }
.job__main { display: grid; gap: 0.9rem; max-width: 46rem; justify-items: start; }
.job__list { display: grid; gap: 0.5rem; color: var(--muted-text); }
.job__list li { position: relative; padding-left: 1.2rem; }
.job__list li::before { content: ''; position: absolute; left: 0; top: 0.75em; width: 0.5rem; height: 1px; background: currentColor; }
.job__link { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; min-height: 44px; display: inline-flex; align-items: center; }
@media (min-width: 900px) {
  .job { grid-template-columns: 1fr 2fr; column-gap: 6vw; }
  .job__years { position: sticky; top: calc(var(--header-h) + 1rem); align-self: start; }
}

.cv { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem 3rem; padding: clamp(1.5rem, 4vw, 3rem); border: 1px solid var(--line); }
.cv__hint { margin-top: 0.75rem; }
</style>
