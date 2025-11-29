import { useState, useEffect, useCallback } from 'react'
import { parseHTMLToBlocks, blocksToHTML, updateBlockHTML, reorderBlocks, removeBlock } from '../utils/parseHTMLToBlocks'

/**
 * Custom hook for managing blocks editor
 */
export const useBlockEditor = (initialHTML) => {
  const [blocks, setBlocks] = useState([])
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [html, setHtml] = useState(initialHTML || '')

  // Parse HTML to blocks when HTML changes
  useEffect(() => {
    if (initialHTML && initialHTML !== html) {
      const parsedBlocks = parseHTMLToBlocks(initialHTML)
      setBlocks(parsedBlocks)
      setHtml(initialHTML)
    }
  }, [initialHTML])

  // Update HTML when blocks change
  useEffect(() => {
    if (blocks.length > 0) {
      const newHTML = blocksToHTML(blocks)
      setHtml(newHTML)
    }
  }, [blocks])

  // Update a block's HTML
  const updateBlock = useCallback((blockId, newHTML) => {
    setBlocks(prevBlocks => updateBlockHTML(prevBlocks, blockId, newHTML))
  }, [])

  // Reorder blocks
  const handleReorder = useCallback((activeId, overId) => {
    setBlocks(prevBlocks => reorderBlocks(prevBlocks, activeId, overId))
  }, [])

  // Remove a block
  const handleRemoveBlock = useCallback((blockId) => {
    setBlocks(prevBlocks => removeBlock(prevBlocks, blockId))
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null)
    }
  }, [selectedBlockId])

  // Select a block
  const selectBlock = useCallback((blockId) => {
    setSelectedBlockId(blockId)
  }, [])

  // Get selected block
  const selectedBlock = blocks.find(block => block.id === selectedBlockId)

  return {
    blocks,
    html,
    selectedBlockId,
    selectedBlock,
    updateBlock,
    handleReorder,
    handleRemoveBlock,
    selectBlock,
    setBlocks,
  }
}

