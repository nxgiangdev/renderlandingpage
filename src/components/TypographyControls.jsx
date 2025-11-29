const TypographyControls = ({ styles, onChange }) => {
  const fontFamilies = [
    { value: 'sans', label: 'Sans Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'mono', label: 'Monospace' },
  ]

  const fontSizes = [
    { value: 'text-xs', label: 'XS (0.75rem)' },
    { value: 'text-sm', label: 'SM (0.875rem)' },
    { value: 'text-base', label: 'Base (1rem)' },
    { value: 'text-lg', label: 'LG (1.125rem)' },
    { value: 'text-xl', label: 'XL (1.25rem)' },
    { value: 'text-2xl', label: '2XL (1.5rem)' },
    { value: 'text-3xl', label: '3XL (1.875rem)' },
    { value: 'text-4xl', label: '4XL (2.25rem)' },
  ]

  const fontWeights = [
    { value: 'font-light', label: 'Light (300)' },
    { value: 'font-normal', label: 'Normal (400)' },
    { value: 'font-medium', label: 'Medium (500)' },
    { value: 'font-semibold', label: 'Semibold (600)' },
    { value: 'font-bold', label: 'Bold (700)' },
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          value={styles.fontFamily || 'sans'}
          onChange={(e) => onChange({ ...styles, fontFamily: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {fontFamilies.map(font => (
            <option key={font.value} value={font.value}>{font.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <select
          value={styles.fontSize || 'text-base'}
          onChange={(e) => onChange({ ...styles, fontSize: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {fontSizes.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Weight
        </label>
        <select
          value={styles.fontWeight || 'font-normal'}
          onChange={(e) => onChange({ ...styles, fontWeight: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {fontWeights.map(weight => (
            <option key={weight.value} value={weight.value}>{weight.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Height
        </label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={styles.lineHeight || 1.5}
          onChange={(e) => onChange({ ...styles, lineHeight: parseFloat(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1.0</span>
          <span>{styles.lineHeight || 1.5}</span>
          <span>2.0</span>
        </div>
      </div>
    </div>
  )
}

export default TypographyControls

