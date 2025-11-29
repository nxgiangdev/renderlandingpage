const ActionButtons = ({ onRegenerate, onRefine, isGenerating, hasCode }) => {
  if (!hasCode) return null

  return (
    <div className="flex gap-3">
      <button
        onClick={onRegenerate}
        disabled={isGenerating}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Regenerate
      </button>
      
      <button
        onClick={onRefine}
        disabled={isGenerating}
        className="px-4 py-2 bg-primary-100 hover:bg-primary-200 disabled:bg-primary-50 disabled:text-primary-300 text-primary-700 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Refine Prompt
      </button>
    </div>
  )
}

export default ActionButtons

