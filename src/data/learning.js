// Learning roadmap. Groups render in order along a winding path.
// `note` (optional) shows as a small side note under the group label.

export const learning = [
  {
    id: 'done',
    label: 'Done',
    symbol: '✓',
    items: [
      'Python basics + CLI apps',
      'HTML & CSS (first portfolio)',
      'Java OOP',
      'AI API integrations at my internship',
      'Git & GitHub',
    ],
  },
  {
    id: 'now',
    label: 'Now',
    symbol: '●',
    items: [
      'Advanced Python (type hints, modules, pytest)',
      'Daily DSA (Arrays & Hashing)',
      'Git branch + PR workflow',
      'C/C++ basics',
    ],
  },
  {
    id: 'next',
    label: 'Next',
    symbol: '○',
    note: 'Learning text embeddings for a project',
    items: ['Backend development', 'NLP', 'scikit-learn', 'NetworkX'],
  },
  {
    id: 'later',
    label: 'Long-term',
    symbol: '☆',
    items: ['Exploring three paths: data, backend and cybersecurity'],
  },
]
