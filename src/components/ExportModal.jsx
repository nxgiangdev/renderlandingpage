import { useState } from 'react'
import { exportProject } from '../services/exportService'

const ExportModal = ({ isOpen, onClose, code }) => {
  const [format, setFormat] = useState('html')
  const [filename, setFilename] = useState('landing-page')
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen || !code) return null

  const handleExport = async () => {
    setIsExporting(true)
    setError(null)

    try {
      await exportProject(code, format, { filename })
      // Close modal after successful export
      setTimeout(() => {
        onClose()
        setIsExporting(false)
      }, 1000)
    } catch (err) {
      setError(err.message)
      setIsExporting(false)
    }
  }

  const formats = [
    {
      value: 'html',
      label: 'HTML Standalone',
      description: 'Simple HTML/CSS/JS files, ready to use',
      icon: '📄'
    },
    {
      value: 'react',
      label: 'React Project',
      description: 'Full React project with Create React App setup',
      icon: '⚛️'
    },
    {
      value: 'nextjs',
      label: 'Next.js Project',
      description: 'Next.js project with App Router',
      icon: '▲'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Export Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isExporting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-1 gap-3">
              {formats.map(fmt => (
                <button
                  key={fmt.value}
                  onClick={() => setFormat(fmt.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    format === fmt.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={isExporting}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{fmt.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{fmt.label}</div>
                      <div className="text-sm text-gray-500 mt-1">{fmt.description}</div>
                    </div>
                    {format === fmt.value && (
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filename */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="landing-page"
              disabled={isExporting}
            />
            <p className="text-xs text-gray-500 mt-1">
              The exported ZIP file will be named: {filename}-{format}.zip
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> The exported project includes all necessary files and setup instructions.
              {format === 'react' && ' You\'ll need to run `npm install` after extracting.'}
              {format === 'nextjs' && ' You\'ll need to run `npm install` after extracting.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || !filename.trim()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportModal

