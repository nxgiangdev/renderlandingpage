import { useState, useEffect } from 'react'

const RefinePromptModal = ({ isOpen, onClose, currentPrompt, onRefine }) => {
  const [refinedPrompt, setRefinedPrompt] = useState(currentPrompt)

  useEffect(() => {
    if (isOpen) {
      setRefinedPrompt(currentPrompt)
    }
  }, [isOpen, currentPrompt])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (refinedPrompt.trim()) {
      onRefine(refinedPrompt.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Refine Prompt
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Chỉnh sửa prompt để tạo landing page tốt hơn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6">
          <div className="flex-1 mb-4">
            <textarea
              value={refinedPrompt}
              onChange={(e) => setRefinedPrompt(e.target.value)}
              placeholder="Nhập prompt đã chỉnh sửa..."
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              autoFocus
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!refinedPrompt.trim()}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
            >
              Generate with New Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RefinePromptModal

