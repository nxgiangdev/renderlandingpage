import { COLOR_PALETTES } from './colorPalettes'
import { INDUSTRY_DICTIONARY } from './industryDictionary'

/**
 * Suggest color palette based on industry and style
 * @param {string} industry - Industry key
 * @param {string} style - Style key
 * @returns {Object} Color palette object
 */
export const suggestColors = (industry, style) => {
  // Get industry-specific suggested colors
  const industryData = INDUSTRY_DICTIONARY[industry] || INDUSTRY_DICTIONARY.general
  const industryColors = industryData.suggestedColors || []

  // Try to match industry colors first
  if (industryColors.length > 0) {
    const firstColor = industryColors[0]
    const palette = COLOR_PALETTES[firstColor]
    if (palette) {
      return {
        name: firstColor,
        ...palette
      }
    }
  }

  // Style-based suggestions
  const styleColorMap = {
    modern: 'modern-gradient',
    corporate: 'corporate-blue',
    playful: 'neon',
    minimalist: 'pastel-blue',
    vintage: 'earth-brown',
    elegant: 'rose-gold',
    warm: 'warm-orange',
    vibrant: 'tropical-green',
    clean: 'pastel-blue'
  }

  const suggestedPalette = styleColorMap[style] || 'default'
  return {
    name: suggestedPalette,
    ...COLOR_PALETTES[suggestedPalette]
  }
}

/**
 * Get color suggestions for industry
 */
export const getIndustryColorSuggestions = (industry) => {
  const industryData = INDUSTRY_DICTIONARY[industry] || INDUSTRY_DICTIONARY.general
  return industryData.suggestedColors.map(colorKey => ({
    key: colorKey,
    ...COLOR_PALETTES[colorKey]
  }))
}

