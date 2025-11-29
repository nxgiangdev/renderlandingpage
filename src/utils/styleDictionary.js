/**
 * Style Dictionary - Definitions for different design styles
 */

export const STYLE_DICTIONARY = {
  modern: {
    name: 'Modern',
    description: 'Clean, minimal, bold typography, geometric shapes',
    keywords: [
      'modern', 'hiện đại', 'contemporary', 'sleek', 'clean',
      'minimal', 'tối giản', 'simple', 'geometric', 'bold'
    ],
    characteristics: {
      typography: 'Bold, sans-serif fonts',
      colors: 'High contrast, vibrant or muted',
      spacing: 'Generous white space',
      shapes: 'Geometric, sharp edges'
    }
  },
  corporate: {
    name: 'Corporate',
    description: 'Professional, blue tones, structured, trustworthy',
    keywords: [
      'corporate', 'chuyên nghiệp', 'professional', 'business',
      'enterprise', 'formal', 'structured', 'trustworthy', 'reliable'
    ],
    characteristics: {
      typography: 'Clean, readable serif or sans-serif',
      colors: 'Blues, grays, whites',
      spacing: 'Organized, grid-based',
      shapes: 'Rectangular, structured'
    }
  },
  playful: {
    name: 'Playful',
    description: 'Colorful, rounded, fun, energetic',
    keywords: [
      'playful', 'vui nhộn', 'fun', 'colorful', 'vibrant',
      'energetic', 'creative', 'bold', 'bright', 'cheerful'
    ],
    characteristics: {
      typography: 'Rounded, friendly fonts',
      colors: 'Bright, saturated colors',
      spacing: 'Varied, dynamic',
      shapes: 'Rounded, organic'
    }
  },
  minimalist: {
    name: 'Minimalist',
    description: 'Lots of white space, simple, focused',
    keywords: [
      'minimalist', 'tối giản', 'minimal', 'simple', 'clean',
      'white space', 'focused', 'essential', 'sparse'
    ],
    characteristics: {
      typography: 'Thin, elegant fonts',
      colors: 'Monochrome or very limited palette',
      spacing: 'Extensive white space',
      shapes: 'Simple, geometric'
    }
  },
  vintage: {
    name: 'Vintage',
    description: 'Retro colors, classic fonts, nostalgic',
    keywords: [
      'vintage', 'cổ điển', 'retro', 'classic', 'nostalgic',
      'old', 'traditional', 'antique', 'heritage', 'timeless'
    ],
    characteristics: {
      typography: 'Serif, classic fonts',
      colors: 'Muted, sepia tones, browns',
      spacing: 'Traditional, balanced',
      shapes: 'Ornate, decorative'
    }
  },
  elegant: {
    name: 'Elegant',
    description: 'Sophisticated, refined, luxurious',
    keywords: [
      'elegant', 'sang trọng', 'luxury', 'sophisticated', 'refined',
      'premium', 'high-end', 'classy', 'polished'
    ],
    characteristics: {
      typography: 'Elegant serif or script fonts',
      colors: 'Rich, deep colors, gold accents',
      spacing: 'Balanced, refined',
      shapes: 'Curved, flowing'
    }
  },
  warm: {
    name: 'Warm',
    description: 'Cozy, inviting, earthy tones',
    keywords: [
      'warm', 'ấm áp', 'cozy', 'inviting', 'earthy',
      'natural', 'organic', 'comfortable', 'homey'
    ],
    characteristics: {
      typography: 'Friendly, readable fonts',
      colors: 'Warm oranges, browns, yellows',
      spacing: 'Comfortable, inviting',
      shapes: 'Soft, rounded'
    }
  },
  vibrant: {
    name: 'Vibrant',
    description: 'Bold, energetic, tropical colors',
    keywords: [
      'vibrant', 'sôi động', 'bold', 'energetic', 'tropical',
      'bright', 'saturated', 'lively', 'dynamic'
    ],
    characteristics: {
      typography: 'Bold, attention-grabbing',
      colors: 'Bright, saturated, tropical',
      spacing: 'Dynamic, varied',
      shapes: 'Organic, flowing'
    }
  },
  clean: {
    name: 'Clean',
    description: 'Simple, medical, sterile, trustworthy',
    keywords: [
      'clean', 'sạch sẽ', 'sterile', 'medical', 'hygienic',
      'simple', 'fresh', 'pure', 'crisp'
    ],
    characteristics: {
      typography: 'Clear, readable sans-serif',
      colors: 'Whites, light blues, greens',
      spacing: 'Open, airy',
      shapes: 'Simple, clean lines'
    }
  }
}

/**
 * Get style by key
 */
export const getStyle = (key) => {
  return STYLE_DICTIONARY[key] || STYLE_DICTIONARY.modern
}

/**
 * Get all styles
 */
export const getAllStyles = () => {
  return Object.keys(STYLE_DICTIONARY).map(key => ({
    key,
    ...STYLE_DICTIONARY[key]
  }))
}

