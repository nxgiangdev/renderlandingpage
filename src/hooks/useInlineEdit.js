import { useState, useCallback } from 'react'

/**
 * Custom hook for inline text editing
 */
export const useInlineEdit = () => {
  const [editingElement, setEditingElement] = useState(null)
  const [editingBlockId, setEditingBlockId] = useState(null)

  const startEditing = useCallback((element, blockId) => {
    setEditingElement(element)
    setEditingBlockId(blockId)
  }, [])

  const stopEditing = useCallback(() => {
    setEditingElement(null)
    setEditingBlockId(null)
  }, [])

  return {
    editingElement,
    editingBlockId,
    isEditing: !!editingElement,
    startEditing,
    stopEditing,
  }
}

