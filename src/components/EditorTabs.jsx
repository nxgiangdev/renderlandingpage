import { useState } from 'react'

const EditorTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b bg-gray-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default EditorTabs

