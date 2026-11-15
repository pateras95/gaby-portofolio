// =============================================================================
//  PROJECTS — everything shown on the Home, Work and project pages.
//  Edit and save: the site updates by itself (npm run dev). For the live site, run
//  `npm run build` again. The content below comes from "GABRIELLA KASAPI - PORTFOLIO.pdf"
//  and the CV (roles / periods). Site-wide texts live in site.config.js.
//
//  A project:
//    slug        URL part  (/projects/<slug>)  — lowercase, no spaces
//    title       big headline            subtitle   line under the title
//    categories  filters on the Work page (new names appear automatically)
//    summary     short text used on cards          year  (optional)
//    meta        small facts: [{ label, value }]   stats (optional): [{ value, label, detail }]
//    overview    intro paragraphs                  image / imagePosition   (TEMPORARY demo photo)
//    theme       { bg, fg, accent } colours of the project's panel
//    sections    blocks of the page  — OR —  parts: numbered chapters that each hold sections
//
//  A section:   { title, body: [...], links: [...] }
//    body   strings = paragraphs · an array = bullet list · { lead, text } = bold lead + text
//    links  "https://..." (label is generated: Instagram Reel 1, TikTok video 2 …)
//           or { label: "My label", url: "https://..." }
//           Instagram, TikTok, YouTube, Issuu, LinkedIn posts and article pages are shown
//           embedded directly on the page (Instagram with its caption). Other links (profiles,
//           channels) get a plain card. Every sample also has an "Open on …" link.
//           Add  embed: false  to a link to show only the card.
//  Empty things are simply not shown.
// =============================================================================

export const projects = [
  {
    slug: "douleutaras",
    title: "Douleutaras",
    subtitle: "Social Media Strategy | Campaign Development",
    categories: ["Social Media", "Campaigns"],
    summary: "Three-month internship in the Marketing Department: refreshing the brand's digital communication, developing new channels and reaching new audiences.",
    meta: [
      { label: "Role", value: "Marketing Intern" },
      { label: "Period", value: "Jul 2022 – Oct 2022" },
    ],
    overview: [
      "During my three-month internship in Douleutaras' Marketing Department, I contributed to the planning and implementation of initiatives aimed at refreshing the brand's digital communication, developing new channels and reaching new audiences.",
    ],
    parts: [
      {
        label: "01",
        title: "Student Campaign — «Σπίτι βρήκες! Douleutaras μπήκες;»",
        overview: [
          "Contributed to the development and execution of an integrated campaign targeting a new audience segment: first-year university students and young adults aged 18–24 setting up their first home.",
          "The campaign combined paid advertising across Facebook, Instagram, TikTok and YouTube with supporting organic social media content, PR initiatives and website content.",
        ],
        sections: [
          {
            title: "My Contribution",
            body: [
              [
                "Audience Insights & Concept Development",
                "Campaign Slogan & Key Visual",
                "YouTube Bumper Ad & Video Production",
                "Facebook, Instagram, TikTok & YouTube Advertising",
                "Organic Social Media Content",
                "Native Articles & Digital PR",
                "Landing Page Development",
                "Blog Content Editing & SEO Optimization",
              ],
            ],
          },
          {
            title: "Selected Work",
            links: [
              { label: "YouTube Bumper Ad", url: "https://youtu.be/NADMRcrluy8" },
            ],
          },
          {
            title: "Supporting Organic Content",
            links: [
              "https://www.instagram.com/p/CiIOKkiJ9fP/",
              "https://www.instagram.com/p/CiNemlOK3ZZ/",
              "https://www.instagram.com/p/CiSadtnKRe2/",
            ],
          },
        ],
      },
      {
        label: "02",
        title: "Social Media Strategy & Content Development",
        overview: [
          "Contributed to the restructuring of the brand's communication across Instagram and Facebook through the development of a new content strategy and thematic content pillars.",
        ],
        sections: [
          {
            title: "Content Pillars",
            body: [
              [
                "Memes & Humor",
                "Tips & Educational Content",
                "Special Days",
                "Creative Quotes",
                "Reviews",
                "Interactive Stories (Quizzes, This or That, Q&A)",
              ],
            ],
          },
          {
            title: "Selected Work",
            links: [
              "https://www.instagram.com/p/CiaaAGuP3xF/",
              "https://www.instagram.com/p/CifV7nBqXeE/",
              "https://www.instagram.com/p/CivAVNiosRH/",
              "https://www.instagram.com/p/CkvG45OKYRp/",
            ],
          },
        ],
      },
      {
        label: "03",
        title: "TikTok — Channel Development",
        overview: [
          "Contributed to the creation and launch of Douleutaras' TikTok presence, from initial research and strategy development to the definition of content pillars and the production of the first videos.",
        ],
        sections: [
          {
            title: "Content Pillars",
            body: [
              ["Life at Douleutaras", "Our Services", "On The Job", "Epic Fails", "Tips"],
            ],
          },
          {
            title: "Selected Work",
            links: [
              "https://www.tiktok.com/@douleutaras/video/7143199445738409222",
              "https://www.tiktok.com/@douleutaras/video/7156603044715678982",
              "https://www.tiktok.com/@douleutaras/video/7158833506683063558",
            ],
          },
        ],
      },
    ],
    image: "/images/demo/20.jpg",
    imagePosition: "50% 50%",
    theme: { bg: "#1f3a5f", fg: "#f4f0e9", accent: "#ffb347" },
  },
  {
    slug: "creatures",
    title: "CReatures",
    subtitle: "Creative Agency & Brand Communication",
    categories: ["Social Media", "Content", "Events"],
    summary: "Social media strategy and content for a creative agency and its production studio, plus events, brand activations and a client account.",
    meta: [
      { label: "Role", value: "Social Media Manager" },
      { label: "Period", value: "Jul 2026 – Present" },
      { label: "Scope", value: "Social Media Strategy | Content Development | Creative Projects" },
    ],
    overview: [],
    parts: [
      {
        label: "01",
        title: "CReatures Creative Studio — Agency Social Media",
        overview: [
          "Social media strategy and content management for CReatures, with a focus on establishing a clear brand identity, communicating the agency's philosophy and showcasing its creative expertise.",
        ],
        sections: [
          {
            title: "Challenge & Strategy",
            body: [
              "When I took over the account, two key challenges stood out:",
              [
                "Lack of a clearly communicated brand identity. A new visitor to the Instagram profile could not immediately understand what the company does, what it stands for or what services it offers.",
                "High reach but low engagement, indicating that the content was not attracting or connecting with the right audience.",
              ],
              "The new strategy focused on making the agency's identity, work, people and philosophy immediately recognizable. The objective was to build trust, establish credibility, demonstrate expertise and create meaningful connections with an audience relevant to the agency's business goals.",
            ],
          },
          {
            title: "Content Strategy & Pillars",
            body: [
              [
                {
                  lead: "That's How We Think",
                  text: "Strategic thinking, marketing insights and industry perspectives to establish authority.",
                },
                {
                  lead: "Marketing Radar",
                  text: "Trends, news and developments across the marketing and creative industries.",
                },
                {
                  lead: "Backstage Stories",
                  text: "Behind-the-scenes content that showcases the agency's culture and everyday creative process.",
                },
                {
                  lead: "The Team",
                  text: "Introducing the people behind the work and building a more human brand identity.",
                },
                {
                  lead: "The Projects",
                  text: "Showcasing the agency's work, creative output and capabilities.",
                },
                {
                  lead: "The Services",
                  text: "Clearly communicating what the agency offers and how it creates value for its clients.",
                },
              ],
            ],
          },
          {
            title: "Selected Work",
            links: [
              "https://www.instagram.com/reel/DbdKbA3iA4U/",
              "https://www.instagram.com/p/Dc8Kw3HFnXy/",
              "https://www.instagram.com/reel/DdB9o2WD2zg/",
              "https://www.instagram.com/p/DdgN4xMlGlT/",
              "https://www.instagram.com/p/DeJ5VjaldQm/",
              "https://www.instagram.com/p/DeMlC7AlulT/",
              "https://www.instagram.com/reel/De_0UjNDerW/",
              "https://www.instagram.com/reel/DfXXIB5CuF9/",
              "https://www.instagram.com/p/DfhxD70iKdf/",
              "https://www.instagram.com/p/DfZ74NbjaJC/",
              "https://www.instagram.com/p/DfmfKY8CLJg/",
            ],
          },
        ],
      },
      {
        label: "02",
        title: "CR Studio by CReatures — Brand & Content Development",
        overview: [
          "Content strategy and editorial planning for CR Studio, the production studio launched by CReatures as a new business offering.",
        ],
        sections: [
          {
            title: "Challenge & Strategy",
            body: [
              "The challenge was to introduce a new brand and service to the market, establish its identity and communicate its capabilities through a distinct digital presence.",
              "The content strategy focused on presenting the studio's identity, production capabilities, creative environment and the value it offers to potential clients.",
            ],
          },
          {
            title: "Instagram Profile",
            links: [
              {
                label: "cr_studio_production_space",
                url: "https://www.instagram.com/cr_studio_production_space/",
              },
            ],
          },
        ],
      },
      {
        label: "03",
        title: "CReatures — Events & Special Projects",
        overview: [
          "A collection of projects that combine creative communication, content production, event promotion and audience engagement.",
        ],
        sections: [],
      },
      {
        label: "03 · A",
        title: "Yannis Ploutarchos — Live Concert",
        overview: [
          "Social media content and event-related communication for the live concert of Greek singer Yannis Ploutarchos.",
        ],
        sections: [
          {
            title: "Selected Work",
            links: [
              "https://www.instagram.com/reel/DcTnNnhFb_p/",
              "https://www.instagram.com/reel/DcgfTtljyPr/",
            ],
          },
        ],
      },
      {
        label: "03 · B",
        title: "Piraeus Port Film Festival 2026",
        overview: [
          "Social media and digital communication for the third edition of Piraeus Port Film Festival, held in September 2026 at the Municipal Theatre of Piraeus.",
        ],
        sections: [
          {
            title: "Selected Work",
            links: [
              "https://www.instagram.com/reel/Dcx7AdqiYAV/",
              "https://www.instagram.com/reel/Dcv8T4FiH-B/",
              "https://www.instagram.com/reel/Dc1I8Rwk5py/",
              "https://www.instagram.com/reel/Dc6SiyZCFvE/",
              "https://www.instagram.com/reel/Dc_SA9ZFIYh/",
            ],
          },
        ],
      },
      {
        label: "03 · C",
        title: "CReatures BOX — Real-Life Treasure Hunt",
        overview: [
          "A recurring brand activation developed by CReatures in collaboration with a different partner brand each month.",
          "Rather than a conventional giveaway, CReatures BOX transforms audience participation into a real-life treasure hunt. A box containing gifts is hidden somewhere in Athens, and participants must follow clues, solve riddles and find its location.",
        ],
        sections: [
          {
            title: "My Contribution",
            body: [
              "End-to-end creative and content coordination of the monthly activation, including:",
              [
                "Concept development and creative ideation.",
                "Partner brand integration.",
                "Treasure hunt mechanics and participation process.",
                "Riddle writing and clue development.",
                "Social media content planning and copywriting.",
                "Awareness and participation communication.",
                "Coordination of the monthly activation.",
              ],
            ],
          },
          {
            title: "Selected Work",
            links: [
              "https://www.instagram.com/reel/Deg9uk0guFE/",
              "https://www.instagram.com/reel/De9Pdw0D3-W/",
              "https://www.instagram.com/reel/Deb-1KgAVZe/",
              "https://www.instagram.com/p/DeZdDJ1F7jo/",
              "https://www.instagram.com/p/DeOkQL5F_Vl/",
              "https://www.instagram.com/reel/DeUMmvkGcwo/",
              "https://www.instagram.com/reel/DeRuqGwCfqq/",
              "https://www.instagram.com/reel/Ddqf5HqEX9W/",
              "https://www.instagram.com/reel/Ddir6VVCJ_V/",
              "https://www.instagram.com/reel/DdTkLJRgEfE/",
            ],
          },
        ],
      },
      {
        label: "04",
        title: "Client Account — Μπαρ Μπεε Κιου",
        overview: [
          "Social media content strategy and management for Μπαρ Μπεε Κιου, a Greek restaurant brand with an already established identity and distinctive tone of voice.",
        ],
        sections: [
          {
            title: "Challenge & Strategy",
            body: [
              "Unlike a brand that needs to establish its identity from scratch, Μπαρ Μπεε Κιου already had a recognizable personality and an existing connection with its audience.",
              "The challenge was to strengthen audience engagement and deepen that connection while preserving the brand's established character, humour and communication style.",
              "The content approach focused on maintaining consistency, creating relatable and entertaining content, highlighting the brand's products and experience, and encouraging audience interaction.",
            ],
          },
          {
            title: "My Contribution",
            body: [
              "Social media account management (since 1 August), content planning, content ideation, copywriting and coordination of the brand's digital communication.",
            ],
          },
          {
            title: "Selected Work",
            links: [
              "https://www.instagram.com/reel/DfEzH6rRlVA/",
              "https://www.instagram.com/p/DfCOO_cCFLa/",
              "https://www.instagram.com/reel/DelyscyjVam/",
              "https://www.instagram.com/reel/Dd6t-h_Dtyl/",
              "https://www.instagram.com/p/DdtoYomCODD/",
              "https://www.instagram.com/reel/DdmA3J8EcPv/",
              "https://www.instagram.com/p/DdYixmuCPGZ/",
              "https://www.instagram.com/reel/DdWaVN6G_Z6/",
              "https://www.instagram.com/p/DdOMRnbCKrW/",
              "https://www.instagram.com/p/Dc0fp6kCDDc/",
              "https://www.instagram.com/reel/Dcd6eawD-wN/",
              "https://www.instagram.com/reel/DcRCgKZDfmM/",
              "https://www.instagram.com/reel/Dbn1571lfwm/",
              "https://www.instagram.com/reel/DbgOPdKjHPP/",
            ],
          },
        ],
      },
    ],
    image: "/images/demo/08.jpg",
    imagePosition: "50% 50%",
    theme: { bg: "#1c1a17", fg: "#f4f0e9", accent: "#e4482a" },
  },
  {
    slug: "i-poli-zei-free-press",
    title: "Η ΠΟΛΗ ΖΕΙ Free Press",
    subtitle: "Advertising Concepts & Editorial Content",
    categories: ["Editorial", "Content"],
    summary: "Creative advertising concepts and editorial content ideas that connect brands with readers across digital and print media.",
    meta: [
      { label: "Role", value: "Advertising & Business Development Representative" },
      { label: "Period", value: "Jan 2025 – May 2026" },
    ],
    overview: [
      "Development of creative advertising concepts and editorial content ideas for Η ΠΟΛΗ ΖΕΙ Free Press, exploring engaging ways to connect brands with readers and create distinctive content experiences across digital and print media.",
    ],
    parts: [
      {
        label: "01",
        title: "Interactive Branded Content",
        overview: [],
        sections: [
          {
            title: "Challenge & Strategy",
            body: [
              "Moving beyond conventional native articles and standard advertising formats, the objective was to create interactive experiences that invite readers to actively engage with a brand.",
              "The concepts used playful, nostalgic and entertaining formats to introduce brand identities, encourage participation and offer a more personalized experience through quiz-based content.",
            ],
          },
          {
            title: "My Contribution",
            body: [
              [
                "Creative concept development for interactive branded content.",
                "Ideation of quiz formats and engagement mechanics.",
                "Development of concepts that translate brand identity into entertaining reader experiences.",
                "Creative approach to connecting brands with audiences beyond traditional advertising placements.",
              ],
            ],
          },
          {
            title: "Selected Work",
            links: [
              {
                label: "Τόλμησε να το κάνεις… Chillico!",
                url: "https://ipolizei.gr/tolmhse-na-to-kaneis-chillico/",
              },
              {
                label: "Midnight Circus x Κουραφέλκυθρα — Καλοκαιρινό Quiz/Διαγωνισμός",
                url: "https://ipolizei.gr/midnight-circus/",
              },
            ],
          },
        ],
      },
      {
        label: "02",
        title: "Editorial Concepts & Themed Features",
        overview: [],
        sections: [
          {
            title: "Challenge & Strategy",
            body: [
              "Development of original thematic concepts for magazine features and digital editorial content, with an emphasis on contemporary topics, relatable experiences and engaging storytelling.",
              "The goal was to transform everyday observations, cultural trends and audience interests into distinctive editorial ideas that could capture attention and create a connection with readers.",
            ],
          },
          {
            title: "My Contribution",
            body: [
              [
                "Ideation and development of editorial concepts and themed features.",
                "Identification of relevant topics, trends and audience interests.",
                "Creative framing of stories and development of engaging editorial angles.",
                "Concept development for both print magazine features and digital articles.",
              ],
            ],
          },
          {
            title: "Selected Work",
            links: [
              {
                label: "Magazine Feature — Issue 118 / 2025",
                url: "https://issuu.com/657494/docs/h_.118_2025/57",
              },
              {
                label: "Magazine Feature — Issue 121 / 2025",
                url: "https://issuu.com/657494/docs/_.121_2025/52",
              },
              {
                label: "Magazine Feature — Issue 126 / 2026",
                url: "https://issuu.com/657494/docs/_.126_2026/20",
              },
              {
                label: "Τα dating apps πεθαίνουν, πάμε πίσω στην πραγματική ζωή",
                url: "https://ipolizei.gr/ta-dating-apps-pethainoun-pame-pisw-stin-pragmatiki-zwi/",
              },
              {
                label: "Ξέρω πόσα παγωτά έφαγες φέτος το καλοκαίρι!",
                url: "https://ipolizei.gr/xerw-posa-pagwta-efages-fetos-to-kalokairi/",
              },
            ],
          },
        ],
      },
    ],
    image: "/images/demo/02.jpg",
    imagePosition: "50% 50%",
    theme: { bg: "#e8dfd0", fg: "#2a1f14", accent: "#9b2d1f" },
  },
  {
    slug: "pubs-on-2-wheels",
    title: "Pubs On 2 Wheels",
    subtitle: "Digital Content Strategy & Channel Growth",
    categories: ["Social Media", "Content"],
    summary: "A more structured approach to YouTube and Instagram for a motorcycle adventure channel: subscribers from 123 to 620, average views from ~300 to 4,000.",
    meta: [
      { label: "Role", value: "Digital Marketing & Content Strategist" },
      { label: "Period", value: "Apr 2026 – Present" },
      { label: "Type", value: "Volunteer role" },
    ],
    stats: [
      { value: "+404%", label: "Subscribers", detail: "123 → 620" },
      { value: "13.3x", label: "Average views", detail: "300 → 4,000" },
      { value: "↑", label: "CTR", detail: "Improved thumbnail performance" },
    ],
    overview: [
      "Pubs On 2 Wheels is a motorcycle-focused content channel built around motorcycle journeys, equipment, experiences and the culture of adventure riding.",
      "The objective was to strengthen the brand's digital presence, improve content discoverability and grow its audience through a more structured and strategic approach to YouTube and Instagram.",
    ],
    sections: [
      {
        title: "Challenge & Strategy",
        body: [
          "The challenge was to move beyond simply publishing motorcycle-related videos and develop a consistent content strategy that could attract a relevant audience, increase engagement and establish a stronger digital presence.",
          "The strategy focused on improving content visibility, creating more engaging formats and making the channel easier to discover through search and recommendations.",
        ],
      },
      {
        title: "My Contribution",
        body: [
          [
            {
              lead: "Content Strategy",
              text: "Development of content ideas and formats aligned with the interests of the motorcycle community.",
            },
            {
              lead: "YouTube SEO",
              text: "Optimization of video titles, descriptions, tags and chapters to improve discoverability.",
            },
            {
              lead: "Creative Direction",
              text: "Development and improvement of video thumbnails to strengthen visual appeal and increase click-through rate.",
            },
            {
              lead: "Short-form Content",
              text: "Adaptation of long-form videos into YouTube Shorts and Instagram Reels to expand reach and attract new audiences.",
            },
            {
              lead: "Cross-platform Promotion",
              text: "Connecting YouTube and Instagram content to create a more cohesive digital presence.",
            },
            {
              lead: "Content Planning",
              text: "Structuring content around audience interests, including motorcycle routes, equipment and long-distance travel experiences.",
            },
          ],
        ],
      },
      {
        title: "Results & Growth",
        body: [
          "The strategic improvements contributed to significant growth across the channel's key performance indicators.",
          [
            { lead: "Subscribers", text: "Increased from 123 to 620." },
            {
              lead: "Average Views",
              text: "Increased from approximately 300 to 4,000 per video.",
            },
            {
              lead: "YouTube Discoverability",
              text: "Improved content optimization and thumbnail performance, supporting stronger visibility and click-through rate.",
            },
            {
              lead: "Short-form Content",
              text: "Expanded the channel's reach through Shorts and Instagram Reels, attracting new viewers and subscribers.",
            },
          ],
        ],
      },
      {
        title: "Selected Work",
        links: [
          {
            label: "YouTube Channel — Pubs On 2 Wheels",
            url: "https://www.youtube.com/@pubs_on2wheels",
          },
        ],
      },
      {
        title: "Instagram Reels",
        links: [
          "https://www.instagram.com/reel/Db6J0Dxt1vr/",
          "https://www.instagram.com/reel/DcJeHaANDLq/",
          "https://www.instagram.com/reel/DZ8ELoOORIo/",
          "https://www.instagram.com/reel/DceW27CNVYe/",
          "https://www.instagram.com/reel/DdHj7jANlI4/",
          "https://www.instagram.com/reel/DdZGOvTt9a5/",
          "https://www.instagram.com/reel/DcwcWHatfmJ/",
          "https://www.instagram.com/reel/Db0y7-Xtfot/",
          "https://www.instagram.com/reel/DabKW1CtzzV/",
          "https://www.instagram.com/reel/DaQUFuPNUpZ/",
          "https://www.instagram.com/reel/DZiAIlFNqid/",
          "https://www.instagram.com/reel/DZVTChDtH5i/",
        ],
      },
    ],
    image: "/images/demo/06.jpg",
    imagePosition: "50% 60%",
    theme: { bg: "#2e3b2c", fg: "#eef2e6", accent: "#f2a33a" },
  },
  {
    slug: "tedxaueb-2022",
    title: "TEDxAUEB 2022",
    subtitle: "Event Marketing & Communication Strategy",
    year: 2022,
    categories: ["Events", "Social Media"],
    summary: "Social media strategy and communication for an independently organized TEDx event, which culminated in a sold-out event with more than 700 attendees.",
    meta: [
      { label: "Role", value: "Marketing Manager" },
      { label: "Period", value: "Nov 2021 – Jun 2022" },
      { label: "Type", value: "Volunteer role" },
    ],
    overview: [
      "TEDxAUEB 2022 was an independently organized TEDx event at the Athens University of Economics and Business, bringing together speakers, ideas and an audience around a shared theme.",
      "As Marketing Manager, I was responsible for the event's social media strategy and a significant part of its communication, contributing to its visibility, audience engagement and overall promotion.",
    ],
    sections: [
      {
        title: "Challenge & Strategy",
        body: [
          "The main objective was to build anticipation around the event, communicate its identity and ideas, and create a consistent connection with the audience throughout the different stages of the event.",
          "The communication strategy covered the pre-event period, the main event and additional promotional activities, ensuring a cohesive presence across digital and supporting communication channels.",
        ],
      },
      {
        title: "Results & Impact",
        body: [
          "The communication efforts contributed to building awareness and anticipation around TEDxAUEB 2022, which culminated in a sold-out event with more than 700 attendees.",
        ],
      },
      {
        title: "Selected Work",
        links: [
          "https://www.instagram.com/p/Car_5lHq37V/",
          "https://www.instagram.com/p/CbUsqFKqNLU/",
          "https://www.instagram.com/p/CbaSwSjMMJQ/",
          "https://www.instagram.com/p/Cbr-LNOMbjn/",
          "https://www.instagram.com/p/CbxVonvMSCN/",
        ],
      },
    ],
    image: "/images/demo/26.jpg",
    imagePosition: "50% 50%",
    theme: { bg: "#111111", fg: "#ffffff", accent: "#eb0028" },
  },
  {
    slug: "sta-kalytera-mas",
    title: "«σΤα καλύτΕΡά μΑΣ»",
    subtitle: "Book Launch & Integrated Marketing Campaign",
    year: 2024,
    categories: ["Campaigns", "Content"],
    summary: "An independent promotional campaign for my second poetry collection, published by Pigi Publications in 2024.",
    meta: [
      { label: "Type", value: "Personal project" },
      { label: "Book", value: "Second poetry collection — Pigi Publications, 2024" },
    ],
    overview: [
      "An independent promotional campaign developed and executed to introduce and promote my second poetry collection, “σΤα καλύτΕΡά μΑΣ”, published by Pigi Publications in 2024.",
      "Taking ownership of the book's promotional journey, I developed an integrated communication approach that extended beyond traditional book advertising, combining digital content, event promotion, media outreach and creative brand experiences.",
      "All promotional initiatives presented in this case study were independently conceived and implemented by me, outside the publisher's promotional plan.",
    ],
    sections: [
      {
        title: "Selected Work",
        links: [
          { label: "Book Launch Campaign — LinkedIn", url: "https://www.linkedin.com/posts/gabriella-kasapi-_a-marketing-portfolio-about-the-promotion-ugcPost-7258464061695164416-r0-s" },
          {
            label: "My TikTok (mostly promo content for my books)",
            url: "https://www.tiktok.com/@gaby.kasapi",
          },
        ],
      },
    ],
    image: "/images/demo/01.jpg",
    imagePosition: "50% 50%",
    theme: { bg: "#f3d6d0", fg: "#2b1210", accent: "#c4301f" },
  },
]
