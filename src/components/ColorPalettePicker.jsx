import { useState } from 'react'
import { getAllColorPalettes, getColorPalette } from '../utils/colorPalettes'

const ColorPalettePicker = ({ currentPalette, onPaletteChange }) => {
  const [showPicker, setShowPicker] = useState(false)
  const allPalettes = getAllColorPalettes()

  const currentPaletteData = getColorPalette(currentPalette)

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 w-full"
      >
        <div className="flex gap-1">
          {currentPaletteData.colors.slice(0, 4).map((color, idx) => (
            <div
              key={idx}
              className="w-4 h-4 rounded border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="flex-1 text-left">{currentPaletteData.name}</span>
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
          <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg border p-4 min-w-[300px] max-h-[500px] overflow-y-auto">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Chọn bảng màu
            </div>
            <div className="grid grid-cols-1 gap-2">
              {allPalettes.map(palette => (
                <button
                  key={palette.key}
                  onClick={() => {
                    if (onPaletteChange) {
                      onPaletteChange(palette.key)
                    }
                    setShowPicker(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded border transition-colors ${
                    currentPalette === palette.key
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {palette.colors.slice(0, 5).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{palette.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{palette.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ColorPalettePicker

