/**
 * Industry Dictionary - Keywords and metadata for industry detection
 */

export const INDUSTRY_DICTIONARY = {
  beauty: {
    name: 'Beauty & Spa',
    keywords: [
      'beauty', 'spa', 'salon', 'làm đẹp', 'chăm sóc sắc đẹp', 'thẩm mỹ',
      'skincare', 'makeup', 'cosmetic', 'facial', 'massage', 'nail',
      'hair', 'tóc', 'da', 'mỹ phẩm', 'spa', 'wellness', 'relaxation'
    ],
    defaultSections: ['hero', 'services', 'testimonials', 'booking', 'footer'],
    suggestedColors: ['pastel-pink', 'rose-gold', 'lavender', 'soft-purple'],
    suggestedStyle: 'elegant'
  },
  fitness: {
    name: 'Gym & Fitness',
    keywords: [
      'gym', 'fitness', 'workout', 'thể hình', 'tập luyện', 'exercise',
      'training', 'yoga', 'pilates', 'crossfit', 'bodybuilding', 'cardio',
      'personal trainer', 'fitness center', 'health club', 'phòng gym'
    ],
    defaultSections: ['hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'],
    suggestedColors: ['energetic-red', 'dark-gray', 'orange', 'black'],
    suggestedStyle: 'modern'
  },
  restaurant: {
    name: 'Restaurant & F&B',
    keywords: [
      'restaurant', 'food', 'cafe', 'nhà hàng', 'quán ăn', 'đồ ăn',
      'cuisine', 'dining', 'menu', 'chef', 'cooking', 'bistro', 'bar',
      'pizza', 'sushi', 'italian', 'vietnamese', 'chinese', 'thức ăn'
    ],
    defaultSections: ['hero', 'menu', 'about', 'testimonials', 'reservation', 'footer'],
    suggestedColors: ['warm-orange', 'burgundy', 'gold', 'earth-brown'],
    suggestedStyle: 'warm'
  },
  realestate: {
    name: 'Real Estate',
    keywords: [
      'real estate', 'bất động sản', 'nhà đất', 'property', 'house',
      'apartment', 'condo', 'villa', 'land', 'investment', 'buy', 'sell',
      'rent', 'mua nhà', 'bán nhà', 'cho thuê', 'dự án'
    ],
    defaultSections: ['hero', 'properties', 'features', 'testimonials', 'contact', 'footer'],
    suggestedColors: ['corporate-blue', 'navy', 'gray', 'white'],
    suggestedStyle: 'corporate'
  },
  ecommerce: {
    name: 'E-commerce',
    keywords: [
      'ecommerce', 'shop', 'store', 'cửa hàng', 'bán hàng', 'online store',
      'retail', 'shopping', 'products', 'buy', 'cart', 'checkout', 'marketplace',
      'fashion', 'clothing', 'accessories', 'thời trang', 'quần áo'
    ],
    defaultSections: ['hero', 'products', 'features', 'testimonials', 'cta', 'footer'],
    suggestedColors: ['primary-blue', 'teal', 'purple', 'modern-gradient'],
    suggestedStyle: 'modern'
  },
  saas: {
    name: 'SaaS Startup',
    keywords: [
      'saas', 'software', 'app', 'ứng dụng', 'phần mềm', 'platform',
      'startup', 'tech', 'software as a service', 'cloud', 'api',
      'dashboard', 'analytics', 'tool', 'solution', 'productivity'
    ],
    defaultSections: ['hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'],
    suggestedColors: ['corporate-blue', 'tech-blue', 'gradient-blue', 'modern-blue'],
    suggestedStyle: 'corporate'
  },
  travel: {
    name: 'Travel & Tourism',
    keywords: [
      'travel', 'tour', 'du lịch', 'tourism', 'vacation', 'holiday',
      'trip', 'destination', 'hotel', 'resort', 'booking', 'flight',
      'adventure', 'explore', 'journey', 'tourist', 'sightseeing'
    ],
    defaultSections: ['hero', 'destinations', 'packages', 'testimonials', 'booking', 'footer'],
    suggestedColors: ['ocean-blue', 'tropical-green', 'sunset-orange', 'sky-blue'],
    suggestedStyle: 'vibrant'
  },
  education: {
    name: 'Education',
    keywords: [
      'education', 'học tập', 'giáo dục', 'school', 'university', 'course',
      'learning', 'training', 'tutorial', 'class', 'student', 'teacher',
      'online course', 'e-learning', 'academy', 'institute', 'học viện'
    ],
    defaultSections: ['hero', 'courses', 'features', 'testimonials', 'enrollment', 'footer'],
    suggestedColors: ['academic-blue', 'knowledge-green', 'scholarly-purple'],
    suggestedStyle: 'professional'
  },
  healthcare: {
    name: 'Healthcare',
    keywords: [
      'health', 'medical', 'y tế', 'sức khỏe', 'hospital', 'clinic',
      'doctor', 'patient', 'treatment', 'medicine', 'wellness', 'care',
      'pharmacy', 'dental', 'therapy', 'bệnh viện', 'phòng khám'
    ],
    defaultSections: ['hero', 'services', 'doctors', 'testimonials', 'appointment', 'footer'],
    suggestedColors: ['medical-blue', 'clean-white', 'trust-green', 'calm-teal'],
    suggestedStyle: 'clean'
  },
  technology: {
    name: 'Technology',
    keywords: [
      'tech', 'technology', 'công nghệ', 'software', 'hardware', 'it',
      'digital', 'innovation', 'ai', 'machine learning', 'blockchain',
      'cybersecurity', 'development', 'programming', 'code', 'developer'
    ],
    defaultSections: ['hero', 'features', 'solutions', 'testimonials', 'cta', 'footer'],
    suggestedColors: ['tech-blue', 'dark-mode', 'neon', 'futuristic'],
    suggestedStyle: 'modern'
  },
  general: {
    name: 'General',
    keywords: [],
    defaultSections: ['hero', 'features', 'testimonials', 'cta', 'footer'],
    suggestedColors: ['default'],
    suggestedStyle: 'modern'
  }
}

/**
 * Get industry by name/key
 */
export const getIndustry = (key) => {
  return INDUSTRY_DICTIONARY[key] || INDUSTRY_DICTIONARY.general
}

/**
 * Get all industry names
 */
export const getAllIndustries = () => {
  return Object.keys(INDUSTRY_DICTIONARY).map(key => ({
    key,
    ...INDUSTRY_DICTIONARY[key]
  }))
}

