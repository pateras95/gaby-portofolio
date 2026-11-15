// Lets the live site show the CMS draft: only inside the /admin preview frame (window.name below) —
// visitors of the real site never see a draft. Used by src/config/index.js.
export const PREVIEW_FRAME = 'gk-cms-preview'
export const DRAFT_KEY = 'gk-cms-draft'

let saved = null
try {
  if (typeof window !== 'undefined' && window.name === PREVIEW_FRAME) saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
} catch { /* no draft */ }

// → the draft of 'site' | 'home' | 'projects' | 'captions' (same shape as the config file exports), or null
export const previewData = (name) => {
  const data = saved?.[name]?.data
  if (!data) return null
  return name === 'captions' ? Object.fromEntries(data.flatMap((g) => g.items.map((i) => [i.key, i.value]))) : data
}
