// =============================================================================
//  HOME PAGE CONFIG — everything on the home page.
//  Edit + save → the site updates by itself (`npm run dev`). For the live site: `npm run build`.
//
//  The home page is built around five capabilities. Each one shows real work from the projects in
//  projects.config.js — nothing is duplicated: write the projects once, point to them from here.
//
//  HOW TO POINT TO EXISTING WORK
//    { project: 'creatures', ref: 'Dc8Kw3HFnXy' }
//      project  slug of a project in projects.config.js
//      ref      any unique piece of the link's URL — for Instagram the code after /p/ or /reel/,
//               for TikTok the video number, for YouTube the video id, or a word from an article URL
//      part     (optional) the chapter label of that project ('01', '03 · C' …) → "View project"
//               opens that chapter of the project page
//      label    (optional) your own caption for the sample
//
//  ORDER / REMOVING A SECTION: `sections` below is shown top to bottom — reorder or delete entries.
//  `display` chooses the layout: campaign · brands · concepts · voices · video
//
//  The text shown under every Instagram post comes from captions.config.js (keyed by the post's code).
//  { placeholder: 'name' } in a list = an empty slot, clearly marked on the page, to fill in later.
//  Colours (`theme`) are design choices — change freely.  `*word*` = serif italics.
// =============================================================================

export const home = {
  // ───────────────────────────────────────────────────────────────────────────
  //  HERO
  // ───────────────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Gabriella Kasapi',
    mark: 'GK',
    headline: ['CREATIVE MARKETING', '& BRAND COMMUNICATIONS', '*Professional*'],
    statement: 'Blending strategy, storytelling and creative thinking to build meaningful connections between brands and people.',
    image: '/images/demo/25.jpg', // TEMPORARY demo photo (images: next phase)
    imagePosition: '50% 30%',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    //  01 — CAMPAIGN DEVELOPMENT  (one campaign, presented like a campaign)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'campaign',
      display: 'campaign',
      number: '01',
      eyebrow: '01 / STRATEGY & EXECUTION',
      title: 'Campaign Development',
      description: 'From the initial insight to the big idea, creating campaigns that connect brands with their audiences.',
      featured: {
        project: 'douleutaras',
        part: '01',
        name: 'Douleutaras — Student Campaign',
        slogan: ['«Σπίτι βρήκες!', 'Douleutaras μπήκες;»'],
        theme: { bg: '#1d4fd7', fg: '#ffffff', accent: '#ffd23f' },
        keyVisual: '', // an image path ('/images/…') replaces the typographic key visual
        meta: [
          { label: 'Client', value: 'Douleutaras' },
          { label: 'Role', value: 'Marketing Intern · Jul – Oct 2022' },
          { label: 'Audience', value: 'First-year university students and young adults aged 18–24 setting up their first home' },
          { label: 'Channels', value: 'Facebook, Instagram, TikTok, YouTube — paid and organic, plus PR and website content' },
        ],
        contribution: [
          'Audience Insights & Concept Development',
          'Campaign Slogan & Key Visual',
          'YouTube Bumper Ad & Video Production',
          'Facebook, Instagram, TikTok & YouTube Advertising',
          'Organic Social Media Content',
          'Native Articles & Digital PR',
          'Landing Page Development',
          'Blog Content Editing & SEO Optimization',
        ],
        video: { project: 'douleutaras', ref: 'NADMRcrluy8', label: 'YouTube Bumper Ad' },
        posts: [
          { project: 'douleutaras', ref: 'CiNemlOK3ZZ' },
          { project: 'douleutaras', ref: 'CiSadtnKRe2' },
        ],
        cta: 'View the campaign',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    //  02 — BRAND & CONTENT STRATEGY  (interactive brand selector)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'brands',
      display: 'brands',
      number: '02',
      eyebrow: '02 / BRAND THINKING',
      title: 'Brand & Content Strategy',
      description: 'Shaping distinctive brand voices and content strategies that make brands recognizable, relevant and engaging.',
      brands: [
        {
          name: 'CReatures Agency',
          label: 'Social Media Strategy',
          insight: 'Communicating the identity, philosophy, people and creative capabilities of an agency.',
          project: 'creatures',
          part: '01',
          theme: { bg: '#1c1a17', fg: '#f4f0e9', accent: '#e4482a' },
          examples: [
            { project: 'creatures', ref: 'Dc8Kw3HFnXy' },
            { project: 'creatures', ref: 'DdgN4xMlGlT' },
            { project: 'creatures', ref: 'DeMlC7AlulT' },
          ],
        },
        {
          name: 'CR Studio',
          label: 'Brand & Content Development',
          insight: 'Introducing a new production studio and communicating its identity and capabilities.',
          project: 'creatures',
          part: '02',
          theme: { bg: '#e9dccb', fg: '#241a12', accent: '#8a3b1e' },
          // The PDF only has CR Studio's Instagram profile (no posts yet) → two empty slots to fill in.
          examples: [
            { project: 'creatures', ref: 'cr_studio_production_space', label: 'CR Studio — Instagram profile' },
            { placeholder: 'CR Studio post', project: 'creatures', part: '02' },
            { placeholder: 'CR Studio post', project: 'creatures', part: '02' },
          ],
        },
        {
          name: 'Μπαρ Μπεε Κιου',
          label: 'Social Media Strategy',
          insight: 'Strengthening engagement while preserving an established brand personality and humorous tone of voice.',
          project: 'creatures',
          part: '04',
          theme: { bg: '#f2c230', fg: '#171717', accent: '#171717' },
          examples: [
            { project: 'creatures', ref: 'DfCOO_cCFLa' },
            { project: 'creatures', ref: 'DdtoYomCODD' },
            { project: 'creatures', ref: 'DdYixmuCPGZ' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    //  03 — CREATIVE CONCEPTS & BRAND ACTIVATIONS  (two concept boards)
    //  style: 'quiz' (answer-style steps) | 'hunt' (route with an X at the end)
    //  beats: the challenge → the concept → the experience (texts from the portfolio PDF)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'concepts',
      display: 'concepts',
      number: '03',
      eyebrow: '03 / THE BIG IDEA',
      title: 'Creative Concepts & Brand Activations',
      description: 'Turning creative ideas into interactive experiences that spark curiosity, participation and connection.',
      boards: [
        {
          style: 'quiz',
          name: 'Η ΠΟΛΗ ΖΕΙ',
          title: 'Interactive Branded Content',
          project: 'i-poli-zei-free-press',
          part: '01',
          theme: { bg: '#f2c230', fg: '#171717', accent: '#171717' },
          focus: ['Interactive advertising concepts', 'Quiz idea development', 'Creative audience engagement', 'Brand integration through entertainment'],
          beats: [
            { label: 'The challenge', text: 'Moving beyond conventional native articles and standard advertising formats, the objective was to create interactive experiences that invite readers to actively engage with a brand.' },
            { label: 'The concept', text: 'Playful, nostalgic and entertaining formats that introduce brand identities, encourage participation and offer a more personalized experience through quiz-based content.' },
            { label: 'The experience', text: 'Published examples: «Τόλμησε να το κάνεις… Chillico!» and the Midnight Circus x Κουραφέλκυθρα summer quiz / competition.' },
          ],
          examples: [
            { project: 'i-poli-zei-free-press', ref: 'tolmhse-na-to-kaneis-chillico' },
            { project: 'i-poli-zei-free-press', ref: 'midnight-circus' },
          ],
        },
        {
          style: 'hunt',
          name: 'CReatures BOX',
          title: 'Real-Life Treasure Hunt',
          project: 'creatures',
          part: '03 · C',
          theme: { bg: '#0d2229', fg: '#eaf3f2', accent: '#ff8a5c' },
          focus: ['Creative concept development', 'Experiential marketing', 'Treasure hunt mechanics', 'Riddle writing', 'Brand collaboration', 'Participation-driven content'],
          beats: [
            { label: 'The challenge', text: 'A recurring brand activation developed in collaboration with a different partner brand each month.' },
            { label: 'The concept', text: 'Rather than a conventional giveaway, audience participation becomes a real-life treasure hunt.' },
            { label: 'The experience', text: 'A box containing gifts is hidden somewhere in Athens, and participants must follow clues, solve riddles and find its location.' },
          ],
          examples: [
            { project: 'creatures', ref: 'Deg9uk0guFE' },
            { project: 'creatures', ref: 'De9Pdw0D3-W' },
            { project: 'creatures', ref: 'Deb-1KgAVZe' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    //  04 — COPYWRITING & BRAND VOICE  (pick a voice: the whole post, and its information pulled
    //  apart into floating badges around it)
    //    post     the embedded post (its text + hashtags come from captions.config.js)
    //    samples  (optional) lines to set in type instead of the post's own text
    //    also     (optional) more links shown as badges
    //    style    how the text is set: shout | serif | headline | list
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'voices',
      display: 'voices',
      number: '04',
      eyebrow: '04 / WORDS WITH PURPOSE',
      title: 'Copywriting & Brand Voice',
      description: 'Finding the right words, tone and message to give every brand its own distinctive voice.',
      prompt: 'Choose a voice',
      voices: [
        {
          tone: 'Playful & humorous',
          brand: 'Douleutaras',
          context: 'Social media captions for a student audience',
          style: 'shout',
          source: 'Caption of the original Instagram post',
          post: { project: 'douleutaras', ref: 'CiIOKkiJ9fP' },
        },
        {
          tone: 'Creative & conversational',
          brand: 'CReatures',
          context: 'Social media captions for a creative agency',
          style: 'serif',
          source: 'Caption of the original Instagram reel',
          post: { project: 'creatures', ref: 'DbdKbA3iA4U' },
        },
        {
          tone: 'Editorial & thought-provoking',
          brand: 'Η ΠΟΛΗ ΖΕΙ',
          context: 'Headlines for editorial features',
          style: 'headline',
          samples: ['Τα dating apps πεθαίνουν, πάμε πίσω στην πραγματική ζωή', 'Ξέρω πόσα παγωτά έφαγες φέτος το καλοκαίρι!'],
          source: 'Published article titles',
          post: { project: 'i-poli-zei-free-press', ref: 'ta-dating-apps' },
          also: [{ project: 'i-poli-zei-free-press', ref: 'xerw-posa-pagwta', label: 'The second article' }],
        },
        {
          tone: 'Clear & informative',
          brand: 'Pubs On 2 Wheels',
          context: 'YouTube titles and thumbnails',
          style: 'list',
          samples: ['CFMOTO 450MT Long Term Review', 'Ο εξοπλισμός μας για ένα ταξίδι 5000+ χλμ', 'Φάγαμε Τούμπα', 'Trip to Moldova · Part 2 — Romania'],
          source: 'Titles from the video thumbnails in the portfolio PDF',
          post: { project: 'pubs-on-2-wheels', ref: 'DcJeHaANDLq' },
          also: [{ project: 'pubs-on-2-wheels', ref: 'pubs_on2wheels', label: 'YouTube channel' }],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    //  05 — STORYTELLING & VIDEO CONTENT  (four different approaches)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'video',
      display: 'video',
      number: '05',
      eyebrow: '05 / STORIES THAT CONNECT',
      title: 'Storytelling & Video Content',
      description: 'Bringing ideas to life through visual narratives that capture attention and create meaningful connections.',
      // the last slot of the grid — a way into the full projects (delete `more` to remove it)
      more: { eyebrow: 'There is more', text: 'The full stories live in the projects', label: 'See all work', to: '/work' },
      // note: shown only when a post has no text of its own (e.g. TikTok)
      items: [
        { project: 'creatures', ref: 'DdB9o2WD2zg', category: 'Agency storytelling', label: 'CReatures Agency — Instagram Reel' },
        { project: 'creatures', part: '03 · B', ref: 'Dcx7AdqiYAV', category: 'Event communication', label: 'Piraeus Port Film Festival 2026 — Instagram Reel' },
        { project: 'pubs-on-2-wheels', ref: 'Db6J0Dxt1vr', category: 'Short-form adaptation', label: 'Pubs On 2 Wheels — Instagram Reel' },
        { project: 'creatures', part: '04', ref: 'DfEzH6rRlVA', category: 'Brand personality', label: 'Μπαρ Μπεε Κιου — Instagram Reel' },
        {
          project: 'douleutaras', part: '03', ref: '7143199445738409222', category: 'Channel launch', label: 'Douleutaras — TikTok',
          note: "From research and strategy to the first videos of the brand's TikTok presence.",
        },
      ],
    },
  ],

  // ───────────────────────────────────────────────────────────────────────────
  //  EXPERIENCE TEASER
  // ───────────────────────────────────────────────────────────────────────────
  experience: {
    eyebrow: 'BEHIND THE WORK',
    headline: ['THE EXPERIENCE', 'BEHIND THE *ideas.*'],
    statement: 'From advertising agencies and brand communication to editorial projects, digital campaigns and creative storytelling.',
    description: 'A closer look at the projects, collaborations and experiences that shaped my creative perspective.',
    cta: 'Explore My Experience',
    to: '/experience',
  },

  // ───────────────────────────────────────────────────────────────────────────
  //  FINAL CALL-TO-ACTION  (also closes the About and Experience pages)
  // ───────────────────────────────────────────────────────────────────────────
  cta: {
    eyebrow: 'Available for new opportunities',
    headline: ["LET'S CREATE", '*something*', 'WORTH REMEMBERING.'],
    button: 'Get in Touch',
  },
}
