// The editor's navigation: which part of the config each form edits, and which page the preview shows.
import { draft, siteGroupKeys } from './store'

const short = (t, n = 34) => (t.length > n ? `${t.slice(0, n - 1)}…` : t)

export function buildNav() {
  const site = (id, label, keys, route, desc) => ({ id: `site:${id}`, group: 'Site texts', label, route, desc, target: () => draft.site, only: keys })
  const home = [
    { id: 'home:hero', group: 'Home page', label: 'Hero', route: '/', desc: 'The first screen: name, headline and photo.', target: () => draft.home.hero },
    ...draft.home.sections.map((s, i) => ({
      id: `home:sec:${i}`, group: 'Home page', label: `${s.number ?? ''} ${s.title ?? s.id}`.trim(), route: `/#section-${s.id}`,
      desc: `Home section "${s.display}" — shown in this order, top to bottom.`, target: () => draft.home.sections[i], list: { arr: draft.home.sections, i },
    })),
    { id: 'home:experience', group: 'Home page', label: 'Experience teaser', route: '/#teaser-title', desc: 'The "Behind the work" block above the closing call-to-action.', target: () => draft.home.experience },
    { id: 'home:cta', group: 'Home page', label: 'Closing call-to-action', route: '/#cta-title', desc: 'Also closes the About and Experience pages.', target: () => draft.home.cta },
  ]
  const projects = draft.projects.map((p, i) => ({
    id: `projects:${i}`, group: 'Projects', label: short(p.title || p.slug || 'New project'), route: `/projects/${p.slug}`,
    desc: `Project page /projects/${p.slug} — also feeds the Work page and the home page.`, target: () => draft.projects[i], list: { arr: draft.projects, i },
  }))
  const captions = draft.captions.map((g, i) => ({
    id: `captions:${i}`, group: 'Captions', label: short(g.title || 'Ungrouped', 38), route: g.title.includes(' · ') ? `/projects/${g.title.split(' · ')[0]}` : '/work',
    desc: 'Text shown under the Instagram posts of this project chapter.', captions: () => draft.captions[i], list: { arr: draft.captions, i },
  }))
  return [
    site('identity', 'Identity', siteGroupKeys.identity, '/'),
    site('contact', 'Contact details', siteGroupKeys.contact, '/contact'),
    site('about', 'About page', siteGroupKeys.about, '/about'),
    site('experience', 'Experience page', siteGroupKeys.experience, '/experience'),
    site('contactPage', 'Contact page', siteGroupKeys.contactPage, '/contact'),
    ...home, ...projects, ...captions,
  ].map((e) => {
    const desc = {
      'site:identity': 'Name, job title and tagline — header, footer, browser tab and About page.',
      'site:contact': 'Email, phone and social links — menu, footer, Contact page and closing call-to-action.',
      'site:about': 'About page: summary, skills, studies, certificates, publications and tools.',
      'site:experience': 'Experience page and the CV download button.',
      'site:contactPage': 'Headline and availability line on the Contact page.',
    }[e.id]
    return desc ? { ...e, desc } : e
  })
}

export const newProject = () => ({
  slug: 'new-project', title: 'New project', subtitle: '', categories: [], summary: '', meta: [], overview: [''],
  theme: { bg: '#1c1a17', fg: '#f4f0e9', accent: '#e4482a' }, sections: [{ title: 'Selected Work', body: [], links: [] }],
})
