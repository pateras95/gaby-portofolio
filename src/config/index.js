// Single import point for all site content:  import { site, projects } from '@/config'
// This file only prepares the config for the components — you normally never edit it.
import { site as siteFile } from './site.config'
import { projects as projectsFile } from './projects.config'
import { home as homeFile } from './home.config'
import { captions as captionsFile } from './captions.config'
import { previewData } from '@/admin/preview'

// Inside the /admin preview frame the CMS draft replaces the files (null everywhere else → the files).
export const site = previewData('site') ?? siteFile
const rawProjects = previewData('projects') ?? projectsFile
const rawHome = previewData('home') ?? homeFile
const captions = previewData('captions') ?? captionsFile

// ── Links ────────────────────────────────────────────────────────────────────
// Every link gets: label ("Instagram Reel 3"), kind (platform), embed (an iframe URL or null) and the
// post's caption (from captions.config.js) split into text + hashtags.
// Embeddable: Instagram posts/reels, TikTok videos, YouTube videos, Issuu pages, LinkedIn posts, ipolizei.gr articles.
const PLATFORMS = [
  { kind: 'Instagram', label: (m) => (m[1] === 'reel' ? 'Instagram Reel' : 'Instagram Post'), re: /instagram\.com\/(p|reel)\/([\w-]+)/, code: (m) => m[2], embed: (m) => `https://www.instagram.com/${m[1]}/${m[2]}/embed/` },
  { kind: 'TikTok', label: () => 'TikTok video', re: /tiktok\.com\/@[^/]+\/video\/(\d+)/, code: (m) => m[1], embed: (m) => `https://www.tiktok.com/player/v1/${m[1]}?description=1&music_info=1` },
  { kind: 'YouTube', label: () => 'YouTube', re: /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/, code: (m) => m[1], embed: (m) => `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&playsinline=1` },
  { kind: 'Issuu', label: () => 'Magazine', re: /issuu\.com\/([^/]+)\/docs\/([^/?]+)(?:\/(\d+))?/, embed: (m) => `https://e.issuu.com/embed.html?u=${m[1]}&d=${m[2]}${m[3] ? `&pageNumber=${m[3]}` : ''}` },
  { kind: 'LinkedIn', label: () => 'LinkedIn post', re: /linkedin\.com\/posts\/[^?]*?(ugcPost|share|activity)-(\d+)/, embed: (m) => `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}` },
  { kind: 'Web', label: () => 'Article', re: /ipolizei\.gr\//, embed: (m, url) => url },
]
// Platforms we only link to (profiles, channels): just a name for the plain card.
const NAMES = [[/instagram\.com/, 'Instagram'], [/tiktok\.com/, 'TikTok'], [/youtu/, 'YouTube'], [/linkedin\.com|lnkd\.in/, 'LinkedIn']]

// "Text #tag #tag" → { text, tags }  (hashtags are shown separately from the text)
const TAG = /#[\p{L}\p{N}_]+/gu
export const splitCaption = (caption = '') => ({
  tags: caption.match(TAG) ?? [],
  text: caption.replace(TAG, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim(),
})
const withCaption = (l, caption) => ({ ...l, caption, ...splitCaption(caption) })

const toLink = (link, i) => {
  const l = typeof link === 'string' ? { url: link } : { ...link }
  const platform = PLATFORMS.find((p) => p.re.test(l.url))
  const match = platform && l.url.match(platform.re)
  l.kind = platform?.kind ?? NAMES.find(([re]) => re.test(l.url))?.[1] ?? new URL(l.url).hostname.replace(/^www\./, '')
  l.label ??= `${platform ? platform.label(match) : l.kind} ${i + 1}`
  l.embed = l.embed === false ? null : l.embed || platform?.embed(match, l.url) || null // embed: false → card only
  l.code = platform?.code?.(match) ?? null // the id inside the URL — also the key in captions.config.js
  return withCaption(l, l.caption ?? captions[l.code] ?? '')
}

// The overview text is shown as the first section, followed by the project's own sections.
const prepareSections = (overview = [], sections = [], title) => [
  ...(overview.length ? [{ title, body: overview }] : []),
  ...sections,
].map((s) => ({ ...s, body: s.body ?? [], links: (s.links ?? []).map(toLink) }))

export const projects = rawProjects.map((p) => ({
  ...p,
  meta: p.meta ?? [],
  stats: p.stats ?? [],
  sections: prepareSections(p.overview, p.sections, 'Overview'),
  parts: (p.parts ?? []).map((part) => ({ ...part, sections: prepareSections(part.overview, part.sections, 'Project Overview') })),
}))

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const getNextProject = (slug) => projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length]

// Work-page filters: every category used by a project, in order of first appearance.
export const categories = ['All Work', ...new Set(projects.flatMap((p) => p.categories))]

// Contact entries that actually have a value (empty ones are skipped everywhere).
export const contactItems = [
  site.email && { label: 'Email', text: site.email, href: `mailto:${site.email}` },
  ...site.socials.filter((s) => s.href).map((s) => ({ label: s.label, text: s.handle || s.href, href: s.href, external: true })),
].filter(Boolean)

// Contact page only: the public contact items plus the phone number.
export const contactDetails = [
  ...contactItems,
  site.phone && { label: 'Phone', text: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, '')}` },
].filter(Boolean)

// ── Home page ───────────────────────────────────────────────────────────────────
// Chapter ids on the project pages ('01', '03 · C' → "part-03-c") so the home page can deep-link to them.
export const partId = (label) => `part-${String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
export const workPath = (slug, part) => `/projects/${slug}${part ? `#${partId(part)}` : ''}`

const allLinks = (p) => [...p.sections, ...p.parts.flatMap((x) => x.sections)].flatMap((s) => s.links)

// ref may also be a full URL.
// { project, ref, part?, label?, caption?, note? … } → the project's real link (embed, label, url, caption …)
// plus a path to its page. Anything else in the reference (category, …) is passed through.
function resolveWork({ project, ref, part, ...extra }) {
  // ref = a piece of a link already in the project — or a full post URL (https://…), which needs no entry there
  const link = (getProject(project) && allLinks(getProject(project)).find((l) => l.url.includes(ref))) || (/^https?:\/\//.test(ref) ? toLink({ url: ref }, 0) : null)
  if (!link) {
    console.warn(`[home.config] no link containing "${ref}" in project "${project}" — skipped`)
    return null
  }
  const { note, caption, ...rest } = extra
  return { ...withCaption({ ...link, ...rest }, caption ?? (link.caption || note || '')), to: workPath(project, part) }
}
// { placeholder: 'CR Studio post' } → an empty slot, clearly marked, to be replaced in home.config.js
const placeholder = ({ placeholder, project, part }) => ({ placeholder: true, kind: 'Placeholder', label: placeholder, url: '', embed: null, text: '', tags: [], to: project ? workPath(project, part) : '' })
const resolveItem = (item) => (item.placeholder ? placeholder(item) : resolveWork(item))
const resolveAll = (items = []) => items.map(resolveItem).filter(Boolean)
const withTo = (o) => ({ ...o, to: workPath(o.project, o.part) })

export const home = {
  ...rawHome,
  sections: rawHome.sections.map((s) => ({
    ...s,
    featured: s.featured && { ...withTo(s.featured), video: resolveWork(s.featured.video), posts: resolveAll(s.featured.posts) },
    brands: s.brands?.map((b) => ({ ...withTo(b), examples: resolveAll(b.examples) })),
    boards: s.boards?.map((b) => ({ ...withTo(b), examples: resolveAll(b.examples) })),
    voices: s.voices?.map((v) => ({ ...v, post: resolveWork(v.post), also: resolveAll(v.also) })),
    items: s.items && resolveAll(s.items),
  })),
}
