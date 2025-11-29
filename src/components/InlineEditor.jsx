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
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        rows={4}
      />
      <div className="flex gap-2 mt-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Hủy (Esc)
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          Lưu (Enter)
        </button>
      </div>
    </form>
  )
}

export default InlineEditor

