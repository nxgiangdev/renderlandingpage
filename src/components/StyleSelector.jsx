import { useState } from 'react'
import { getAllStyles } from '../utils/styleDictionary'

const StyleSelector = ({ currentStyle, onStyleChange }) => {
  const [showSelector, setShowSelector] = useState(false)
  const allStyles = getAllStyles()

  const currentStyleData = allStyles.find(s => s.key === currentStyle) || allStyles[0]

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 w-full"
      >
        <span className="flex-1 text-left">{currentStyleData.name}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showSelector && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowSelector(false)}
          />
          <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-2 min-w-[250px] max-h-[400px] overflow-y-auto">
            <div className="text-xs font-medium text-gray-700 mb-2 px-2">
              Select Style
            </div>
            {allStyles.map(style => (
              <button
                key={style.key}
                onClick={() => {
                  if (onStyleChange) {
                    onStyleChange(style.key)
                  }
                  setShowSelector(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors mb-1 ${
                  currentStyle === style.key ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                <div className="font-medium">{style.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{style.description}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default StyleSelector

