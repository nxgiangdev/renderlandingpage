import { useEffect, useRef, useState } from 'react'
import InlineEditor from './InlineEditor'
import ImageEditor from './ImageEditor'
import { useInlineEdit } from '../hooks/useInlineEdit'

const EditablePreview = ({ code, selectedBlockId, onUpdateBlock, blocks, onSelectBlock, device = 'mobile' }) => {
  const iframeRef = useRef(null)
  const [editableElements, setEditableElements] = useState([])
  const [forceReload, setForceReload] = useState(0)
  const [editingImage, setEditingImage] = useState(null)
  const [editingImageBlockId, setEditingImageBlockId] = useState(null)
  const { editingElement, editingBlockId, isEditing, startEditing, stopEditing } = useInlineEdit()

  useEffect(() => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current
      
      const loadIframe = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
          
          if (iframeDoc) {
            iframeDoc.open()
            
            let htmlCode = code
            if (!htmlCode.includes('cdn.tailwindcss.com') && !htmlCode.includes('tailwindcss')) {
              if (htmlCode.includes('</head>')) {
                htmlCode = htmlCode.replace(
                  '</head>',
                  '<script src="https://cdn.tailwindcss.com"></script>\n</head>'
                )
              } else if (htmlCode.includes('<body')) {
                htmlCode = htmlCode.replace(
                  '<body',
                  '<script src="https://cdn.tailwindcss.com"></script>\n<body'
                )
              } else {
                htmlCode = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${htmlCode}
</body>
</html>`
              }
            }

            iframeDoc.write(htmlCode)
            iframeDoc.close()

            // Make text elements editable after a short delay
            setTimeout(() => {
              makeElementsEditable(iframeDoc)
            }, 200)
          }
        } catch (error) {
          console.error('Error loading preview:', error)
        }
      }

      if (iframe.contentDocument?.readyState === 'complete') {
        loadIframe()
      } else {
        iframe.onload = loadIframe
        setTimeout(loadIframe, 100)
      }
    }
  }, [code, forceReload, blocks])

  const findBlockContainingElement = (element, iframeDoc) => {
    if (!blocks || blocks.length === 0) return null
    
    // Create a parser to check which block contains this element
    const parser = new DOMParser()
    
    for (const block of blocks) {
      try {
        const blockDoc = parser.parseFromString(block.html, 'text/html')
        const blockBody = blockDoc.body || blockDoc.documentElement
        
        // Check if element is within this block's HTML
        if (blockBody && element) {
          // Try to find the element in the block's HTML by text content
          const elementText = element.textContent?.trim()
          
          if (elementText && elementText.length > 0) {
            // Check if block HTML contains similar text
            const blockText = blockBody.textContent || ''
            if (blockText.includes(elementText.substring(0, Math.min(50, elementText.length)))) {
              return block.id
            }
          }
          
          // Also check by class/id
          const elementClass = element.className || ''
          const elementId = element.id || ''
          const blockHtml = block.html || ''
          
          if (elementClass && blockHtml.includes(elementClass)) {
            return block.id
          }
          if (elementId && blockHtml.includes(elementId)) {
            return block.id
          }
        }
      } catch (e) {
        // Continue to next block
      }
    }
    
    // If not found, try to find by traversing up the DOM tree
    let current = element
    const body = iframeDoc?.body || iframeDoc?.documentElement
    
    while (current && current !== body && current.parentElement) {
      // Check if current element matches any block
      for (const block of blocks) {
        try {
          const blockHtml = block.html || ''
          const currentClass = current.className || ''
          const currentId = current.id || ''
          
          if (currentClass && blockHtml.includes(currentClass)) {
            return block.id
          }
          if (currentId && blockHtml.includes(currentId)) {
            return block.id
          }
        } catch (e) {
          // Continue
        }
      }
      current = current.parentElement
    }
    
    return null
  }

  const makeElementsEditable = (doc) => {
    // Find all text-containing elements
    const textElements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, label, button')
    
    textElements.forEach((element) => {
      // Skip if already has click handler
      if (element.dataset.editable === 'true') return

      element.dataset.editable = 'true'
      element.style.cursor = 'text'
      element.classList.add('hover:bg-blue-50', 'transition-colors')

      element.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        // Get iframe document
        const iframe = iframeRef.current
        const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
        
        // Store original text for matching
        const originalText = element.textContent?.trim() || ''
        element.setAttribute('data-original-text', originalText)
        
        // Find which block contains this element
        let blockId = selectedBlockId
        
        // If no block selected, try to find the block containing this element
        if (!blockId && blocks && blocks.length > 0 && iframeDoc) {
          blockId = findBlockContainingElement(element, iframeDoc)
          
          // Auto-select the block if found
          if (blockId && onSelectBlock) {
            onSelectBlock(blockId)
          }
        }
        
        // Allow editing if we have a block (either selected or found)
        if (blockId) {
          startEditing(element, blockId)
        } else {
          // If no block found, still allow editing but use a temporary block
          // This handles cases where blocks haven't been parsed yet
          console.log('No block found for element, allowing edit anyway')
          startEditing(element, 'temp-block')
        }
      })
    })

    // Make images editable
    const images = doc.querySelectorAll('img')
    images.forEach((img) => {
      // Skip if already has click handler
      if (img.dataset.imageEditable === 'true') return

      img.dataset.imageEditable = 'true'
      img.style.cursor = 'pointer'
      img.classList.add('hover:opacity-80', 'transition-opacity', 'border-2', 'border-transparent', 'hover:border-blue-400')

      img.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        // Get iframe document
        const iframe = iframeRef.current
        const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
        
        // Find which block contains this image
        let blockId = selectedBlockId
        
        // If no block selected, try to find the block containing this image
        if (!blockId && blocks && blocks.length > 0 && iframeDoc) {
          blockId = findBlockContainingElement(img, iframeDoc)
          
          // Auto-select the block if found
          if (blockId && onSelectBlock) {
            onSelectBlock(blockId)
          }
        }
        
        // Open image editor
        if (blockId) {
          setEditingImage(img)
          setEditingImageBlockId(blockId)
        } else {
          console.log('No block found for image, allowing edit anyway')
          setEditingImage(img)
          setEditingImageBlockId('temp-block')
        }
      })
    })
  }

  const handleSaveImage = (newImageUrl) => {
    if (editingImage && editingImageBlockId && onUpdateBlock) {
      // Get current image src for matching
      const iframe = iframeRef.current
      const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
      const currentSrc = editingImage.src || editingImage.getAttribute('src') || ''
      
      console.log('Saving image:', { currentSrc, newImageUrl, blockId: editingImageBlockId })
      
      // Find the block
      if (blocks && blocks.length > 0) {
        const block = blocks.find(b => b.id === editingImageBlockId)
        if (block) {
          // Parse block HTML
          const parser = new DOMParser()
          const blockDoc = parser.parseFromString(block.html, 'text/html')
          const blockBody = blockDoc.body || blockDoc.documentElement
          
          if (blockBody) {
            // Find the image in block HTML by matching src
            const images = blockBody.querySelectorAll('img')
            let imageFound = false
            
            console.log('Found images in block:', images.length)
            
            for (const img of images) {
              const imgSrc = img.getAttribute('src') || img.src || ''
              const imgSrcClean = imgSrc.split('?')[0] // Remove query params
              const currentSrcClean = currentSrc.split('?')[0]
              
              // Match by src (exact or partial)
              if (currentSrc && imgSrc && (
                imgSrc === currentSrc || 
                imgSrcClean === currentSrcClean ||
                imgSrc.includes(currentSrc.split('/').pop()) ||
                currentSrc.includes(imgSrc.split('/').pop())
              )) {
                console.log('Matching image found, updating:', { imgSrc, currentSrc })
                img.setAttribute('src', newImageUrl)
                img.src = newImageUrl
                imageFound = true
                break
              }
            }
            
            // If no exact match, update first image (fallback)
            if (!imageFound && images.length > 0) {
              console.log('No exact match, updating first image')
              images[0].setAttribute('src', newImageUrl)
              images[0].src = newImageUrl
            }
            
            // Get updated block HTML - get the root element's outerHTML
            let updatedBlockHTML = block.html
            if (blockBody.children.length > 0) {
              // Get first child (the actual block element)
              updatedBlockHTML = blockBody.children[0].outerHTML
            } else if (blockBody.innerHTML) {
              // Fallback to innerHTML
              updatedBlockHTML = blockBody.innerHTML
            }
            
            console.log('Updated block HTML length:', updatedBlockHTML.length)
            
            // Update the block FIRST
            onUpdateBlock(editingImageBlockId, updatedBlockHTML)
            
            // Also update the image directly in iframe for immediate feedback
            if (iframeDoc && editingImage) {
              editingImage.src = newImageUrl
              editingImage.setAttribute('src', newImageUrl)
            }
            
            // Wait a bit before reloading to ensure state is updated
            setTimeout(() => {
              // Force reload iframe AFTER block is updated
              setForceReload(prev => prev + 1)
            }, 200)
          }
        }
      }
    }
    
    // Close image editor
    setEditingImage(null)
    setEditingImageBlockId(null)
  }

  const handleSaveEdit = (newText) => {
    if (editingElement && editingBlockId && onUpdateBlock) {
      // Get original text for matching
      const originalText = editingElement.getAttribute('data-original-text') || editingElement.textContent?.trim() || ''
      
      // Find the block
      if (blocks && blocks.length > 0) {
        const block = blocks.find(b => b.id === editingBlockId)
        if (block) {
          // Parse block HTML
          const parser = new DOMParser()
          const blockDoc = parser.parseFromString(block.html, 'text/html')
          const blockBody = blockDoc.body || blockDoc.documentElement
          
          if (blockBody) {
            // Find the element in block HTML by matching original text
            const elementTag = editingElement.tagName?.toLowerCase()
            const matchingElements = blockBody.querySelectorAll(elementTag)
            
            for (const el of matchingElements) {
              const elText = el.textContent?.trim() || ''
              // Match by original text
              if (originalText && elText && elText.includes(originalText.substring(0, Math.min(30, originalText.length)))) {
                el.textContent = newText
                break
              }
            }
            
            // Get updated block HTML - use outerHTML of the root element
            let updatedBlockHTML = ''
            if (blockBody.children.length > 0) {
              // If body has children, get the first child's outerHTML (the actual block)
              updatedBlockHTML = blockBody.children[0].outerHTML || block.html
            } else {
              // Fallback to innerHTML
              updatedBlockHTML = blockBody.innerHTML || block.html
            }
            
            // Update the block
            onUpdateBlock(editingBlockId, updatedBlockHTML)
            
            // Force reload iframe
            setForceReload(prev => prev + 1)
          }
        }
      }
    }
    
    // Stop editing
    stopEditing()
  }

  if (!code) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-4 text-sm text-gray-500">
            Landing page sẽ hiển thị ở đây
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Nhập prompt và nhấn Generate để bắt đầu
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-white relative">
        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
        )}
        <iframe
          ref={iframeRef}
          title="Editable Preview"
          className="w-full border-0"
          sandbox="allow-same-origin allow-scripts"
          style={{ 
            minHeight: '600px',
            height: 'calc(100vh - 300px)',
            maxHeight: '90vh',
            pointerEvents: isEditing || editingImage ? 'none' : 'auto',
            width: device === 'mobile' ? '375px' : device === 'tablet' ? '768px' : '100%',
            margin: device !== 'desktop' ? '0 auto' : '0',
            display: 'block',
            border: device !== 'desktop' ? '8px solid #1f2937' : 'none',
            borderRadius: device !== 'desktop' ? '12px' : '0',
          }}
        />
      </div>

      {isEditing && (
        <InlineEditor
          element={editingElement}
          onSave={handleSaveEdit}
          onCancel={stopEditing}
        />
      )}

      {editingImage && (
        <ImageEditor
          element={editingImage}
          onSave={handleSaveImage}
          onCancel={() => {
            setEditingImage(null)
            setEditingImageBlockId(null)
          }}
        />
      )}
    </>
  )
}

export default EditablePreview

