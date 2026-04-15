const createProductImage = (accent, title, subtitle, icon) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
        <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.85)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.08)" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" rx="36" fill="url(#bg)" />
      <circle cx="385" cy="78" r="76" fill="rgba(255,255,255,0.10)" />
      <circle cx="94" cy="248" r="92" fill="rgba(255,255,255,0.08)" />
      <rect x="48" y="42" width="118" height="34" rx="17" fill="rgba(255,255,255,0.16)" />
      <text x="70" y="64" font-size="18" fill="#ffffff" font-family="Arial, sans-serif">${subtitle}</text>
      <rect x="58" y="102" width="364" height="170" rx="34" fill="url(#glass)" stroke="rgba(255,255,255,0.18)" />
      <text x="58" y="286" font-size="34" font-weight="700" fill="#ffffff" font-family="Arial, sans-serif">${title}</text>
      <text x="238" y="204" text-anchor="middle" font-size="92">${icon}</text>
    </svg>
  `

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const products = [
  {
    id: 1,
    name: 'Wireless Sound Pods',
    category: 'Audio',
    price: 2499,
    originalPrice: 3199,
    rating: '4.9',
    badge: 'Hot Deal',
    description: 'Compact earbuds with rich bass, fast pairing, and long battery life.',
    image: createProductImage('#8b5cf6', 'Sound Pods', 'Audio', '\uD83C\uDFA7'),
  },
  {
    id: 2,
    name: 'Minimal Desk Lamp',
    category: 'Home Office',
    price: 1799,
    originalPrice: 2299,
    rating: '4.7',
    badge: 'New',
    description: 'Soft ambient glow with adjustable brightness for focused work.',
    image: createProductImage('#f59e0b', 'Desk Lamp', 'Home Office', '\uD83D\uDCA1'),
  },
  {
    id: 3,
    name: 'Urban Carry Bottle',
    category: 'Lifestyle',
    price: 899,
    originalPrice: 1199,
    rating: '4.8',
    badge: 'Trending',
    description: 'Leak-proof steel bottle designed for daily commutes and travel.',
    image: createProductImage('#0ea5e9', 'Carry Bottle', 'Lifestyle', '\uD83E\uDDF4'),
  },
  {
    id: 4,
    name: 'Cloud Cushion Set',
    category: 'Decor',
    price: 1599,
    originalPrice: 2099,
    rating: '4.6',
    badge: 'Limited',
    description: 'Soft textured cushions that instantly warm up any living space.',
    image: createProductImage('#ec4899', 'Cushion Set', 'Decor', '\uD83D\uDECB\uFE0F'),
  },
  {
    id: 5,
    name: 'Smart Fitness Band',
    category: 'Wearables',
    price: 3299,
    originalPrice: 3899,
    rating: '4.8',
    badge: 'Top Rated',
    description: 'Track movement, heart rate, sleep, and workouts with ease.',
    image: createProductImage('#10b981', 'Fitness Band', 'Wearables', '\u231A'),
  },
  {
    id: 6,
    name: 'Travel Tech Pouch',
    category: 'Accessories',
    price: 1099,
    originalPrice: 1499,
    rating: '4.7',
    badge: 'Editor Pick',
    description: 'Organized compartments for chargers, cables, and daily essentials.',
    image: createProductImage('#f97316', 'Tech Pouch', 'Accessories', '\uD83C\uDF92'),
  },
]

export default products
