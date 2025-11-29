import { useState, useEffect } from 'react'
import ColorPicker from './ColorPicker'
import TypographyControls from './TypographyControls'

const PropertyPanel = ({ selectedBlock, onUpdateBlock }) => {
  const [colors, setColors] = useState({
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#e5e7eb',
  })

  const [typography, setTypography] = useState({
    fontFamily: 'sans',
    fontSize: 'text-base',
    fontWeight: 'font-normal',
    lineHeight: 1.5,
  })

  const [spacing, setSpacing] = useState({
    padding: 16,
    margin: 0,
    gap: 8,
  })

  useEffect(() => {
    if (selectedBlock) {
      // Parse existing styles from block HTML (simplified)
      // In a real implementation, you'd parse the actual HTML
    }
  }, [selectedBlock])

  const handleColorChange = (type, color) => {
    const newColors = { ...colors, [type]: color }
    setColors(newColors)
    applyStyles({ colors: newColors })
  }

  const handleTypographyChange = (newTypography) => {
    setTypography(newTypography)
    applyStyles({ typography: newTypography })
  }

  const handleSpacingChange = (type, value) => {
    const newSpacing = { ...spacing, [type]: parseInt(value) }
    setSpacing(newSpacing)
    applyStyles({ spacing: newSpacing })
  }

  const applyStyles = (stylesToApply) => {
    if (!selectedBlock || !onUpdateBlock) return

    // This is a simplified version
    // In production, you'd parse the HTML, find the element, apply styles, and rebuild HTML
    const updatedHTML = selectedBlock.html // Placeholder
    onUpdateBlock(selectedBlock.id, updatedHTML)
  }

  if (!selectedBlock) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Thuộc tính
        </h2>
        <div className="text-center py-8 text-gray-400">
          <p>Chọn một khối để chỉnh sửa</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Thuộc tính
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {selectedBlock.name}
        </p>
      </div>

      <div className="space-y-6">
        {/* Colors Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">
            Màu sắc
          </h3>
          <ColorPicker
            label="Màu nền"
            color={colors.backgroundColor}
            onChange={(color) => handleColorChange('backgroundColor', color)}
          />
          <ColorPicker
            label="Màu chữ"
            color={colors.textColor}
            onChange={(color) => handleColorChange('textColor', color)}
          />
          <ColorPicker
            label="Màu viền"
            color={colors.borderColor}
            onChange={(color) => handleColorChange('borderColor', color)}
          />
        </div>

        {/* Typography Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">
            Kiểu chữ
          </h3>
          <TypographyControls
            styles={typography}
            onChange={handleTypographyChange}
          />
        </div>

        {/* Spacing Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">
            Khoảng cách
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đệm trong: {spacing.padding}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={spacing.padding}
                onChange={(e) => handleSpacingChange('padding', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng ngoài: {spacing.margin}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={spacing.margin}
                onChange={(e) => handleSpacingChange('margin', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng cách: {spacing.gap}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={spacing.gap}
                onChange={(e) => handleSpacingChange('gap', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPanel

