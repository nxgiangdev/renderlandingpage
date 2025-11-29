import { useState, useEffect } from 'react'
import EditorTabs from './EditorTabs'
import CodeEditor from './CodeEditor'

const CodeEditorPanel = ({ code, onCodeChange, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('html')
  const [htmlCode, setHtmlCode] = useState(code || '')
  const [cssCode, setCssCode] = useState('')
  const [jsCode, setJsCode] = useState('')

  useEffect(() => {
    if (code) {
      setHtmlCode(code)
      // Extract CSS and JS from HTML if present
      extractCSSAndJS(code)
    }
  }, [code])

  const extractCSSAndJS = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Extract CSS
    const styleTags = doc.querySelectorAll('style')
    const css = Array.from(styleTags).map(tag => tag.textContent).join('\n')
    setCssCode(css)

    // Extract JS
    const scriptTags = doc.querySelectorAll('script:not([src])')
    const js = Array.from(scriptTags).map(tag => tag.textContent).join('\n')
    setJsCode(js)
  }

  const handleCodeChange = (newCode, type) => {
    if (type === 'html') {
      setHtmlCode(newCode)
      if (onCodeChange) {
        onCodeChange(newCode)
      }
    } else if (type === 'css') {
      setCssCode(newCode)
      // Inject CSS into HTML
      const updatedHTML = injectCSS(htmlCode, newCode)
      if (onCodeChange) {
        onCodeChange(updatedHTML)
      }
    } else if (type === 'js') {
      setJsCode(newCode)
      // Inject JS into HTML
      const updatedHTML = injectJS(htmlCode, newCode)
      if (onCodeChange) {
        onCodeChange(updatedHTML)
      }
    }
  }

  const injectCSS = (html, css) => {
    if (!css.trim()) return html
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Remove existing style tags
    doc.querySelectorAll('style').forEach(style => style.remove())
    
    // Add new style tag
    const style = doc.createElement('style')
    style.textContent = css
    doc.head.appendChild(style)
    
    return doc.documentElement.outerHTML
  }

  const injectJS = (html, js) => {
    if (!js.trim()) return html
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Remove existing script tags (except external ones)
    doc.querySelectorAll('script:not([src])').forEach(script => script.remove())
    
    // Add new script tag
    const script = doc.createElement('script')
    script.textContent = js
    doc.body.appendChild(script)
    
    return doc.documentElement.outerHTML
  }

  const tabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Chỉnh sửa mã
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <EditorTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'html' && (
            <CodeEditor
              code={htmlCode}
              onChange={(value) => handleCodeChange(value, 'html')}
              language="html"
            />
          )}
          {activeTab === 'css' && (
            <CodeEditor
              code={cssCode}
              onChange={(value) => handleCodeChange(value, 'css')}
              language="css"
            />
          )}
          {activeTab === 'js' && (
            <CodeEditor
              code={jsCode}
              onChange={(value) => handleCodeChange(value, 'js')}
              language="javascript"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeEditorPanel

