import { useEffect, useRef } from 'react'

const Preview = ({ code, device = 'mobile' }) => {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current
      
      // Wait for iframe to load
      const loadIframe = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
          
          if (iframeDoc) {
            // Clear existing content
            iframeDoc.open()
            
            // Check if TailwindCSS is already in the code
            let htmlCode = code
            if (!htmlCode.includes('cdn.tailwindcss.com') && !htmlCode.includes('tailwindcss')) {
              // Inject TailwindCSS CDN if not present
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
                // If no head/body, wrap in basic HTML structure
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

            // Write HTML content
            iframeDoc.write(htmlCode)
            iframeDoc.close()
          }
        } catch (error) {
          console.error('Error loading preview:', error)
        }
      }

      // If iframe is already loaded
      if (iframe.contentDocument?.readyState === 'complete') {
        loadIframe()
      } else {
        // Wait for iframe to load
        iframe.onload = loadIframe
        // Also try immediately in case it's already loaded
        setTimeout(loadIframe, 100)
      }
    }
  }, [code])

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
    <div className="border rounded-lg overflow-hidden bg-white">
      <iframe
        ref={iframeRef}
        title="Preview"
        className="w-full border-0"
        sandbox="allow-same-origin allow-scripts"
        style={{ 
          minHeight: '600px',
          height: 'calc(100vh - 300px)',
          maxHeight: '90vh',
          width: device === 'mobile' ? '375px' : device === 'tablet' ? '768px' : '100%',
          margin: device !== 'desktop' ? '0 auto' : '0',
          display: 'block',
          border: device !== 'desktop' ? '8px solid #1f2937' : 'none',
          borderRadius: device !== 'desktop' ? '12px' : '0',
        }}
      />
    </div>
  )
}

export default Preview

