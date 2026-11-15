<script setup>
// One field of a config — recursive: text · colour · list · group. Edits write straight into the draft.
import { computed, toRaw } from 'vue'
import { draft } from './store'
import { HELP, MULTILINE, COLOR_KEYS, EXTRA, blank, typeOf, titleOf, humanize } from './hints'

const props = defineProps({
  parent: { type: [Object, Array], required: true },
  k: { type: [String, Number], required: true },
  hint: { default: undefined }, // a sample value (type + optional keys), from sibling items
  name: { type: String, default: '' }, // key of the nearest named ancestor
  only: { type: Array, default: null }, // show only these keys of the object
  root: { type: Boolean, default: false }, // render the fields without a card
  depth: { type: Number, default: 0 },
})

const value = computed(() => props.parent[props.k])
const type = computed(() => typeOf(value.value ?? props.hint))
const isIndex = computed(() => Array.isArray(props.parent))
const label = computed(() => (isIndex.value ? '' : humanize(props.k)))
const help = computed(() => (isIndex.value ? '' : HELP[props.k] ?? ''))
const myName = computed(() => (isIndex.value ? props.name : String(props.k)))

// ── text ──
const isColor = computed(() => typeof value.value === 'string' && (COLOR_KEYS.has(props.k) || /^#[0-9a-f]{6}$/i.test(value.value)))
const multiline = computed(() => type.value === 'string' && (MULTILINE.has(props.k) || (value.value ?? '').length > 70 || (value.value ?? '').includes('\n')))
const rows = computed(() => Math.min(14, Math.max(2, Math.ceil((value.value ?? '').length / 62) + ((value.value ?? '').match(/\n/g)?.length ?? 0))))
const set = (v) => { props.parent[props.k] = v }

// ── ref check: does this reference find a post? ──
const urlsOf = (proj) => [...(proj.sections ?? []), ...(proj.parts ?? []).flatMap((x) => x.sections ?? [])].flatMap((s) => s.links ?? []).map((l) => (typeof l === 'string' ? l : l.url))
const refState = computed(() => {
  const p = props.parent
  if (props.k !== 'ref' || isIndex.value || typeof p.project !== 'string' || !value.value) return null
  if (/^https?:\/\//.test(value.value)) return /(instagram\.com\/(p|reel)|tiktok\.com\/@[^/]+\/video|youtu|issuu\.com|linkedin\.com\/posts|ipolizei\.gr)/.test(value.value) ? ['ok', 'Full URL — embedded directly.'] : ['bad', 'Not a post URL that can be embedded.']
  const proj = draft.projects.find((x) => x.slug === p.project)
  if (!proj) return ['bad', `No project "${p.project}" — check the Project field.`]
  const hit = urlsOf(proj).find((u) => u.includes(value.value))
  return hit ? ['ok', `Found in the project: ${hit}`] : ['bad', 'Not found in that project’s links, so it is not shown. Paste the full post URL here instead (or add the link to the project).']
})

// ── lists ──
const items = computed(() => (Array.isArray(value.value) ? value.value : []))
const allStrings = computed(() => items.value.length > 0 && items.value.every((x) => typeof x === 'string'))
const sample = computed(() => items.value[0] ?? props.hint?.[0])
const union = computed(() => items.value.reduce((u, x) => (x && typeof x === 'object' && !Array.isArray(x) ? { ...x, ...u } : u), {}))
const ensureArray = () => { if (!Array.isArray(props.parent[props.k])) props.parent[props.k] = []
  return props.parent[props.k] }
const template = () => {
  const objs = items.value.filter((x) => x && typeof x === 'object' && !Array.isArray(x))
  if (objs.length) { const first = objs[0]; return blank(Object.fromEntries(Object.keys(first).filter((key) => objs.every((o) => key in o)).map((key) => [key, first[key]]))) }
  return blank(sample.value)
}
const fresh = new WeakSet()
const add = (v = template()) => { const list = ensureArray(); list.push(v); if (v && typeof v === 'object') fresh.add(toRaw(list.at(-1))) }
const addButtons = computed(() => {
  if (myName.value === 'body') return [['+ Paragraph', ''], ['+ Bullet list', ['']], ['+ Lead & text', { lead: '', text: '' }]]
  if (myName.value === 'links') return [['+ Link', { label: '', url: '' }]]
  return [['+ Add', undefined]]
})
const move = (i, d) => {
  const l = items.value
  const j = i + d
  if (j < 0 || j >= l.length) return
  const [x] = l.splice(i, 1)
  l.splice(j, 0, x)
}
const remove = (i) => { if (typeof items.value[i] === 'object' && !window.confirm('Remove this item?')) return; items.value.splice(i, 1) }
const duplicate = (i) => { const c = JSON.parse(JSON.stringify(items.value[i])); items.value.splice(i + 1, 0, c); fresh.add(toRaw(items.value[i + 1])) }

const ids = new WeakMap()
let n = 0
const keyOf = (x, i) => (x && typeof x === 'object' ? (ids.get(toRaw(x)) ?? (ids.set(toRaw(x), ++n), n)) : i)
const startOpen = (x) => fresh.has(toRaw(x)) || props.depth < 1 || items.value.length === 1

// ── groups ──
const fields = computed(() => {
  const keys = Object.keys(value.value ?? {})
  return props.only ? props.only.filter((key) => keys.includes(key)) : keys
})
const missing = computed(() => {
  if (!value.value || props.only) return []
  const known = [...Object.keys(props.hint && typeof props.hint === 'object' ? props.hint : {}), ...(EXTRA[myName.value] ?? [])]
  return [...new Set(known)].filter((key) => !(key in value.value))
})
const addField = (key) => { props.parent[props.k][key] = blank(props.hint?.[key]) }
</script>

<template>
  <!-- text / number / yes-no -->
  <label v-if="type === 'string' || type === 'number' || type === 'boolean'" class="f" :class="{ 'f--bare': isIndex }">
    <span v-if="label" class="f__label">{{ label }}</span>
    <span v-if="help" class="f__help">{{ help }}</span>
    <span v-if="refState" class="f__ref" :class="`is-${refState[0]}`">{{ refState[0] === 'ok' ? '✓' : '✗' }} {{ refState[1] }}</span>
    <span v-if="isColor" class="f__color"><input type="color" :value="value" @input="set($event.target.value)" /><input type="text" :value="value" spellcheck="false" @input="set($event.target.value)" /></span>
    <input v-else-if="type === 'boolean'" type="checkbox" :checked="value" @change="set($event.target.checked)" />
    <input v-else-if="type === 'number'" type="number" :value="value" @input="set(Number($event.target.value))" />
    <textarea v-else-if="multiline" :rows="rows" :value="value ?? ''" @input="set($event.target.value)" />
    <input v-else type="text" :value="value ?? ''" @input="set($event.target.value)" />
  </label>

  <!-- list -->
  <div v-else-if="type === 'array'" class="f f--list" :class="{ 'f--bare': isIndex }">
    <span class="f__label">{{ isIndex ? 'Bullet list' : label }}<em v-if="items.length"> · {{ items.length }}</em></span>
    <span v-if="help" class="f__help">{{ help }}</span>
    <div class="list">
      <div v-for="(item, i) in items" :key="keyOf(item, i)" class="row" :class="{ 'row--card': item && typeof item === 'object' }">
        <template v-if="item && typeof item === 'object'">
          <details class="card" :open="startOpen(item)">
            <summary><span class="card__n">{{ i + 1 }}</span><span class="card__t">{{ Array.isArray(item) ? `List · ${item.length}` : titleOf(item, i) }}</span></summary>
            <FieldNode :parent="items" :k="i" :hint="Array.isArray(item) ? sample : union" :name="myName" :depth="depth + 1" root />
          </details>
        </template>
        <FieldNode v-else :parent="items" :k="i" :name="myName" :depth="depth + 1" />
        <span class="tools">
          <button type="button" title="Move up" :disabled="i === 0" @click="move(i, -1)">↑</button>
          <button type="button" title="Move down" :disabled="i === items.length - 1" @click="move(i, 1)">↓</button>
          <button v-if="item && typeof item === 'object' && !Array.isArray(item)" type="button" title="Duplicate" @click="duplicate(i)">⧉</button>
          <button type="button" title="Remove" @click="remove(i)">✕</button>
        </span>
      </div>
      <p v-if="!items.length" class="list__empty">Empty — nothing is shown.</p>
    </div>
    <div class="adds"><button v-for="[text, v] in addButtons" :key="text" type="button" class="add" @click="add(v)">{{ text }}</button></div>
  </div>

  <!-- group of fields -->
  <div v-else class="f f--group" :class="{ 'f--root': root, 'f--bare': isIndex }">
    <template v-if="!root">
      <span class="f__label">{{ label }}</span>
      <span v-if="help" class="f__help">{{ help }}</span>
    </template>
    <div class="group">
      <FieldNode v-for="key in fields" :key="key" :parent="value" :k="key" :hint="hint?.[key]" :name="myName" :depth="depth + 1" />
      <div v-if="missing.length" class="chips"><span>Add field:</span><button v-for="key in missing" :key="key" type="button" @click="addField(key)">+ {{ key }}</button></div>
    </div>
  </div>
</template>
