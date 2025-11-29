/**
 * Color Palettes - Predefined color schemes
 */

export const COLOR_PALETTES = {
  'pastel-blue': {
    name: 'Pastel Blue',
    colors: ['#E0F2FE', '#BAE6FD', '#7DD3FC', '#38BDF8', '#0EA5E9'],
    description: 'Soft, calming blue tones',
    suitableFor: ['beauty', 'healthcare', 'education']
  },
  'corporate-blue': {
    name: 'Corporate Blue',
    colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
    description: 'Professional blue palette',
    suitableFor: ['saas', 'realestate', 'corporate']
  },
  'energetic-red': {
    name: 'Energetic Red',
    colors: ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'],
    description: 'Bold, energetic red tones',
    suitableFor: ['fitness', 'ecommerce']
  },
  'warm-orange': {
    name: 'Warm Orange',
    colors: ['#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA'],
    description: 'Warm, inviting orange tones',
    suitableFor: ['restaurant', 'travel']
  },
  'pastel-pink': {
    name: 'Pastel Pink',
    colors: ['#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899'],
    description: 'Soft, feminine pink tones',
    suitableFor: ['beauty', 'ecommerce']
  },
  'rose-gold': {
    name: 'Rose Gold',
    colors: ['#FDF2F8', '#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6'],
    description: 'Elegant rose gold palette',
    suitableFor: ['beauty', 'ecommerce', 'elegant']
  },
  'lavender': {
    name: 'Lavender',
    colors: ['#F3E8FF', '#E9D5FF', '#DDD6FE', '#C4B5FD', '#A78BFA'],
    description: 'Soft purple lavender tones',
    suitableFor: ['beauty', 'healthcare', 'education']
  },
  'soft-purple': {
    name: 'Soft Purple',
    colors: ['#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6'],
    description: 'Gentle purple palette',
    suitableFor: ['beauty', 'technology']
  },
  'ocean-blue': {
    name: 'Ocean Blue',
    colors: ['#0C4A6E', '#075985', '#0369A1', '#0284C7', '#0EA5E9'],
    description: 'Deep ocean blue tones',
    suitableFor: ['travel', 'technology']
  },
  'tropical-green': {
    name: 'Tropical Green',
    colors: ['#166534', '#16A34A', '#22C55E', '#4ADE80', '#86EFAC'],
    description: 'Vibrant tropical green',
    suitableFor: ['travel', 'healthcare']
  },
  'sunset-orange': {
    name: 'Sunset Orange',
    colors: ['#C2410C', '#EA580C', '#F97316', '#FB923C', '#FDBA74'],
    description: 'Warm sunset orange',
    suitableFor: ['travel', 'restaurant']
  },
  'sky-blue': {
    name: 'Sky Blue',
    colors: ['#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD', '#E0F2FE'],
    description: 'Bright sky blue',
    suitableFor: ['travel', 'technology']
  },
  'academic-blue': {
    name: 'Academic Blue',
    colors: ['#1E3A8A', '#1E40AF', '#2563EB', '#3B82F6', '#60A5FA'],
    description: 'Scholarly blue palette',
    suitableFor: ['education', 'corporate']
  },
  'knowledge-green': {
    name: 'Knowledge Green',
    colors: ['#14532D', '#166534', '#16A34A', '#22C55E', '#4ADE80'],
    description: 'Fresh knowledge green',
    suitableFor: ['education', 'healthcare']
  },
  'scholarly-purple': {
    name: 'Scholarly Purple',
    colors: ['#581C87', '#6B21A8', '#7C3AED', '#8B5CF6', '#A78BFA'],
    description: 'Academic purple',
    suitableFor: ['education', 'technology']
  },
  'medical-blue': {
    name: 'Medical Blue',
    colors: ['#1E3A8A', '#1E40AF', '#2563EB', '#3B82F6', '#93C5FD'],
    description: 'Trustworthy medical blue',
    suitableFor: ['healthcare']
  },
  'trust-green': {
    name: 'Trust Green',
    colors: ['#14532D', '#166534', '#16A34A', '#22C55E', '#4ADE80'],
    description: 'Trustworthy green',
    suitableFor: ['healthcare', 'education']
  },
  'calm-teal': {
    name: 'Calm Teal',
    colors: ['#0F766E', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4'],
    description: 'Calming teal tones',
    suitableFor: ['healthcare', 'beauty']
  },
  'tech-blue': {
    name: 'Tech Blue',
    colors: ['#1E40AF', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'],
    description: 'Modern tech blue',
    suitableFor: ['technology', 'saas']
  },
  'dark-mode': {
    name: 'Dark Mode',
    colors: ['#0F172A', '#1E293B', '#334155', '#475569', '#64748B'],
    description: 'Dark theme palette',
    suitableFor: ['technology', 'modern']
  },
  'neon': {
    name: 'Neon',
    colors: ['#00F5FF', '#00FF88', '#FF00F5', '#FF0080', '#FFFF00'],
    description: 'Vibrant neon colors',
    suitableFor: ['technology', 'playful']
  },
  'futuristic': {
    name: 'Futuristic',
    colors: ['#0F172A', '#1E293B', '#3B82F6', '#00F5FF', '#FFFFFF'],
    description: 'Futuristic tech palette',
    suitableFor: ['technology', 'modern']
  },
  'burgundy': {
    name: 'Burgundy',
    colors: ['#7F1D1D', '#991B1B', '#B91C1C', '#DC2626', '#EF4444'],
    description: 'Rich burgundy red',
    suitableFor: ['restaurant', 'elegant']
  },
  'gold': {
    name: 'Gold',
    colors: ['#78350F', '#92400E', '#B45309', '#D97706', '#F59E0B'],
    description: 'Luxurious gold',
    suitableFor: ['restaurant', 'elegant', 'luxury']
  },
  'earth-brown': {
    name: 'Earth Brown',
    colors: ['#78350F', '#92400E', '#A16207', '#CA8A04', '#EAB308'],
    description: 'Natural earth tones',
    suitableFor: ['restaurant', 'warm']
  },
  'modern-gradient': {
    name: 'Modern Gradient',
    colors: ['#667EEA', '#764BA2', '#F093FB', '#4FACFE', '#00F2FE'],
    description: 'Modern gradient palette',
    suitableFor: ['ecommerce', 'modern']
  },
  'primary-blue': {
    name: 'Primary Blue',
    colors: ['#1E40AF', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'],
    description: 'Primary blue palette',
    suitableFor: ['ecommerce', 'saas']
  },
  'teal': {
    name: 'Teal',
    colors: ['#0F766E', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4'],
    description: 'Fresh teal palette',
    suitableFor: ['ecommerce', 'modern']
  },
  'purple': {
    name: 'Purple',
    colors: ['#581C87', '#6B21A8', '#7C3AED', '#8B5CF6', '#A78BFA'],
    description: 'Modern purple',
    suitableFor: ['ecommerce', 'technology']
  },
  'default': {
    name: 'Default',
    colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
    description: 'Default colorful palette',
    suitableFor: ['general']
  }
}

/**
 * Get color palette by name
 */
export const getColorPalette = (name) => {
  return COLOR_PALETTES[name] || COLOR_PALETTES.default
}

/**
 * Get all color palettes
 */
export const getAllColorPalettes = () => {
  return Object.keys(COLOR_PALETTES).map(key => ({
    key,
    ...COLOR_PALETTES[key]
  }))
}

