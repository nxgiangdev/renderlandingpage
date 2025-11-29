import { STYLE_DICTIONARY } from './styleDictionary'

/**
 * Detect style from prompt text
 * @param {string} prompt - User's prompt text
 * @returns {Object} { style: string, confidence: number, metadata: object }
 */
export const detectStyle = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return {
      style: 'modern',
      confidence: 0,
      metadata: STYLE_DICTIONARY.modern
    }
  }

  const lowerPrompt = prompt.toLowerCase()
  const matches = []

  // Score each style based on keyword matches
  for (const [styleKey, styleData] of Object.entries(STYLE_DICTIONARY)) {
    let score = 0
    const matchedKeywords = []

    styleData.keywords.forEach(keyword => {
      if (lowerPrompt.includes(keyword.toLowerCase())) {
        score += 1
        matchedKeywords.push(keyword)
      }
    })

    if (score > 0) {
      matches.push({
        style: styleKey,
        score,
        matchedKeywords,
        metadata: styleData
      })
    }
  }

  // Sort by score (highest first)
  matches.sort((a, b) => b.score - a.score)

  // Calculate confidence
  const confidence = matches.length > 0 
    ? Math.min(matches[0].score / 3, 1) // Normalize to 0-1
    : 0

  // Return best match or default to modern
  if (matches.length > 0 && confidence > 0.2) {
    return {
      style: matches[0].style,
      confidence,
      metadata: matches[0].metadata,
      matchedKeywords: matches[0].matchedKeywords
    }
  }

  return {
    style: 'modern',
    confidence: 0,
    metadata: STYLE_DICTIONARY.modern
  }
}

