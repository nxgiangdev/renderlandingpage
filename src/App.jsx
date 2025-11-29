import { useState } from 'react'
import PromptInput from './components/PromptInput'
import Preview from './components/Preview'
import EditablePreview from './components/EditablePreview'
import ActionButtons from './components/ActionButtons'
import RefinePromptModal from './components/RefinePromptModal'
import BlockSidebar from './components/BlockSidebar'
import PropertyPanel from './components/PropertyPanel'
import CodeEditorPanel from './components/CodeEditorPanel'
import IndustryBadge from './components/IndustryBadge'
import StyleSelector from './components/StyleSelector'
import ColorPalettePicker from './components/ColorPalettePicker'
import ExportModal from './components/ExportModal'
import CopyCodeButton from './components/CopyCodeButton'
import EnvDebug from './components/EnvDebug'
import DevicePreview from './components/DevicePreview'
import { useBlockEditor } from './hooks/useBlockEditor'
import { generateLandingPage } from './services/geminiService'
import './App.css'

function App() {
  const [generatedCode, setGeneratedCode] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false)
  const [showBlocks, setShowBlocks] = useState(false)
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [selectedColorPalette, setSelectedColorPalette] = useState(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [device, setDevice] = useState('mobile') // Default to mobile

  // Block editor hook
  const {
    blocks,
    html: blocksHTML,
    selectedBlockId,
    selectedBlock,
    updateBlock,
    handleReorder,
    handleRemoveBlock,
    selectBlock,
  } = useBlockEditor(generatedCode)

  const handleGenerate = async (prompt) => {
    setIsGenerating(true)
    setError(null)
    setGeneratedCode(null)
    setCurrentPrompt(prompt)
    
    try {
      const result = await generateLandingPage(prompt)
      setGeneratedCode(result.code)
      setMetadata(result.metadata)
      setSelectedIndustry(result.metadata.industry)
      setSelectedStyle(result.metadata.style)
      setSelectedColorPalette(result.metadata.colorScheme)
      setShowBlocks(true) // Show blocks sidebar after generation
    } catch (err) {
      // Format error message for better display
      const errorMsg = err.message || 'Có lỗi xảy ra khi tạo landing page'
      setError(errorMsg)
      console.error('Error generating landing page:', err)
      
      // Log environment info for debugging
      if (errorMsg.includes('API key')) {
        console.log('Environment check:', {
          hasApiKey: !!import.meta.env.VITE_GEMINI_API_KEY,
          envKeys: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')),
          mode: import.meta.env.MODE
        })
      }
    } finally {
      setIsGenerating(false)
    }
  }

  // Use blocks HTML if available, otherwise use generated code
  const previewCode = blocks.length > 0 ? blocksHTML : generatedCode

  // Handle code editor changes
  const handleCodeEditorChange = (newCode) => {
    setGeneratedCode(newCode)
    // Re-parse blocks if needed
    if (showBlocks) {
      // Blocks will be re-parsed by useBlockEditor hook
    }
  }

  const handleRegenerate = () => {
    if (currentPrompt) {
      handleGenerate(currentPrompt)
    }
  }

  const handleRefine = (refinedPrompt) => {
    handleGenerate(refinedPrompt)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🚀 AI Landing Page Generator
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Tạo landing page tự động bằng AI - Chỉ cần mô tả ý tưởng của bạn
          </p>
        </div>
      </header>

      <main className=" mx-auto px-4 py-8">
        {/* Prompt Input Section - Only show when no code generated */}
        {!generatedCode && (
          <div className="max-w-3xl mx-auto">
            <PromptInput 
              onSubmit={handleGenerate}
              isLoading={isGenerating}
              placeholder="Ví dụ: Tạo landing page giới thiệu ứng dụng đặt lịch chăm sóc sắc đẹp với tông màu xanh pastel..."
            />
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
                <p className="font-medium mb-2">⚠️ Lỗi:</p>
                <div className="text-sm whitespace-pre-line">{error}</div>
                {error.includes('API key') && (
                  <div className="mt-3 p-3 bg-red-100 rounded border border-red-300">
                    <p className="font-medium text-xs mb-2">Hướng dẫn khắc phục:</p>
                    <ol className="text-xs list-decimal list-inside space-y-1">
                      <li>Đảm bảo file <code className="bg-red-200 px-1 rounded">.env</code> tồn tại trong thư mục root</li>
                      <li>File <code className="bg-red-200 px-1 rounded">.env</code> phải chứa: <code className="bg-red-200 px-1 rounded">VITE_GEMINI_API_KEY=your_api_key</code></li>
                      <li>Restart dev server: Dừng (Ctrl+C) và chạy lại <code className="bg-red-200 px-1 rounded">npm run dev</code></li>
                    </ol>
                  </div>
                )}
                {!error.includes('API key') && (
                  <button
                    onClick={handleRegenerate}
                    className="mt-2 text-sm underline hover:no-underline"
                  >
                    Thử lại
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Main Editor Layout */}
        {generatedCode && (
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-4' : ''}`}>
            {/* Left: Blocks Sidebar */}
            {showBlocks && !isFullscreen && (
              <div className="lg:col-span-2">
                <BlockSidebar
                  blocks={blocks}
                  selectedBlockId={selectedBlockId}
                  onSelectBlock={selectBlock}
                  onReorder={handleReorder}
                  onDeleteBlock={handleRemoveBlock}
                />
              </div>
            )}

            {/* Center: Preview */}
            <div className={`space-y-4 ${isFullscreen ? 'lg:col-span-12' : showBlocks ? 'lg:col-span-7' : 'lg:col-span-9'}`}>
              {/* Action Bar */}
              <div className={`bg-white rounded-lg shadow-sm border p-4 ${isFullscreen ? 'mb-4' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Preview
                    </h2>
                    {metadata && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <IndustryBadge
                          industry={selectedIndustry || metadata.industry}
                          confidence={metadata.confidence || 0}
                          onOverride={(newIndustry) => {
                            setSelectedIndustry(newIndustry)
                            // TODO: Regenerate with new industry
                          }}
                        />
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {selectedStyle || metadata.style}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <DevicePreview 
                        currentDevice={device}
                        onDeviceChange={setDevice}
                      />
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                      >
                        {isFullscreen ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Exit
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            Fullscreen
                          </>
                        )}
                      </button>
                      {!isFullscreen && (
                        <button
                          onClick={() => setShowBlocks(!showBlocks)}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                          {showBlocks ? 'Hide' : 'Show'} Blocks
                        </button>
                      )}
                      <button
                        onClick={() => setIsCodeEditorOpen(true)}
                        className="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Edit Code
                      </button>
                      <CopyCodeButton code={previewCode} />
                      <button
                        onClick={() => setIsExportModalOpen(true)}
                        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export
                      </button>
                      <ActionButtons
                        onRegenerate={handleRegenerate}
                        onRefine={() => setIsRefineModalOpen(true)}
                        isGenerating={isGenerating}
                        hasCode={!!generatedCode}
                      />
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p className="font-medium">Lỗi:</p>
                    <p>{error}</p>
                  </div>
                )}

                {/* Style & Color Controls */}
                {metadata && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Style
                        </label>
                        <StyleSelector
                          currentStyle={selectedStyle || metadata.style}
                          onStyleChange={(newStyle) => {
                            setSelectedStyle(newStyle)
                            // TODO: Regenerate with new style
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color Palette
                        </label>
                        <ColorPalettePicker
                          currentPalette={selectedColorPalette || metadata.colorScheme}
                          onPaletteChange={(newPalette) => {
                            setSelectedColorPalette(newPalette)
                            // TODO: Regenerate with new palette
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {showBlocks ? (
                  <EditablePreview 
                    code={previewCode} 
                    selectedBlockId={selectedBlockId}
                    onUpdateBlock={updateBlock}
                    blocks={blocks}
                    onSelectBlock={selectBlock}
                    device={device}
                  />
                ) : (
                  <Preview code={previewCode} device={device} />
                )}
              </div>
            </div>

            {/* Right: Property Panel */}
            {showBlocks && selectedBlock && !isFullscreen && (
              <div className="lg:col-span-3">
                <PropertyPanel
                  selectedBlock={selectedBlock}
                  onUpdateBlock={updateBlock}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <RefinePromptModal
        isOpen={isRefineModalOpen}
        onClose={() => setIsRefineModalOpen(false)}
        currentPrompt={currentPrompt}
        onRefine={handleRefine}
      />

      <CodeEditorPanel
        code={previewCode}
        onCodeChange={handleCodeEditorChange}
        isOpen={isCodeEditorOpen}
        onClose={() => setIsCodeEditorOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        code={previewCode}
      />

      <EnvDebug />
    </div>
  )
}

export default App

