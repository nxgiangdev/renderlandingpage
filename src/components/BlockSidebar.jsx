import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import BlockItem from './BlockItem'

const BlockSidebar = ({ blocks, selectedBlockId, onSelectBlock, onReorder, onDeleteBlock }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      onReorder(active.id, over.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Khối ({blocks.length})
        </h2>
        <button
          className="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          title="Thêm khối mới (sắp có)"
          disabled
        >
          + Thêm
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map(b => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {blocks.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Chưa có blocks</p>
                <p className="text-sm mt-2">Generate landing page để bắt đầu</p>
              </div>
            ) : (
              blocks.map((block) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  onSelect={onSelectBlock}
                  onDelete={onDeleteBlock}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
        <p>💡 Kéo thả để sắp xếp lại thứ tự blocks</p>
      </div>
    </div>
  )
}

export default BlockSidebar

