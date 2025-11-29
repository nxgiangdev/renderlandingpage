import { useState, useRef, useEffect } from 'react'

const ImageEditor = ({ element, onSave, onCancel }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [blobUrl, setBlobUrl] = useState(null)
  const fileInputRef = useRef(null)

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [blobUrl])

  // Get current image src
  const currentSrc = element?.src || element?.getAttribute('src') || ''

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate image file
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh')
        return
      }

      // Create data URL for persistence (stored in HTML)
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result
        // Use data URL for saving (persists in HTML)
        setImageUrl(dataUrl)
        setPreviewUrl(dataUrl)
      }
      reader.readAsDataURL(file)
      
      // Also create blob URL for preview (better performance)
      const blob = URL.createObjectURL(file)
      setBlobUrl(blob)
      setPreviewUrl(blob) // Use blob for preview, but save data URL
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setImageUrl(url)
    if (url && (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/'))) {
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (imageUrl && imageUrl.trim() !== '') {
      // Always use data URL for saving (persists in HTML)
      // If user entered URL, use it; if uploaded file, use data URL
      const urlToSave = imageUrl.trim()
      onSave(urlToSave)
      
      // Cleanup blob URL if exists
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    } else {
      onCancel()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
  }

  if (!element) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" 
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thay đổi ảnh
          </label>
          
          {/* Current image preview */}
          {currentSrc && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Ảnh hiện tại:</p>
              <img 
                src={currentSrc} 
                alt="Current" 
                className="max-h-32 w-auto mx-auto rounded border"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}

          {/* File upload */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Chọn file từ máy tính:
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Or URL input */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Hoặc nhập URL ảnh:
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={handleUrlChange}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Preview new image */}
          {previewUrl && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Xem trước:</p>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-32 w-auto mx-auto rounded border"
                onError={(e) => {
                  e.target.style.display = 'none'
                  setPreviewUrl('')
                }}
              />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Hủy (Esc)
            </button>
            <button
              type="submit"
              disabled={!imageUrl || imageUrl.trim() === ''}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ImageEditor

