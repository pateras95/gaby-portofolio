// ============================================================================
// Portfolio projects — DEMO content (fictional clients, lorem ipsum).
//
// To change a project, edit the object below. To change an image, replace the
// file in /public/images/demo/ (same name) or point photo()/src to a new file.
//
// Gallery blocks are data-driven. Supported layouts:
//   full        1 image, full width
//   landscape   1 image, inset with caption
//   two         2 images, side by side
//   asymmetric  3 images, editorial grid
//   portrait    2 portrait images, staggered
//   spread      2 images as a magazine spread mockup
//   video       placeholder poster (add `video: '/clip.mp4'` for a real video)
//   quote       large typographic quote { text, cite }
// ============================================================================

const photo = (n) => `/images/demo/${n}.jpg`
const img = (n, alt) => ({ src: photo(n), alt })

const full = (n, alt, caption) => ({ layout: 'full', images: [img(n, alt)], caption })
const landscape = (n, alt, caption) => ({ layout: 'landscape', images: [img(n, alt)], caption })
const two = (a, b, alt) => ({ layout: 'two', images: [img(a, alt), img(b, alt)] })
const asymmetric = (a, b, c, alt) => ({ layout: 'asymmetric', images: [img(a, alt), img(b, alt), img(c, alt)] })
const portrait = (a, b, alt) => ({ layout: 'portrait', images: [img(a, alt), img(b, alt)] })
const spread = (a, b, alt) => ({ layout: 'spread', images: [img(a, alt), img(b, alt)] })
const video = (n, label) => ({ layout: 'video', images: [img(n, label)], label })
const quote = (text, cite) => ({ layout: 'quote', text, cite })

const L = {
  short: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  about: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ],
  challenge: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
  strategy: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  outcome: [
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.',
    'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
  ],
}

export const projects = [
  {
    id: 1,
    slug: 'the-narrative-project',
    title: 'The Narrative Project',
    client: 'Maison Aurèle',
    year: 2025,
    type: 'Brand campaign',
    categories: ['Branding', 'Storytelling'],
    industry: 'Fashion & Lifestyle',
    role: 'Brand Strategy, Creative Direction',
    deliverables: ['Brand narrative', 'Campaign concept', 'Film script', 'Launch plan'],
    description: L.short,
    heroImage: photo('08'),
    heroPosition: '50% 50%',
    thumbnailImage: photo('08'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'Every brand is a story waiting to be told.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#1c1a17', fg: '#f4f0e9', accent: '#e4482a' },
    gallery: [
      full('11', 'Demo campaign still', 'Fig. 01 — Demo campaign still'),
      two('36', '33', 'Demo portrait'),
      quote('A campaign should feel like the first line of a story you want to finish.', 'Placeholder quote'),
      asymmetric('31', '08', '11', 'Demo visual'),
      video('08', 'Campaign film'),
    ],
  },
  {
    id: 2,
    slug: 'culture-in-motion',
    title: 'Culture in Motion',
    client: 'Studio Vanta',
    year: 2025,
    type: 'Advertising campaign',
    categories: ['Advertising'],
    industry: 'Music & Entertainment',
    role: 'Creative Strategy, Copywriting',
    deliverables: ['Out-of-home', 'Social cut-downs', 'Press kit', 'Copy platform'],
    description: L.short,
    heroImage: photo('04'),
    heroPosition: '50% 35%',
    thumbnailImage: photo('25'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'Turn the street into the stage.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#f2c230', fg: '#171717', accent: '#171717' },
    gallery: [
      full('26', 'Demo advertising visual'),
      portrait('25', '28', 'Demo fashion visual'),
      quote('Ads are interruptions. Culture is an invitation.', 'Placeholder quote'),
      asymmetric('29', '04', '25', 'Demo visual'),
      landscape('26', 'Demo landscape ad', 'Fig. 04 — Demo advertising layout'),
    ],
  },
  {
    id: 3,
    slug: 'beyond-the-ordinary',
    title: 'Beyond the Ordinary',
    client: 'Northform',
    year: 2024,
    type: 'Creative direction',
    categories: ['Strategy', 'Advertising'],
    industry: 'Architecture & Design',
    role: 'Creative Direction, Art Direction',
    deliverables: ['Visual language', 'Art direction', 'Photography brief'],
    description: L.short,
    heroImage: photo('12'),
    heroPosition: '50% 40%',
    thumbnailImage: photo('12'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'Look up. The extraordinary is already here.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#dfe7ee', fg: '#10202e', accent: '#2457c5' },
    gallery: [
      full('07', 'Demo landscape'),
      two('34', '22', 'Demo visual'),
      quote('Ordinary is just extraordinary that nobody framed properly.', 'Placeholder quote'),
      asymmetric('06', '12', '34', 'Demo visual'),
      landscape('22', 'Demo landscape', 'Fig. 05 — Demo location study'),
    ],
  },
  {
    id: 4,
    slug: 'printed-stories',
    title: 'Printed Stories',
    client: 'Folio Quarterly',
    year: 2024,
    type: 'Magazine editorial',
    categories: ['Editorial', 'Storytelling'],
    industry: 'Publishing',
    role: 'Editorial Concept, Content Creation',
    deliverables: ['Issue concept', 'Feature stories', 'Cover direction', 'Newsletter'],
    description: L.short,
    heroImage: photo('02'),
    heroPosition: '50% 50%',
    thumbnailImage: photo('13'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'Paper still has the loudest silence.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#e8dfd0', fg: '#2a1f14', accent: '#9b2d1f' },
    gallery: [
      spread('13', '17', 'Demo magazine spread'),
      full('01', 'Demo editorial still'),
      quote('Print is slow on purpose. That is the whole point.', 'Placeholder quote'),
      portrait('17', '13', 'Demo editorial portrait'),
      asymmetric('18', '01', '02', 'Demo visual'),
    ],
  },
  {
    id: 5,
    slug: 'a-different-perspective',
    title: 'A Different Perspective',
    client: 'Kōri Studio',
    year: 2024,
    type: 'Social media strategy',
    categories: ['Social Media', 'Strategy'],
    industry: 'Retail & E-commerce',
    role: 'Social Strategy, Content Creation',
    deliverables: ['Channel strategy', 'Content pillars', 'Creator briefs', 'Editorial calendar'],
    description: L.short,
    heroImage: photo('10'),
    heroPosition: '50% 40%',
    thumbnailImage: photo('10'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'Post like a person, not like a brand.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#f3d6d0', fg: '#2b1210', accent: '#c4301f' },
    gallery: [
      full('19', 'Demo social visual'),
      portrait('37', '19', 'Demo social portrait'),
      quote('The feed is a conversation. Start one worth joining.', 'Placeholder quote'),
      asymmetric('23', '37', '39', 'Demo visual'),
      video('10', 'Social reel'),
    ],
  },
  {
    id: 6,
    slug: 'human-connections',
    title: 'Human Connections',
    client: 'Common Ground',
    year: 2023,
    type: 'Storytelling campaign',
    categories: ['Storytelling', 'Social Media'],
    industry: 'Non-profit & Community',
    role: 'Narrative Strategy, Content Direction',
    deliverables: ['Story series', 'Interview format', 'Photography', 'Community plan'],
    description: L.short,
    heroImage: photo('32'),
    heroPosition: '50% 50%',
    thumbnailImage: photo('35'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'People remember people, never press releases.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#cfd8c4', fg: '#14210f', accent: '#2f6b2a' },
    gallery: [
      full('03', 'Demo field'),
      portrait('35', '21', 'Demo portrait'),
      quote('Behind every statistic there is a face that deserves a name.', 'Placeholder quote'),
      two('24', '35', 'Demo portrait'),
      landscape('32', 'Demo people', 'Fig. 03 — Demo story session'),
    ],
  },
  {
    id: 7,
    slug: 'brand-evolution',
    title: 'Brand Evolution',
    client: 'Atelier Lune',
    year: 2023,
    type: 'Brand identity',
    categories: ['Branding'],
    industry: 'Fashion & Retail',
    role: 'Brand Positioning, Identity Direction',
    deliverables: ['Positioning', 'Identity system', 'Tone of voice', 'Guidelines'],
    description: L.short,
    heroImage: photo('14'),
    heroPosition: '50% 50%',
    thumbnailImage: photo('14'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'Keep the soul. Change everything else.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#ebe6dc', fg: '#1b1b1b', accent: '#b9856a' },
    gallery: [
      full('40', 'Demo identity visual'),
      portrait('15', '40', 'Demo flat lay'),
      quote('A brand grows the way people do: without forgetting who they were.', 'Placeholder quote'),
      asymmetric('20', '15', '09', 'Demo visual'),
      landscape('09', 'Demo interior', 'Fig. 02 — Demo brand environment'),
    ],
  },
  {
    id: 8,
    slug: 'the-next-chapter',
    title: 'The Next Chapter',
    client: 'Horizon & Co.',
    year: 2022,
    type: 'Integrated marketing campaign',
    categories: ['Advertising', 'Strategy', 'Branding'],
    industry: 'Travel & Hospitality',
    role: 'Campaign Strategy, Creative Direction',
    deliverables: ['Campaign platform', 'Film', 'Print & OOH', 'Social roll-out', 'Partnerships'],
    description: L.short,
    heroImage: photo('16'),
    heroPosition: '50% 60%',
    thumbnailImage: photo('16'),
    about: L.about,
    challenge: L.challenge,
    strategy: { idea: 'The best trips begin with a blank page.', text: L.strategy },
    outcome: L.outcome,
    theme: { bg: '#0f2a33', fg: '#eaf3f2', accent: '#ff8a5c' },
    gallery: [
      full('00', 'Demo forest'),
      two('30', '05', 'Demo landscape'),
      quote('Where do you want your story to go next?', 'Placeholder quote'),
      asymmetric('38', '30', '00', 'Demo visual'),
      video('16', 'Campaign film'),
    ],
  },
]

export const categories = ['All Work', 'Branding', 'Advertising', 'Social Media', 'Editorial', 'Strategy', 'Storytelling']

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export function getNextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
