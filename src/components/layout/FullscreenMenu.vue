<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import { projects, contactItems } from '@/config'
import { useThemeToggle } from '@/composables/useThemeToggle'

const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
]

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const root = ref(null)
const preview = ref(projects[0].slug)
const { isDark, toggleTheme } = useThemeToggle()
const pad = (n) => String(n).padStart(2, '0')

// Keep Tab inside the menu (+ the toggle button, which lives in the header).
function focusables() {
  const toggle = document.querySelector('.menu-toggle')
  const inside = [...root.value.querySelectorAll('a[href], button:not([disabled])')]
  return [toggle, ...inside].filter(Boolean)
}
function onKey(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close', { restoreFocus: true })
    return
  }
  if (e.key !== 'Tab') return
  const list = focusables()
  const first = list[0]
  const last = list[list.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      await nextTick()
      root.value?.querySelector('.menu__link')?.focus({ preventScroll: true })
    } else {
      document.removeEventListener('keydown', onKey)
    }
  },
)
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div
    id="site-menu"
    ref="root"
    class="menu"
    :class="{ 'is-open': open }"
    role="dialog"
    aria-modal="true"
    aria-label="Site menu"
    :inert="open ? null : ''"
  >
    <div class="menu__inner">
      <nav class="menu__nav" aria-label="Primary">
        <ul>
          <li v-for="(item, i) in primaryNav" :key="item.to">
            <RouterLink :to="item.to" class="menu__link" @click="emit('close')">
              <span class="menu__num">{{ pad(i + 1) }}</span>
              <span class="menu__line"><span class="menu__text" :style="{ '--i': i }">{{ item.label }}</span></span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="menu__aside">
        <p class="eyebrow menu__eyebrow">Selected work</p>
        <ul class="menu__projects">
          <li v-for="(p, i) in projects" :key="p.slug">
            <RouterLink
              :to="`/projects/${p.slug}`"
              class="menu__project"
              :style="{ '--i': i }"
              @click="emit('close')"
              @mouseenter="preview = p.slug"
              @focus="preview = p.slug"
            >
              <span class="menu__project-num">{{ pad(i + 1) }}</span>
              <span class="menu__project-title">{{ p.title }}</span>
            </RouterLink>
          </li>
        </ul>
        <div class="menu__preview" aria-hidden="true">
          <img
            v-for="p in projects"
            :key="p.slug"
            :src="p.image"
            alt=""
            loading="lazy"
            decoding="async"
            :class="{ 'is-active': preview === p.slug }"
          />
        </div>
      </div>

      <div class="menu__foot">
        <div v-if="contactItems.length">
          <p class="eyebrow">Get in touch</p>
          <ul class="menu__contact">
            <li v-for="c in contactItems" :key="c.label">
              <a :href="c.href" :target="c.external ? '_blank' : null" rel="noopener" class="link-line">{{ c.label }}</a>
            </li>
          </ul>
        </div>
        <button class="menu__theme" :aria-pressed="isDark" @click="toggleTheme">
          <v-icon :icon="isDark ? mdiWeatherSunny : mdiWeatherNight" size="18" />
          {{ isDark ? 'Light' : 'Dark' }} mode
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.menu {
  --menu-bg: var(--ink);
  --menu-fg: var(--bg);
  position: fixed; inset: 0; z-index: 150;
  background: var(--menu-bg); color: var(--menu-fg);
  overflow-y: auto; overscroll-behavior: contain;
  visibility: hidden;
  clip-path: circle(0px at calc(100% - 3.6rem) calc(var(--header-h) / 2));
  transition: clip-path 0.7s var(--ease-io), visibility 0s linear 0.7s;
}
.menu.is-open {
  visibility: visible;
  clip-path: circle(160vmax at calc(100% - 3.6rem) calc(var(--header-h) / 2));
  transition: clip-path 0.75s var(--ease-io), visibility 0s;
}

.menu__inner {
  min-height: 100%; display: grid; gap: 2.5rem; align-content: space-between;
  padding: calc(var(--header-h) + 1.5rem) var(--gutter) 1.75rem;
}

/* Primary links */
.menu__link { display: flex; align-items: baseline; gap: 1rem; min-height: 44px; }
.menu__num { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; opacity: 0.6; min-width: 1.6rem; }
.menu__line { display: block; overflow: hidden; padding: 0.06em 0.05em 0.1em; }
.menu__text {
  display: block; font-weight: 800; font-stretch: 82%; text-transform: uppercase;
  font-size: clamp(2.8rem, 9.5vw, 8.5rem); line-height: 0.92; letter-spacing: -0.025em;
  transform: translate3d(0, 115%, 0); transition: transform 0.4s var(--ease-io), opacity 0.4s ease;
}
.menu.is-open .menu__text {
  transform: none;
  transition: transform 0.9s var(--ease-out) calc(0.3s + var(--i) * 0.07s), opacity 0.4s ease;
}
.menu__nav ul:hover .menu__link:not(:hover) .menu__text { opacity: 0.3; }
.menu__link:hover .menu__text, .menu__link:focus-visible .menu__text { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-stretch: 100%; text-transform: none; }
.menu__link.router-link-exact-active .menu__text::after {
  content: ''; display: inline-block; width: 0.14em; height: 0.14em; margin-left: 0.2em;
  border-radius: 50%; background: var(--accent); vertical-align: 0.5em;
}

/* Project index */
.menu__aside { display: grid; gap: 1.25rem; align-content: start; }
.menu__eyebrow { opacity: 0.6; }
.menu__projects { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1.5rem; }
.menu__project {
  display: flex; gap: 0.75rem; align-items: baseline; min-height: 44px; padding: 0.35rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--menu-fg) 18%, transparent);
  opacity: 0; transform: translate3d(0, 14px, 0);
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.25s ease;
}
.menu.is-open .menu__project {
  opacity: 1; transform: none;
  transition: opacity 0.7s var(--ease-out) calc(0.55s + var(--i) * 0.05s), transform 0.8s var(--ease-out) calc(0.55s + var(--i) * 0.05s), color 0.25s ease;
}
.menu__project-num { font-size: 0.68rem; letter-spacing: 0.12em; opacity: 0.55; }
.menu__project-title { font-size: 0.98rem; font-weight: 500; }
.menu__project:hover, .menu__project:focus-visible { color: var(--accent); }
.menu__preview { display: none; position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
.menu__preview img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  opacity: 0; transform: scale(1.06); transition: opacity 0.6s ease, transform 1.2s var(--ease-out);
}
.menu__preview img.is-active { opacity: 1; transform: none; }

/* Footer row */
.menu__foot { display: flex; flex-wrap: wrap; gap: 1rem 3rem; align-items: end; font-size: 0.9rem; }
.menu__foot .eyebrow { opacity: 0.6; margin-bottom: 0.35rem; }
.menu__contact { display: flex; flex-wrap: wrap; gap: 0.25rem 1.5rem; }
.menu__contact a { display: inline-flex; align-items: center; min-height: 44px; }
.menu__theme {
  display: inline-flex; align-items: center; gap: 0.5rem; min-height: 44px;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  margin-left: auto;
}
.menu__theme:hover { color: var(--accent); }

@media (min-width: 1024px) {
  .menu__inner { grid-template-columns: 1.25fr 1fr; grid-template-rows: 1fr auto; column-gap: 5vw; align-items: center; }
  .menu__aside { align-self: center; }
  .menu__projects { grid-template-columns: 1fr; }
  .menu__project { padding: 0.15rem 0; min-height: 40px; }
  .menu__preview { display: block; }
  .menu__foot { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .menu__projects { grid-template-columns: 1fr; }
}
</style>
