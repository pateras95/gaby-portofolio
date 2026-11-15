<script setup>
// /admin — a small CMS for the static site. Edit the config content in forms, see the real page in
// the preview, then export the config files and copy them into src/config/.
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import FieldNode from './FieldNode.vue'
import CaptionsEditor from './CaptionsEditor.vue'
import { buildNav, newProject } from './sections'
import { PREVIEW_FRAME } from './preview'
import { draft, dirty, dirtyCount, rev, notices, discard, fileNames, fileLabel, download, copy, importFile } from './store'
import './admin.css'

const nav = computed(() => buildNav())
const groups = computed(() => [...new Set(nav.value.map((e) => e.group))].map((g) => ({ name: g, items: nav.value.filter((e) => e.group === g) })))
const sel = ref((() => { try { return localStorage.getItem('gk-cms-sel') || 'site:identity' } catch { return 'site:identity' } })())
const cur = computed(() => nav.value.find((e) => e.id === sel.value) ?? nav.value[0])
watch(sel, (v) => { try { localStorage.setItem('gk-cms-sel', v) } catch { /* ignore */ } })
const holder = computed(() => ({ o: cur.value.target?.() }))
const owner = computed(() => ({ 'Site texts': 'site', 'Home page': 'home', Projects: 'projects', Captions: 'captions' })[cur.value.group])

// ── list actions: move / remove / add ──
function moveEntry(d) {
  const { arr, i } = cur.value.list
  const j = i + d
  if (j < 0 || j >= arr.length) return
  const [x] = arr.splice(i, 1)
  arr.splice(j, 0, x)
  sel.value = `${cur.value.id.replace(/\d+$/, '')}${j}`
}
function removeEntry() {
  if (!window.confirm('Remove this from the site?')) return
  const { arr, i } = cur.value.list
  const prefix = cur.value.id.replace(/\d+$/, '')
  arr.splice(i, 1)
  sel.value = `${prefix}${Math.max(0, i - 1)}`
}
function addProject() {
  draft.projects.push(newProject())
  sel.value = `projects:${draft.projects.length - 1}`
}
function addGroup() {
  draft.captions.push({ title: 'new group', items: [] })
  sel.value = `captions:${draft.captions.length - 1}`
}

// ── preview ──
const device = ref('desktop')
const WIDTH = { desktop: 1280, mobile: 390 }
const pane = ref(null)
const frame = ref(null)
const box = ref({ w: 600, h: 700 })
const src = computed(() => cur.value.route)
const scale = computed(() => Math.min(1, box.value.w / WIDTH[device.value]))
const frameStyle = computed(() => ({ width: `${WIDTH[device.value]}px`, height: `${box.value.h / scale.value}px`, transform: `scale(${scale.value})` }))
let ro
onMounted(() => {
  ro = new ResizeObserver(([e]) => { box.value = { w: e.contentRect.width, h: e.contentRect.height } })
  ro.observe(pane.value)
  document.head.insertAdjacentHTML('beforeend', '<meta name="robots" content="noindex" data-cms>')
})
onBeforeUnmount(() => { ro?.disconnect(); document.querySelector('meta[data-cms]')?.remove() })

// Reload the preview after every saved edit, keeping its scroll position.
let y = 0
watch(rev, () => {
  const w = frame.value?.contentWindow
  if (!w) return
  try { y = w.scrollY; w.location.reload() } catch { frame.value.src = frame.value.src }
})
function framed() {
  const w = frame.value?.contentWindow
  if (y && w) setTimeout(() => w.scrollTo({ top: y }), 900)
  y = 0
}
watch(sel, () => { y = 0 })

// ── export / import ──
const exporting = ref(false)
const msg = ref('')
const flash = (t) => { msg.value = t; setTimeout(() => { msg.value = '' }, 2600) }
async function doCopy(n) { try { await copy(n); flash(`${fileLabel(n)} copied`) } catch { flash('Copy blocked — use Download') } }
async function downloadAll() { for (const n of fileNames.filter((x) => dirty.value[x])) { download(n); await new Promise((r) => setTimeout(r, 350)) } }
async function onImport(e) {
  try { for (const f of e.target.files) flash(`Imported ${await importFile(f)}`) } catch (err) { flash(err.message) }
  e.target.value = ''
}
function discardAll() { if (window.confirm('Discard all your edits and go back to the files in the project?')) discard() }
function discardOne(n) { if (window.confirm(`Discard your edits of ${fileLabel(n)}?`)) discard([n]) }
const dlg = ref(null)
watch(exporting, async (v) => { await nextTick(); v ? dlg.value?.showModal() : dlg.value?.close() })
</script>

<template>
  <div class="cms">
    <header class="cms__bar">
      <strong class="cms__brand">Content editor</strong>
      <span class="cms__status" :class="{ 'is-dirty': dirtyCount }">{{ dirtyCount ? `${dirtyCount} file${dirtyCount > 1 ? 's' : ''} changed · draft saved in this browser` : 'No changes — same as the project files' }}</span>
      <span v-if="msg" class="cms__flash" role="status">{{ msg }}</span>
      <span class="cms__spacer" />
      <label class="btn-s">Import<input type="file" accept=".js" multiple hidden @change="onImport" /></label>
      <button type="button" class="btn-s" :disabled="!dirtyCount" @click="discardAll">Discard all</button>
      <button type="button" class="btn-p" @click="exporting = true">Export{{ dirtyCount ? ` (${dirtyCount})` : '' }}</button>
      <router-link class="btn-s" to="/" target="_blank">View site ↗</router-link>
    </header>

    <div v-if="notices.length" class="cms__notice">
      {{ notices.map(fileLabel).join(', ') }} changed in the project since your draft was made — your draft is still shown.
      <button type="button" @click="discard(notices)">Load the project's version instead</button>
    </div>

    <div class="cms__body">
      <nav class="cms__nav" aria-label="Sections">
        <select class="cms__select" :value="sel" @change="sel = $event.target.value">
          <optgroup v-for="g in groups" :key="g.name" :label="g.name"><option v-for="e in g.items" :key="e.id" :value="e.id">{{ e.label }}</option></optgroup>
        </select>
        <div v-for="g in groups" :key="g.name" class="navg">
          <h2>{{ g.name }}<i v-if="dirty[{ 'Site texts': 'site', 'Home page': 'home', Projects: 'projects', Captions: 'captions' }[g.name]]" title="Changed" /></h2>
          <button v-for="e in g.items" :key="e.id" type="button" :class="{ on: e.id === sel }" @click="sel = e.id">{{ e.label }}</button>
          <button v-if="g.name === 'Projects'" type="button" class="navadd" @click="addProject">+ New project</button>
          <button v-if="g.name === 'Captions'" type="button" class="navadd" @click="addGroup">+ New group</button>
        </div>
      </nav>

      <main class="cms__form">
        <div class="head">
          <div>
            <h1>{{ cur.label }}</h1>
            <p>{{ cur.desc }}</p>
          </div>
          <span v-if="cur.list" class="tools">
            <button type="button" title="Move up" :disabled="cur.list.i === 0" @click="moveEntry(-1)">↑</button>
            <button type="button" title="Move down" :disabled="cur.list.i === cur.list.arr.length - 1" @click="moveEntry(1)">↓</button>
            <button type="button" title="Remove" @click="removeEntry">✕</button>
          </span>
        </div>
        <CaptionsEditor v-if="cur.captions" :key="cur.id" :group="cur.captions()" />
        <FieldNode v-else :key="cur.id" :parent="holder" k="o" :only="cur.only" root />
        <p class="foot">Edits are saved in this browser as you type. They go live only after you <b>Export</b> and copy the files into <code>src/config/</code>.</p>
      </main>

      <aside class="cms__preview">
        <div class="pv-bar">
          <span>Preview · <code>{{ src }}</code></span>
          <span class="seg"><button type="button" :class="{ on: device === 'desktop' }" @click="device = 'desktop'">Desktop</button><button type="button" :class="{ on: device === 'mobile' }" @click="device = 'mobile'">Mobile</button></span>
        </div>
        <div ref="pane" class="pv-pane">
          <div class="pv-wrap" :class="{ 'is-mobile': device === 'mobile' }" :style="{ width: `${WIDTH[device] * scale}px` }">
            <iframe ref="frame" :name="PREVIEW_FRAME" :src="src" :style="frameStyle" title="Site preview" @load="framed" />
          </div>
        </div>
      </aside>
    </div>

    <dialog ref="dlg" class="cms__dlg" @close="exporting = false">
      <h2>Export the config</h2>
      <ol>
        <li>Download the changed files (or copy their text).</li>
        <li>Replace the same-named files in <code>src/config/</code>.</li>
        <li>Run <code>npm run build</code> (or just save — <code>npm run dev</code> updates by itself) and commit.</li>
      </ol>
      <ul class="files">
        <li v-for="n in fileNames" :key="n" :class="{ is: dirty[n] }">
          <code>{{ fileLabel(n) }}</code>
          <span class="tag">{{ dirty[n] ? 'changed' : 'unchanged' }}</span>
          <span class="spacer" />
          <button type="button" class="btn-s" @click="download(n)">Download</button>
          <button type="button" class="btn-s" @click="doCopy(n)">Copy</button>
          <button type="button" class="btn-s" :disabled="!dirty[n]" @click="discardOne(n)">Discard</button>
        </li>
      </ul>
      <p class="note">Comments inside the files are not kept (only the header on top, and caption group names).</p>
      <div class="dlg-foot"><span v-if="msg" class="cms__flash">{{ msg }}</span><span class="spacer" /><button type="button" class="btn-s" @click="exporting = false">Close</button><button type="button" class="btn-p" :disabled="!dirtyCount" @click="downloadAll">Download changed ({{ dirtyCount }})</button></div>
    </dialog>
  </div>
</template>
