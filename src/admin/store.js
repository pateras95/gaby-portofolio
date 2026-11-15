// The CMS state: a working copy ("draft") of the four config files, kept in this browser's
// localStorage, plus export / import. The real files in src/config are never touched — you export
// the new files and copy them into the project.
import { reactive, ref, computed, watch } from 'vue'
import { site as siteFile } from '@/config/site.config'
import { home as homeFile } from '@/config/home.config'
import { projects as projectsFile } from '@/config/projects.config'
import siteRaw from '@/config/site.config.js?raw'
import homeRaw from '@/config/home.config.js?raw'
import projectsRaw from '@/config/projects.config.js?raw'
import captionsRaw from '@/config/captions.config.js?raw'
import { captions as captionsFile } from '@/config/captions.config'
import { toJs, headerOf } from './serialize'
import { DRAFT_KEY } from './preview'

const clone = (v) => JSON.parse(JSON.stringify(v))
const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return String(h) }

// ── captions.config.js ⇄ groups  (the "// ── group" comment lines become groups) ────────────────
const GROUP = '// ── '
export function parseCaptions(text, fallback = {}) {
  const body = text.slice(text.indexOf('export const captions'))
  const groups = []
  let cur = null
  let count = 0
  for (const line of body.split('\n')) {
    const t = line.trim()
    if (t.startsWith(GROUP)) { cur = { title: t.slice(GROUP.length), items: [] }; groups.push(cur); continue }
    const m = t.match(/^("(?:[^"\\]|\\.)*"):\s*("(?:[^"\\]|\\.)*"),?$/)
    if (!m) continue
    try {
      cur ??= (groups.push({ title: '', items: [] }), groups.at(-1))
      cur.items.push({ key: JSON.parse(m[1]), value: JSON.parse(m[2]) })
      count++
    } catch { /* skip a line we cannot read */ }
  }
  if (count !== Object.keys(fallback).length && Object.keys(fallback).length) {
    return [{ title: '', items: Object.entries(fallback).map(([key, value]) => ({ key, value })) }]
  }
  return groups
}

const FILES = {
  site: { file: 'site.config.js', original: clone(siteFile), raw: siteRaw },
  home: { file: 'home.config.js', original: clone(homeFile), raw: homeRaw },
  projects: { file: 'projects.config.js', original: clone(projectsFile), raw: projectsRaw },
  captions: { file: 'captions.config.js', original: parseCaptions(captionsRaw, captionsFile), raw: captionsRaw },
}
export const fileNames = Object.keys(FILES)
export const fileLabel = (n) => FILES[n].file
const baseOf = (n) => hash(JSON.stringify(FILES[n].original))

// ── load the saved draft ───────────────────────────────────────────────────────────────────
let saved = {}
try { saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') } catch { saved = {} }

export const draft = reactive({})
export const notices = ref([]) // files that changed in the project since the draft was made
for (const n of fileNames) {
  const s = saved[n]
  const original = JSON.stringify(FILES[n].original)
  if (s?.data && s.base === baseOf(n)) draft[n] = s.data
  else if (s?.data && JSON.stringify(s.data) !== original) { draft[n] = s.data; notices.value.push(n) } // project files changed outside the CMS
  else draft[n] = clone(FILES[n].original)
}

// ── change tracking + autosave ─────────────────────────────────────────────────────────────
export const dirty = computed(() => Object.fromEntries(fileNames.map((n) => [n, JSON.stringify(draft[n]) !== JSON.stringify(FILES[n].original)])))
export const dirtyCount = computed(() => fileNames.filter((n) => dirty.value[n]).length)
export const rev = ref(0) // +1 after every saved edit → the preview reloads

let timer
function persist() {
  const out = {}
  for (const n of fileNames) if (dirty.value[n]) out[n] = { base: baseOf(n), data: draft[n] }
  try {
    if (Object.keys(out).length) localStorage.setItem(DRAFT_KEY, JSON.stringify(out))
    else localStorage.removeItem(DRAFT_KEY)
  } catch { /* storage full / blocked: the draft lives only until the tab closes */ }
  rev.value++
}
watch(draft, () => { clearTimeout(timer); timer = setTimeout(persist, 450) }, { deep: true })

export function discard(names = fileNames) {
  for (const n of names) draft[n] = clone(FILES[n].original)
  notices.value = notices.value.filter((n) => !names.includes(n))
  clearTimeout(timer); persist()
}

// ── export ─────────────────────────────────────────────────────────────────────────────────
const banner = (t) => `// ${'─'.repeat(77)}\n//  ${t}\n// ${'─'.repeat(77)}\n`
const stamp = () => `// Exported from /admin on ${new Date().toISOString().slice(0, 10)} — replaces this file in src/config/.\n`
const SITE_GROUPS = [
  ['1. IDENTITY  — header, browser tab title, footer, About page', 'identity', ['name', 'initials', 'title', 'descriptor']],
  ['2. CONTACT DETAILS  — menu, footer, contact page, closing call-to-action', 'contact', ['email', 'phone', 'location', 'socials']],
  ['3. ABOUT PAGE  — from the CV', 'about', ['about']],
  ['4. EXPERIENCE PAGE  — from the CV', 'experience', ['experience']],
  ['5. CONTACT PAGE', 'contactPage', ['contactPage']],
]
export const siteGroupKeys = Object.fromEntries(SITE_GROUPS.map(([, id, keys]) => [id, keys]))

export function buildFile(name) {
  const head = `${headerOf(FILES[name].raw)}\n${stamp()}\n`
  const d = draft[name]
  if (name === 'home') return `${head}export const home = ${toJs(d)}\n`
  if (name === 'projects') return `${head}export const projects = ${toJs(d)}\n`
  if (name === 'captions') {
    const lines = d.map((g) => `${g.title ? `  ${GROUP}${g.title}\n` : ''}${g.items.map((i) => `  ${JSON.stringify(i.key)}: ${JSON.stringify(i.value)},\n`).join('')}`).join('')
    return `${head}export const captions = {\n${lines}}\n`
  }
  const body = SITE_GROUPS.map(([title, id, keys]) => {
    const obj = Object.fromEntries(keys.filter((k) => k in d).map((k) => [k, d[k]]))
    return `${banner(title)}const ${id} = ${keys.length === 1 ? toJs(obj[keys[0]]) : toJs(obj)}\n`
  }).join('\n')
  return `${head}${body}\nexport const site = { ...identity, ...contact, about, experience, contactPage }\n`
}

export function download(name) {
  const url = URL.createObjectURL(new Blob([buildFile(name)], { type: 'text/javascript' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: FILES[name].file })
  document.body.append(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
export const copy = (name) => navigator.clipboard.writeText(buildFile(name))

// ── import: a config file you exported earlier (any of the four) ──────────────────────────────
export async function importFile(file) {
  const text = await file.text()
  const url = URL.createObjectURL(new Blob([text], { type: 'text/javascript' }))
  try {
    const mod = await import(/* @vite-ignore */ url)
    if (mod.site) draft.site = clone(mod.site)
    else if (mod.home) draft.home = clone(mod.home)
    else if (mod.projects) draft.projects = clone(mod.projects)
    else if (mod.captions) draft.captions = parseCaptions(text, mod.captions)
    else throw new Error('Not a config file (no site / home / projects / captions export).')
    return file.name
  } finally { URL.revokeObjectURL(url) }
}
