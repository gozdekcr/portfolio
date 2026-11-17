// Projects shown in the 3D gallery.
//
// Fields:
//   slug        unique id (also used for the optional screenshot path)
//   title, description
//   categories  used by the filter: 'AI' | 'Python' | 'Java' | 'Web'
//   tags        tech tags shown under the gallery
//   status      'Live' | 'In progress' | 'Internship'
//   github      full URL, or null when there is no public repo
//   details     longer summary shown in the detail view (click a card)
//   role        my role on the project
//   cover       generated pixel-art cover: { from, to, sprite }
//               sprite = one of: json, message, audio, component, coffee,
//               terminal, classes, bars (see src/components/projects/pixelArt.js)
//   image       optional real screenshot, relative to /public,
//               e.g. 'projects/blur-cafe.png'. Leave null to use the generated cover.

export const filters = ['All', 'AI', 'Python', 'Java', 'Web']

export const projects = [
  {
    slug: 'structured-data-extraction',
    title: 'AI-Powered Structured Data Extraction',
    description:
      'A schema-agnostic extraction engine that turns unstructured text (messages, transcripts, OCR text) into validated JSON with confidence scores. New extraction types are added as JSON schemas without touching the core.',
    categories: ['AI', 'Python'],
    tags: ['Python', 'OpenAI API', 'JSON Schema', 'Streamlit'],
    details:
      'Built as an individual mission during my internship at Iceberg Digital. The engine takes unstructured text such as customer messages, call transcripts or OCR output and returns validated JSON, with a confidence score for every extracted field. Each extraction type is defined as a JSON Schema, so supporting a new document type means writing a schema, not changing the core code. A Streamlit interface makes it easy to try schemas and review the results.',
    role: 'Intern developer (individual mission)',
    status: 'Internship',
    github: null,
    cover: { from: '#9047FF', to: '#2A0E5C', sprite: 'json' },
    image: null,
  },
  {
    slug: 'message-to-crm-extractor',
    title: 'Message-to-CRM Extractor',
    description:
      'Parses estate agent customer messages into structured CRM fields with confidence flags.',
    categories: ['AI', 'Python'],
    tags: ['Python', 'LLM API', 'JSON'],
    details:
      'Estate agents receive customer messages in every shape and size. This tool reads a message and pulls out the fields a CRM needs, flagging each one with a confidence level so uncertain values can be checked by a person before they are saved.',
    role: 'Solo project',
    status: 'Live',
    github: 'https://github.com/gozdekcr/message-to-crm-extractor',
    cover: { from: '#B99AFF', to: '#6E2BD9', sprite: 'message' },
    image: null,
  },
  {
    slug: 'plaud-transcript-retrieval',
    title: 'Plaud Transcript Retrieval',
    description:
      'A pipeline from voice-recording transcripts to CRM records and automated proposal letters.',
    categories: ['AI'],
    tags: ['AI', 'Transcripts', 'CRM', 'Automation'],
    details:
      "I led the team on this mission during my internship at Iceberg Digital. The pipeline retrieves voice-recording transcripts, extracts the information that matters into CRM records, and uses it to generate proposal letters automatically, so agents don't have to retype what was said in a meeting.",
    role: 'Team lead',
    status: 'Internship',
    github: null,
    cover: { from: '#6E2BD9', to: '#120A24', sprite: 'audio' },
    image: null,
  },
  {
    slug: 'figma-component-generator',
    title: 'Figma Component Generator',
    description: 'A Figma plugin that turns structured input into ready-made components.',
    categories: ['AI', 'Web'],
    tags: ['Figma API', 'JavaScript'],
    details:
      'A Figma plugin that turns structured input into ready-made components.',
    role: 'Solo project',
    status: 'In progress',
    github: null, // repo github.com/gozdekcr/figma-component-generator is not public yet
    cover: { from: '#EDE4FF', to: '#9047FF', sprite: 'component' },
    image: null,
  },
  {
    slug: 'blur-cafe',
    title: 'Blur Cafe',
    description: 'A minimalist café website, evolving into a full-stack project.',
    categories: ['Web'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    details:
      "A minimalist café website that started as a front-end project. I'm growing it step by step into a full-stack app.",
    role: 'Solo project',
    status: 'In progress',
    github: null, // repo github.com/gozdekcr/blur-cafe is not public yet
    cover: { from: '#D9C8FF', to: '#5B2BB0', sprite: 'coffee' },
    image: null,
  },
  {
    slug: 'cs-quiz-cli',
    title: 'CS Quiz CLI',
    description: 'A terminal quiz app for computer science concepts.',
    categories: ['Python'],
    tags: ['Python', 'CLI'],
    details:
      'A terminal quiz app for practicing computer science concepts, written in Python. A small project that got me comfortable building CLI apps.',
    role: 'Solo project',
    status: 'Live',
    github: 'https://github.com/gozdekcr/cs-quiz-cli',
    cover: { from: '#3A1A78', to: '#050507', sprite: 'terminal' },
    image: null,
  },
  {
    slug: 'java-learning-path',
    title: 'Java Learning Path',
    description:
      'A structured OOP journey covering inheritance, polymorphism, interfaces and abstract classes.',
    categories: ['Java'],
    tags: ['Java', 'OOP'],
    details:
      'A structured journey through object-oriented programming in Java, covering inheritance, polymorphism, interfaces and abstract classes.',
    role: 'Solo project',
    status: 'In progress',
    github: 'https://github.com/gozdekcr/java-learning-path',
    cover: { from: '#9047FF', to: '#B99AFF', sprite: 'classes' },
    image: null,
  },
  {
    slug: 'dsa-fundamentals',
    title: 'DSA Fundamentals',
    description: 'Daily data structures & algorithms practice following NeetCode patterns.',
    categories: ['Python'],
    tags: ['Python', 'Algorithms', 'NeetCode'],
    details:
      'Daily data structures and algorithms practice in Python, organized by NeetCode patterns and starting with Arrays & Hashing.',
    role: 'Solo project',
    status: 'In progress',
    github: 'https://github.com/gozdekcr/dsa-fundamentals',
    cover: { from: '#2A0E5C', to: '#9047FF', sprite: 'bars' },
    image: null,
  },
]
