import { useState } from 'react'
import { SketchPicker } from 'react-color'

const ColorPicker = ({ label, color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <div
            className="w-8 h-8 rounded border border-gray-300"
            style={{ backgroundColor: color }}
          />
          <span className="flex-1 text-left text-sm text-gray-700">{color}</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showPicker && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowPicker(false)}
            />
            <div className="absolute z-20 mt-2">
              <SketchPicker
                color={color}
                onChange={(color) => onChange(color.hex)}
                disableAlpha={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ColorPicker

