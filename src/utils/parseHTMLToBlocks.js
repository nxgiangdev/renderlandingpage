/**
 * Parse HTML string into blocks/components for drag & drop editing
 */

/**
 * Extract sections from HTML
 * @param {string} html - HTML string
 * @returns {Array} Array of block objects
 */
export const parseHTMLToBlocks = (html) => {
  if (!html) return []

  // Create a temporary DOM element to parse HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  
  const blocks = []
  const body = doc.body || doc.documentElement

  // Find major sections by common patterns
  const sectionSelectors = [
    'section',
    'header',
    'main',
    'footer',
    '[class*="hero"]',
    '[class*="Hero"]',
    '[class*="feature"]',
    '[class*="Feature"]',
    '[class*="cta"]',
    '[class*="CTA"]',
    '[class*="testimonial"]',
    '[class*="Testimonial"]',
    '[class*="pricing"]',
    '[class*="Pricing"]',
    '[id*="hero"]',
    '[id*="Hero"]',
    '[id*="feature"]',
    '[id*="Feature"]',
  ]

  // Try to find sections
  let sections = []
  sectionSelectors.forEach(selector => {
    try {
      const elements = body.querySelectorAll(selector)
      elements.forEach(el => {
        if (!sections.includes(el)) {
          sections.push(el)
        }
      })
    } catch (e) {
      // Invalid selector, skip
    }
  })

  // If no sections found, try to split by divs with significant content
  if (sections.length === 0) {
    const divs = body.querySelectorAll('div')
    divs.forEach(div => {
      const text = div.textContent?.trim() || ''
      const hasSignificantContent = text.length > 50 || div.children.length > 2
      if (hasSignificantContent && !sections.includes(div)) {
        sections.push(div)
      }
    })
  }

  // If still no sections, use body's direct children
  if (sections.length === 0) {
    Array.from(body.children).forEach(child => {
      sections.push(child)
    })
  }

  // Convert sections to blocks
  sections.forEach((section, index) => {
    const block = {
      id: `block-${index}-${Date.now()}`,
      type: detectBlockType(section),
      html: section.outerHTML,
      name: getBlockName(section, index),
      order: index,
    }
    blocks.push(block)
  })

  // If no blocks found, create a single block with all content
  if (blocks.length === 0) {
    blocks.push({
      id: `block-0-${Date.now()}`,
      type: 'content',
      html: body.innerHTML || html,
      name: 'Content',
      order: 0,
    })
  }

  return blocks
}

/**
 * Detect block type based on element
 */
const detectBlockType = (element) => {
  const className = element.className?.toLowerCase() || ''
  const id = element.id?.toLowerCase() || ''
  const tagName = element.tagName?.toLowerCase() || ''
  const text = element.textContent?.toLowerCase() || ''

  // Check for hero section
  if (tagName === 'header' || className.includes('hero') || id.includes('hero') || text.includes('hero')) {
    return 'hero'
  }

  // Check for features
  if (className.includes('feature') || id.includes('feature') || text.includes('feature')) {
    return 'features'
  }

  // Check for CTA
  if (className.includes('cta') || id.includes('cta') || text.includes('call to action') || text.includes('get started')) {
    return 'cta'
  }

  // Check for testimonials
  if (className.includes('testimonial') || id.includes('testimonial') || text.includes('testimonial')) {
    return 'testimonials'
  }

  // Check for pricing
  if (className.includes('pricing') || id.includes('pricing') || text.includes('pricing') || text.includes('price')) {
    return 'pricing'
  }

  // Check for footer
  if (tagName === 'footer' || className.includes('footer') || id.includes('footer')) {
    return 'footer'
  }

  return 'content'
}

/**
 * Get block name for display
 */
const getBlockName = (element, index) => {
  const type = detectBlockType(element)
  const typeNames = {
    hero: 'Hero Section',
    features: 'Features',
    cta: 'Call to Action',
    testimonials: 'Testimonials',
    pricing: 'Pricing',
    footer: 'Footer',
    content: `Section ${index + 1}`,
  }
  return typeNames[type] || `Block ${index + 1}`
}

/**
 * Convert blocks back to HTML
 * @param {Array} blocks - Array of block objects
 * @returns {string} HTML string
 */
export const blocksToHTML = (blocks) => {
  if (!blocks || blocks.length === 0) return ''

  // Sort blocks by order
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order)

  // Extract HTML from each block
  const htmlParts = sortedBlocks.map(block => block.html)

  // Wrap in basic HTML structure if needed
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${htmlParts.join('\n')}
</body>
</html>`
}

/**
 * Update a specific block's HTML
 * @param {Array} blocks - Array of blocks
 * @param {string} blockId - ID of block to update
 * @param {string} newHTML - New HTML content
 * @returns {Array} Updated blocks array
 */
export const updateBlockHTML = (blocks, blockId, newHTML) => {
  return blocks.map(block => 
    block.id === blockId 
      ? { ...block, html: newHTML }
      : block
  )
}

/**
 * Reorder blocks
 * @param {Array} blocks - Array of blocks
 * @param {string} activeId - ID of dragged block
 * @param {string} overId - ID of target position
 * @returns {Array} Reordered blocks array
 */
export const reorderBlocks = (blocks, activeId, overId) => {
  const activeIndex = blocks.findIndex(block => block.id === activeId)
  const overIndex = blocks.findIndex(block => block.id === overId)

  if (activeIndex === -1 || overIndex === -1) return blocks

  const newBlocks = [...blocks]
  const [removed] = newBlocks.splice(activeIndex, 1)
  newBlocks.splice(overIndex, 0, removed)

  // Update order property
  return newBlocks.map((block, index) => ({
    ...block,
    order: index
  }))
}

/**
 * Remove a block
 * @param {Array} blocks - Array of blocks
 * @param {string} blockId - ID of block to remove
 * @returns {Array} Updated blocks array
 */
export const removeBlock = (blocks, blockId) => {
  return blocks
    .filter(block => block.id !== blockId)
    .map((block, index) => ({
      ...block,
      order: index
    }))
}

