import { INDUSTRY_DICTIONARY } from './industryDictionary'

/**
 * Detect industry from prompt text with confidence score
 * @param {string} prompt - User's prompt text
 * @returns {Object} { industry: string, confidence: number, metadata: object }
 */
export const detectIndustry = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return {
      industry: 'general',
      confidence: 0,
      metadata: INDUSTRY_DICTIONARY.general
    }
  }

  const lowerPrompt = prompt.toLowerCase()
  const matches = []

  // Score each industry based on keyword matches
  for (const [industryKey, industryData] of Object.entries(INDUSTRY_DICTIONARY)) {
    if (industryKey === 'general') continue

    let score = 0
    const matchedKeywords = []

    industryData.keywords.forEach(keyword => {
      if (lowerPrompt.includes(keyword.toLowerCase())) {
        score += 1
        matchedKeywords.push(keyword)
      }
    })

    if (score > 0) {
      matches.push({
        industry: industryKey,
        score,
        matchedKeywords,
        metadata: industryData
      })
    }
  }

  // Sort by score (highest first)
  matches.sort((a, b) => b.score - a.score)

  // Calculate confidence (0-1)
  const totalKeywords = matches.reduce((sum, m) => sum + m.score, 0)
  const confidence = matches.length > 0 
    ? Math.min(matches[0].score / 5, 1) // Normalize to 0-1, max at 5 matches
    : 0

  // Return best match or general
  if (matches.length > 0 && confidence > 0.2) {
    return {
      industry: matches[0].industry,
      confidence,
      metadata: matches[0].metadata,
      matchedKeywords: matches[0].matchedKeywords,
      alternatives: matches.slice(1, 3).map(m => ({
        industry: m.industry,
        score: m.score
      }))
    }
  }

  return {
    industry: 'general',
    confidence: 0,
    metadata: INDUSTRY_DICTIONARY.general
  }
}

/**
 * Get industry-specific prompt suggestions
 */
export const getIndustrySuggestions = (industryKey) => {
  const industry = INDUSTRY_DICTIONARY[industryKey] || INDUSTRY_DICTIONARY.general
  
  return {
    sections: industry.defaultSections,
    colors: industry.suggestedColors,
    style: industry.suggestedStyle
  }
}

