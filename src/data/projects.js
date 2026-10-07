// Add, remove, or edit projects here.
// category: 'backend' | 'fullstack' | 'qa'
// Add `link` (GitHub, demo, or live URL) and `linkLabel` (the text shown) and a link appears on the card.
// `featured: true` makes a card larger. Projects appear on the page in the order listed here.

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full-stack and AI' },
  { id: 'qa', label: 'Test automation' },
]

export const projects = [
  {
    id: 'linkhub',
    category: 'fullstack',
    featured: true,
    kind: 'Final year project',
    title: 'LinkHub: Social Media Management Platform',
    description: [
      'Publish to Facebook, Instagram, LinkedIn, and Threads from one screen, with per-platform customization. Gemini AI writes captions from a media description.',
      'Includes a content calendar, analytics dashboard, unified inbox, and role-based admin approvals.',
    ],
    stack: ['Node.js', 'React', 'PostgreSQL', 'Gemini AI'],
    link: 'https://www.youtube.com/watch?v=fdpFfEfq7SM',
    linkLabel: 'Watch the demo on YouTube',
  },
  {
    id: 'doc-intel',
    category: 'backend',
    kind: 'Backend',
    title: 'Smart Document Intelligence and Workflow Automation',
    description: [
      'Pulls structured data out of invoices and purchase orders, flags duplicates, and routes documents through approval workflows.',
      'REST APIs handle upload, processing, and workflow management.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'OCR', 'NLP', 'Docker'],
    link: '',
  },
  {
    id: 'api-observability',
    category: 'backend',
    kind: 'Backend',
    title: 'API Observability and Incident Analysis Platform',
    description: [
      'Monitors API availability, response times, and recurring failures with scheduled health checks and incident tracking.',
      'Serves monitoring and incident data over REST, with pytest coverage and Docker packaging.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'pytest'],
    link: '',
  },
  {
    id: 'data-quality',
    category: 'backend',
    kind: 'Backend',
    title: 'Automated Data Quality and Validation Platform',
    description: [
      'Upload a CSV or Excel file and get a report on missing values, duplicates, invalid formats, and outliers.',
      'Validation rules are configurable, and the API is covered by automated tests.',
    ],
    stack: ['Python', 'FastAPI', 'Pandas', 'PostgreSQL', 'pytest'],
    link: '',
  },
   {
    id: 'travel-planner',
    category: 'fullstack',
    kind: 'Full-stack and AI · Mobile',
    title: 'AI Travel Planner',
    description: [
      'A cross-platform app that builds personalized itineraries from budget, interests, and preferences using Gemini AI, with real-time weather data.',
    ],
    stack: ['React Native', 'Gemini AI', 'Firebase', 'Weather API'],
    links: [
      { label: 'See the app UI on LinkedIn', url: 'https://lnkd.in/p/d4SbKJh6' },
      { label: 'View code on GitHub', url: 'https://github.com/MuskanVijay/TravelPlannerReactNativeApp' },
    ],
  },
  {
    id: 'pdf-editor',
    category: 'fullstack',
    kind: 'Full-stack',
    title: 'PDF Editor Tool',
    description: [
      'A browser-based editor that changes existing text while keeping the original font size, color, and formatting. Also inserts images and signatures and removes image backgrounds.',
      'Search works across multi-page documents.',
    ],
    stack: ['JavaScript', 'PDF-lib', 'Canvas API'],
    link: 'https://github.com/MuskanVijay/PDF-Editor',
    linkLabel: 'View on GitHub',
  },
  {
    id: 'immune-monitor',
    category: 'fullstack',
    kind: 'Machine learning',
    title: 'Digital Immune System Monitor',
    description: [
      'A machine-learning app that analyzes, tracks, and forecasts individual health metrics, with Power BI dashboards for trends and predictions.',
    ],
    stack: ['Python', 'Scikit-learn', 'Power BI'],
    link: '',
  },
  {
    id: 'ecommerce-qa',
    category: 'qa',
    kind: 'Test automation',
    title: 'E-Commerce QA Automation Framework',
    description: [
      'End-to-end tests for registration, login, cart, and checkout, covering positive, negative, and edge cases.',
      'Built with the Page Object Model and automated reports.',
    ],
    stack: ['Playwright', 'TypeScript', 'GitHub'],
    link: '',
  },
  {
    id: 'api-testing',
    category: 'qa',
    kind: 'Test automation',
    title: 'REST API Testing and Automation Framework',
    description: [
      'Test cases that validate status codes, headers, response schemas, and CRUD operations.',
      'Collections run automatically with JavaScript assertions and Newman reports.',
    ],
    stack: ['Postman', 'Newman', 'JavaScript', 'REST'],
    link: '',
  },
  {
    id: 'ci-pipeline',
    category: 'qa',
    kind: 'Test automation · CI/CD',
    title: 'CI/CD Test Automation Pipeline',
    description: [
      'Playwright tests run on every push and pull request through GitHub Actions, across browsers, with screenshots saved for failed runs.',
    ],
    stack: ['Playwright', 'GitHub Actions', 'Git'],
    link: '',
  },
]