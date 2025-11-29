import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const BlockItem = ({ block, isSelected, onSelect, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
        isSelected 
          ? 'border-primary-500 bg-primary-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onSelect(block.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {/* Drag handle */}
            <button
              {...attributes}
              {...listeners}
              className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </button>
            
            <h3 className="font-semibold text-gray-900">{block.name}</h3>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {block.type}
            </span>
          </div>

          {/* Preview snippet */}
          <div 
            className="text-sm text-gray-600 line-clamp-2"
            dangerouslySetInnerHTML={{ 
              __html: block.html.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
            }}
          />
        </div>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(block.id)
          }}
          className="ml-2 text-red-400 hover:text-red-600 transition-colors"
          title="Xóa khối"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default BlockItem

