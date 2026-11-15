<script setup>
// The text shown under every Instagram post (captions.config.js): one group per project chapter.
const props = defineProps({ group: { type: Object, required: true } })
const add = () => props.group.items.push({ key: '', value: '' })
const remove = (i) => props.group.items.splice(i, 1)
const rows = (v) => Math.min(12, Math.max(2, Math.ceil(v.length / 70) + (v.match(/\n/g)?.length ?? 0)))
</script>

<template>
  <div class="f f--group f--root">
    <label class="f">
      <span class="f__label">Group name</span>
      <span class="f__help">Only a label in the file ("project · chapter · section") — not shown on the site.</span>
      <input v-model="group.title" type="text" />
    </label>
    <div v-for="(item, i) in group.items" :key="i" class="cap">
      <div class="cap__head">
        <label class="f f--bare"><span class="f__label">Post code</span><input v-model="item.key" type="text" spellcheck="false" placeholder="CiIOKkiJ9fP" /></label>
        <a v-if="/^[\w-]{9,12}$/.test(item.key)" :href="`https://www.instagram.com/p/${item.key}/`" target="_blank" rel="noopener">open post ↗</a>
        <button type="button" title="Remove" @click="remove(i)">✕</button>
      </div>
      <textarea v-model="item.value" :rows="rows(item.value)" placeholder="Caption — hashtags are shown separately on the site" />
    </div>
    <p v-if="!group.items.length" class="list__empty">No captions in this group.</p>
    <div class="adds"><button type="button" class="add" @click="add">+ Add a caption</button></div>
    <p class="f__help">The code is the part of the URL after /p/ or /reel/ (a YouTube id or TikTok number also works).</p>
  </div>
</template>
