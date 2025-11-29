import { useState } from 'react'
import { getAllIndustries } from '../utils/industryDictionary'

const IndustryBadge = ({ industry, confidence, onOverride }) => {
  const [showSelector, setShowSelector] = useState(false)
  const allIndustries = getAllIndustries()

  const getIndustryName = () => {
    const industryData = allIndustries.find(i => i.key === industry)
    return industryData?.name || 'General'
  }

  const getConfidenceColor = () => {
    if (confidence > 0.7) return 'bg-green-100 text-green-700'
    if (confidence > 0.4) return 'bg-yellow-100 text-yellow-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 transition-colors ${getConfidenceColor()}`}
        title={`Industry: ${getIndustryName()} (${Math.round(confidence * 100)}% confidence)`}
      >
        <span>{getIndustryName()}</span>
        {confidence > 0 && (
          <span className="text-xs opacity-75">
            {Math.round(confidence * 100)}%
          </span>
        )}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showSelector && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowSelector(false)}
          />
          <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-2 min-w-[200px] max-h-[300px] overflow-y-auto">
            <div className="text-xs font-medium text-gray-700 mb-2 px-2">
              Select Industry
            </div>
            {allIndustries.map(ind => (
              <button
                key={ind.key}
                onClick={() => {
                  if (onOverride) {
                    onOverride(ind.key)
                  }
                  setShowSelector(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${
                  industry === ind.key ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default IndustryBadge

