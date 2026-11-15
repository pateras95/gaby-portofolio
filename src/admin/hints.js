// Small helpers for the editor forms: one-line help per field and optional fields that are not
// present yet. Pure UI — it never changes what is exported.
export const HELP = {
  headline: 'One line per row. *word* = serif italics.',
  slogan: 'One line per row.',
  statement: 'Short text under the headline.',
  eyebrow: 'Small line above the title.',
  mark: 'Big letters in the hero (initials).',
  image: 'Image path, e.g. /images/demo/25.jpg. Empty = no image.',
  imagePosition: 'Which part of the image stays visible, e.g. 50% 30%.',
  keyVisual: 'Image path — replaces the typographic key visual.',
  portrait: 'Image path. Empty shows a placeholder.',
  theme: 'bg = background · fg = text · accent = highlights.',
  project: 'Slug of a project in the Projects section.',
  part: "Chapter label of that project ('01', '03 · C'…) — \"View project\" opens it.",
  ref: 'A piece of a link already in the project (the code after /p/ or /reel/, the TikTok number, the YouTube id, a word of an article URL) — or simply the full post URL.',
  label: 'Your own caption / name for it.',
  caption: 'Overrides the text from Captions for this card only.',
  note: 'Shown only when the post has no text of its own.',
  placeholder: 'An empty slot, clearly marked on the page — fill in later.',
  display: 'Layout of the section: campaign · brands · concepts · voices · video.',
  style: 'Voices: shout | serif | headline | list.  Boards: quiz | hunt.',
  samples: 'Lines set in big type instead of the post text.',
  more: 'Last slot of the grid. Delete all fields to remove it.',
  links: 'A link, or label + url. Instagram, TikTok, YouTube, Issuu, LinkedIn and ipolizei.gr posts are embedded; others get a plain card. embed: false = card only.',
  body: 'Paragraphs. A list = bullet points. Lead & text = bold lead + text.',
  categories: 'Filters on the Work page. New names appear automatically.',
  slug: 'URL part: /projects/<slug> — lowercase, no spaces.',
  cv: 'Put the PDF in /public and set the href, e.g. /cv.pdf.',
  phone: 'Shown on the Contact page only. Empty = hidden.',
  socials: 'Empty handle / link = hidden.',
  project_: '',
}
export const MULTILINE = new Set(['text', 'summary', 'insight', 'statement', 'description', 'availability', 'overview', 'caption', 'note', 'lead', 'subtitle', 'value'])
export const COLOR_KEYS = new Set(['bg', 'fg', 'accent'])
// Optional fields worth offering on these objects even when no sibling uses them yet.
const REF = ['label', 'part', 'caption', 'note', 'category', 'embed']
export const EXTRA = { examples: REF, posts: REF, also: REF, items: REF, video: REF, post: REF, links: ['embed'] }

export const blank = (s) => {
  if (Array.isArray(s)) return []
  if (s && typeof s === 'object') return Object.fromEntries(Object.entries(s).map(([k, v]) => [k, blank(v)]))
  if (typeof s === 'number') return 0
  if (typeof s === 'boolean') return false
  return ''
}
export const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null || v === undefined ? 'string' : typeof v)
const TITLE_KEYS = ['name', 'title', 'company', 'tone', 'label', 'slug', 'degree', 'role', 'kind', 'lead', 'ref', 'url', 'value', 'text']
export const titleOf = (item, i) => {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    if (item.placeholder) return `Placeholder · ${item.placeholder}`
    for (const k of TITLE_KEYS) if (typeof item[k] === 'string' && item[k]) return item[k].length > 56 ? `${item[k].slice(0, 54)}…` : item[k]
  }
  return `Item ${i + 1}`
}
export const humanize = (k) => String(k).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())
