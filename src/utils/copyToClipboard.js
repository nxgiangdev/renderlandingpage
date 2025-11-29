/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    // Use modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        return successful
      } catch (err) {
        document.body.removeChild(textArea)
        return false
      }
    }
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

/**
 * Extract CSS from HTML
 */
export const extractCSS = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const styleTags = doc.querySelectorAll('style')
  return Array.from(styleTags).map(tag => tag.textContent).join('\n\n')
}

/**
 * Extract JavaScript from HTML
 */
export const extractJS = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const scriptTags = doc.querySelectorAll('script:not([src])')
  return Array.from(scriptTags).map(tag => tag.textContent).join('\n\n')
}

/**
 * Format HTML (basic prettify)
 */
export const formatHTML = (html) => {
  // Basic HTML formatting
  let formatted = html
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .replace(/></g, '>\n<') // Add newlines between tags
  
  // Add indentation (simplified)
  const lines = formatted.split('\n')
  let indent = 0
  const indented = lines.map(line => {
    const trimmed = line.trim()
    if (!trimmed) return ''
    
    if (trimmed.startsWith('</')) {
      indent = Math.max(0, indent - 2)
    }
    
    const result = ' '.repeat(indent) + trimmed
    
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
      indent += 2
    }
    
    return result
  })
  
  return indented.join('\n')
}

