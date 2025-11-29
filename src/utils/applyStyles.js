/**
 * Utility functions to apply TailwindCSS classes to HTML elements
 */

/**
 * Apply color styles to an element
 */
export const applyColorStyles = (element, colors) => {
  if (!element) return

  // Remove existing color classes
  const colorClasses = [
    'bg-', 'text-', 'border-',
  ]
  
  // Apply new colors
  if (colors.backgroundColor) {
    element.className = element.className.replace(/bg-\w+-\d+/g, '')
    element.className += ` bg-[${colors.backgroundColor}]`
  }
  
  if (colors.textColor) {
    element.className = element.className.replace(/text-\w+-\d+/g, '')
    element.className += ` text-[${colors.textColor}]`
  }
  
  if (colors.borderColor) {
    element.className = element.className.replace(/border-\w+-\d+/g, '')
    element.className += ` border-[${colors.borderColor}]`
  }
}

/**
 * Apply typography styles
 */
export const applyTypographyStyles = (element, typography) => {
  if (!element) return

  // Font family
  if (typography.fontFamily) {
    element.className = element.className.replace(/font-(sans|serif|mono)/g, '')
    element.className += ` font-${typography.fontFamily}`
  }

  // Font size
  if (typography.fontSize) {
    element.className = element.className.replace(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl)/g, '')
    element.className += ` ${typography.fontSize}`
  }

  // Font weight
  if (typography.fontWeight) {
    element.className = element.className.replace(/font-(light|normal|medium|semibold|bold)/g, '')
    element.className += ` ${typography.fontWeight}`
  }

  // Line height (using inline style as Tailwind doesn't have all values)
  if (typography.lineHeight) {
    element.style.lineHeight = typography.lineHeight
  }
}

/**
 * Apply spacing styles
 */
export const applySpacingStyles = (element, spacing) => {
  if (!element) return

  // Padding
  if (spacing.padding) {
    const paddingValue = `${spacing.padding}px`
    element.style.padding = paddingValue
  }

  // Margin
  if (spacing.margin) {
    const marginValue = `${spacing.margin}px`
    element.style.margin = marginValue
  }

  // Gap (for flex/grid containers)
  if (spacing.gap) {
    const gapValue = `${spacing.gap}px`
    element.style.gap = gapValue
  }
}

/**
 * Convert styles object to TailwindCSS classes string
 */
export const stylesToClasses = (styles) => {
  const classes = []

  if (styles.backgroundColor) {
    classes.push(`bg-[${styles.backgroundColor}]`)
  }
  if (styles.textColor) {
    classes.push(`text-[${styles.textColor}]`)
  }
  if (styles.borderColor) {
    classes.push(`border-[${styles.borderColor}]`)
  }
  if (styles.fontFamily) {
    classes.push(`font-${styles.fontFamily}`)
  }
  if (styles.fontSize) {
    classes.push(styles.fontSize)
  }
  if (styles.fontWeight) {
    classes.push(styles.fontWeight)
  }

  return classes.join(' ')
}

/**
 * Update HTML element with new styles
 */
export const updateElementStyles = (html, elementSelector, styles) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const element = doc.querySelector(elementSelector)

  if (!element) return html

  // Apply styles
  if (styles.colors) {
    applyColorStyles(element, styles.colors)
  }
  if (styles.typography) {
    applyTypographyStyles(element, styles.typography)
  }
  if (styles.spacing) {
    applySpacingStyles(element, styles.spacing)
  }

  return doc.documentElement.outerHTML
}

