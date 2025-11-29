import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { generateHTMLFiles, generateReactFiles, generateNextJSFiles } from '../utils/generateProjectFiles'

/**
 * Export HTML standalone project
 */
export const exportHTML = async (htmlCode, filename = 'landing-page') => {
  try {
    const zip = new JSZip()
    const files = generateHTMLFiles(htmlCode)

    // Add files to ZIP
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content)
    })

    // Generate ZIP file
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `${filename}-html.zip`)
    
    return { success: true, message: 'HTML project exported successfully!' }
  } catch (error) {
    console.error('Error exporting HTML:', error)
    throw new Error('Failed to export HTML project')
  }
}

/**
 * Export React project
 */
export const exportReactProject = async (htmlCode, filename = 'landing-page') => {
  try {
    const zip = new JSZip()
    const files = generateReactFiles(htmlCode)

    // Add files to ZIP
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content)
    })

    // Generate ZIP file
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `${filename}-react.zip`)
    
    return { success: true, message: 'React project exported successfully!' }
  } catch (error) {
    console.error('Error exporting React project:', error)
    throw new Error('Failed to export React project')
  }
}

/**
 * Export Next.js project
 */
export const exportNextJSProject = async (htmlCode, filename = 'landing-page') => {
  try {
    const zip = new JSZip()
    const files = generateNextJSFiles(htmlCode)

    // Add files to ZIP
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content)
    })

    // Generate ZIP file
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `${filename}-nextjs.zip`)
    
    return { success: true, message: 'Next.js project exported successfully!' }
  } catch (error) {
    console.error('Error exporting Next.js project:', error)
    throw new Error('Failed to export Next.js project')
  }
}

/**
 * Export based on format
 */
export const exportProject = async (htmlCode, format, options = {}) => {
  const filename = options.filename || 'landing-page'

  switch (format) {
    case 'html':
      return await exportHTML(htmlCode, filename)
    case 'react':
      return await exportReactProject(htmlCode, filename)
    case 'nextjs':
      return await exportNextJSProject(htmlCode, filename)
    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
}

