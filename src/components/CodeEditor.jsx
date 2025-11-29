import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

const CodeEditor = ({ code, onChange, language = 'html' }) => {
  const [editorCode, setEditorCode] = useState(code || '')

  useEffect(() => {
    if (code !== editorCode) {
      setEditorCode(code || '')
    }
  }, [code])

  const handleEditorChange = (value) => {
    setEditorCode(value || '')
    if (onChange) {
      onChange(value || '')
    }
  }

  const handleFormat = () => {
    // Monaco Editor has built-in format on save
    // This is handled by the editor's formatDocument command
    // Users can use Shift+Alt+F (or Shift+Option+F on Mac)
  }

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Code Editor
          </span>
          <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
            {language.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFormat}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
            title="Format Code (Shift+Alt+F)"
          >
            Format
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[500px]">
        <Editor
          height="100%"
          language={language}
          value={editorCode}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div className="px-4 py-2 border-t bg-gray-50 text-xs text-gray-500">
        <p>💡 Tip: Nhấn Shift+Alt+F để format code</p>
      </div>
    </div>
  )
}

export default CodeEditor

