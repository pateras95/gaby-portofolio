// =============================================================================
//  SITE CONFIG — every text, link and fact of the website lives here.
//  Edit + save → the site updates by itself (`npm run dev`). For the live site: `npm run build`.
//
//  ┌─────────────────────────────────────────────────────────────────────────┐
//  │  WHAT DO YOU WANT TO CHANGE?            →  WHERE                        │
//  ├─────────────────────────────────────────────────────────────────────────┤
//  │  Name, job title, header tagline        →  1. IDENTITY                  │
//  │  Email, phone, LinkedIn, TikTok…        →  2. CONTACT DETAILS           │
//  │  Home page texts (hero, quote, closing) →  3. HOME PAGE                 │
//  │  About page (summary, skills, studies,  →  4. ABOUT PAGE                │
//  │    certificates, publications, tools)                                   │
//  │  Experience page + CV download          →  5. EXPERIENCE PAGE           │
//  │  Contact page headline / availability   →  6. CONTACT PAGE              │
//  │  Projects, case studies, embedded work  →  projects.config.js           │
//  └─────────────────────────────────────────────────────────────────────────┘
//
//  Anything left empty ('' or []) is simply hidden — nothing breaks.
//  `*word*` inside a headline is shown in serif italics.
//  Lines marked TODO are placeholder copy that is not in the CV / portfolio PDF.
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
//  1. IDENTITY  — header, browser tab title, footer, About page
// ─────────────────────────────────────────────────────────────────────────────
const identity = {
  name: 'Gabriella Kasapi',
  initials: 'GK',
  title: 'Marketing & Brand Communication | Strategy & Storytelling', // About page, under the name
  descriptor: 'Marketing & Brand Communication', // small line under the name in the header
}

// ─────────────────────────────────────────────────────────────────────────────
//  2. CONTACT DETAILS  — menu, footer, contact page, closing call-to-action
// ─────────────────────────────────────────────────────────────────────────────
const contact = {
  email: 'kasapi.gabriella@gmail.com',
  phone: '+30 694 571 8195', // shown on the Contact page only (public once deployed — clear it to hide)
  location: '', // e.g. 'Athens, Greece'
  socials: [
    { label: 'LinkedIn', handle: 'in/gabriella-kasapi-', href: 'https://www.linkedin.com/in/gabriella-kasapi-' },
    { label: 'TikTok', handle: '@gaby.kasapi', href: 'https://www.tiktok.com/@gaby.kasapi' },
    { label: 'Instagram', handle: '', href: '' }, // add a link to show it
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
//  3. HOME PAGE  — TODO: placeholder copy, the home page will be redesigned
// ─────────────────────────────────────────────────────────────────────────────
const home = {
  hero: {
    lines: ['IDEAS THAT', '*connect.*', 'STORIES THAT', '*stay.*'],
    sub: 'Marketing & brand communication. Strategy & storytelling.',
    image: '/images/demo/25.jpg', // TEMPORARY demo photo
    imagePosition: '50% 30%',
  },
  philosophy: {
    lines: ['GOOD MARKETING', "ISN'T JUST *seen.*", "IT'S *felt.*"],
    text: 'Skilled in understanding brand personalities, identifying audience characteristics and uncovering what makes a brand distinctive.',
  },
  cta: ["LET'S CREATE", '*something*', 'THAT MATTERS.'], // closing call-to-action (links to your first contact detail)
}

// ─────────────────────────────────────────────────────────────────────────────
//  4. ABOUT PAGE  — from the CV
// ─────────────────────────────────────────────────────────────────────────────
const about = {
  headline: ['CREATIVE THINKING.', 'STRATEGIC *instinct.*'],
  portrait: '', // e.g. '/images/portrait.jpg' — empty shows a placeholder (images: next phase)

  summary:
    'Marketing & Communication graduate with a strategic and creative approach to branding. Skilled in understanding brand personalities, identifying audience characteristics and uncovering what makes a brand distinctive. Combines strategic thinking, creative concept development, visual storytelling and copywriting to translate brand identities into meaningful, engaging and audience-relevant communication.',

  // Also used as the moving ticker on the Home page.
  coreSkills: [
    'Strategic Thinking',
    'Brand Strategy & Positioning',
    'Brand & Audience Insight',
    'Brand Communication & Voice Development',
    'Strategic Storytelling & Copywriting',
    'Creative Concept Development',
    'Visual Storytelling & Art Direction',
    'Market Research & Audience Analysis',
  ],

  education: [
    { years: '2018–2022', degree: 'Bachelor of Marketing & Communication', institution: 'Athens University of Economics and Business' },
  ],

  certificates: [
    { title: 'Business Branding With Personality', issuer: 'Udemy' },
    { title: 'Consumer Neuroscience and Neuromarketing', issuer: 'Copenhagen Business School' },
    { title: 'Client and Account Management', issuer: 'Udemy' },
    { title: 'AI Marketing', issuer: 'Workearly Diploma' },
    { title: 'ChatGPT Complete Guide', issuer: 'Udemy' },
    { title: 'The Strategy of Content Marketing', issuer: 'University of California, Davis' },
  ],

  publications: [
    { kind: 'Poetry book', title: 'σΤα καλύτΕΡά μΑΣ', publisher: 'Pigi Publications', date: '09/2024' },
    { kind: 'Poetry book', title: 'Ένας μήνας και κάτι', publisher: 'I. Sideris Publications', date: '02/2017' },
    { kind: 'Short story in the anthology', title: 'κάνε μία Αμαρτία', publisher: 'Logotypo Publications', date: '12/2025' },
    { kind: 'Published articles', title: 'Η ΠΟΛΗ ΖΕΙ', publisher: '', date: '2025–2026' },
  ],

  tools: ['Canva', 'SPSS', 'MS Office', 'Weebly', 'ChatGPT', 'Iconosquare', 'Metricool', 'Mailchimp'],
  languages: ['Greek', 'English'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  5. EXPERIENCE PAGE  — from the CV
//  Each entry: company, role, period, note (e.g. "Volunteer role"), bullets, project.
//  `project` is the slug of a project in projects.config.js (adds a "View project" link).
// ─────────────────────────────────────────────────────────────────────────────
const experience = {
  headline: ['A career,', 'framed in', '*chapters.*'],

  jobs: [
    {
      company: 'CReatures CReative Studio', role: 'Social Media Manager', period: 'Jul 2026 – Present', note: '', project: 'creatures',
      bullets: [
        'Contribute to branding and communication strategy for the studio and partner brands, supporting brand positioning, identity and digital presence.',
        'Translate brand objectives and audience insights into content strategies, creative concepts and campaigns; coordinate production from concept to publication.',
        'Monitor performance and support content optimization through KPIs, analytics and AI-powered tools.',
      ],
    },
    {
      company: 'Pubs On 2 Wheels', role: 'Digital Marketing & Content Strategist', period: 'Apr 2026 – Present', note: 'Volunteer role', project: 'pubs-on-2-wheels',
      bullets: [
        'Leading the digital presence of Pubs On 2 Wheels, an adventure riding content creators team, combining brand development, strategic planning and hands-on content execution.',
        'Guiding and mentoring creators, sharing knowledge and building their capabilities in content creation and platform management.',
      ],
    },
    {
      company: 'Η ΠΟΛΗ ΖΕΙ', role: 'Advertising & Business Development Representative', period: 'Jan 2025 – May 2026', note: '', project: 'i-poli-zei-free-press',
      bullets: [
        'Contributed to commercial strategy and content planning initiatives.',
        'Built and managed a client portfolio, developing long-term business relationships.',
        'Identified client needs, proposed tailored advertising solutions and negotiated commercial agreements.',
      ],
    },
    {
      company: 'ATHENS VOICE', role: 'Journalism Intern', period: 'Sep 2023 – Oct 2023', note: '', project: '',
      bullets: ['Researched and wrote Native and Advertorial articles, adapting brand messages to editorial formats and audiences.'],
    },
    {
      company: 'Douleutaras', role: 'Marketing Intern', period: 'Jul 2022 – Oct 2022', note: '', project: 'douleutaras',
      bullets: [
        'Managed content across Meta, TikTok, website and newsletters, contributing to content strategy, brand communication and editorial planning.',
        'Developed content pillars, creative briefs and content calendars aligned with brand identity and communication objectives.',
        "Managed the company's TikTok presence from its early stages and monitored performance through analytics and reporting.",
        "Contributed to the planning and execution of the brand's first in-house marketing campaign, while supporting SEO initiatives and cross-team collaboration.",
      ],
    },
    {
      company: 'TEDxAUEB', role: 'Marketing Manager', period: 'Nov 2021 – Jun 2022', note: 'Volunteer role', project: 'tedxaueb-2022',
      bullets: ["Led social media and communication, contributing to event awareness and TEDxAUEB's largest sold-out event."],
    },
  ],

  independent: [
    {
      company: 'Independent Marketing Projects', role: 'Marketing Consultant', period: 'Nov 2024 – Present', note: '', project: '',
      bullets: ['Conducting research and providing tailored marketing strategies and practical action plans.'],
    },
    {
      company: 'Greek Eco Project', role: 'Digital Marketing Manager', period: 'Feb 2021 – May 2021', note: '', project: '',
      bullets: ['Managed digital marketing activities for an environmental non-profit organization.'],
    },
  ],

  // Put your CV PDF in /public (e.g. /cv.pdf) and set href: '/cv.pdf' to enable the download button.
  cv: { href: '', label: 'Download CV' },
}

// ─────────────────────────────────────────────────────────────────────────────
//  6. CONTACT PAGE  — TODO: placeholder copy
// ─────────────────────────────────────────────────────────────────────────────
const contactPage = {
  headline: ['THE NEXT GREAT', '*story*', 'STARTS HERE.'],
  availability: 'Open to new opportunities with creative agencies, advertising agencies, branding studios and marketing teams.',
}

export const site = { ...identity, ...contact, home, about, experience, contactPage }
