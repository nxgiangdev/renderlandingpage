import { useState, useEffect, useRef } from 'react'

const InlineEditor = ({ element, onSave, onCancel }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    // Extract text content from element
    if (element) {
      const text = element.textContent || ''
      setValue(text)
    }
    // Focus input when mounted
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [element])

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (value.trim() !== (element?.textContent || '').trim()) {
      onSave(value.trim())
    } else {
      onCancel()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
  }

  if (!element) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={onCancel}>
      <div 
        className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edit Text
          </label>
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={4}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex gap-2 mt-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel (Esc)
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Save (Enter)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InlineEditor

