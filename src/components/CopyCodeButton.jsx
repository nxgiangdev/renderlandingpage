import { useState } from 'react'
import { copyToClipboard, extractCSS, extractJS, formatHTML } from '../utils/copyToClipboard'
import Toast from './Toast'

const CopyCodeButton = ({ code, type = 'full' }) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const handleCopy = async (copyType) => {
    let textToCopy = ''

    switch (copyType) {
      case 'full':
        textToCopy = formatHTML(code)
        break
      case 'html':
        // Extract just the body content
        const parser = new DOMParser()
        const doc = parser.parseFromString(code, 'text/html')
        textToCopy = doc.body ? formatHTML(doc.body.innerHTML) : formatHTML(code)
        break
      case 'css':
        textToCopy = extractCSS(code) || '/* No CSS found */'
        break
      case 'js':
        textToCopy = extractJS(code) || '// No JavaScript found'
        break
      default:
        textToCopy = code
    }

    const success = await copyToClipboard(textToCopy)

    if (success) {
      setToastMessage(`Copied ${copyType === 'full' ? 'HTML' : copyType.toUpperCase()} to clipboard!`)
      setToastType('success')
      setShowToast(true)
    } else {
      setToastMessage('Failed to copy to clipboard')
      setToastType('error')
      setShowToast(true)
    }
  }

  if (type === 'dropdown') {
    return (
      <>
        <div className="relative">
          <button
            onClick={() => handleCopy('full')}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
        </div>

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </>
    )
  }

  // Simple button with dropdown menu
  return (
    <>
      <div className="relative group">
        <button
          onClick={() => handleCopy('full')}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Code
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
          <button
            onClick={() => handleCopy('full')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Copy Full HTML
          </button>
          <button
            onClick={() => handleCopy('html')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Copy HTML Only
          </button>
          <button
            onClick={() => handleCopy('css')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Copy CSS Only
          </button>
          <button
            onClick={() => handleCopy('js')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Copy JavaScript Only
          </button>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}

export default CopyCodeButton

