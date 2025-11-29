import { useState } from 'react'

const DevicePreview = ({ onDeviceChange, currentDevice = 'mobile' }) => {
  const devices = [
    { id: 'mobile', name: 'Mobile', icon: '📱', width: '375px' },
    { id: 'tablet', name: 'Tablet', icon: '📱', width: '768px' },
    { id: 'desktop', name: 'Desktop', icon: '💻', width: '100%' },
  ]

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      {devices.map((device) => (
        <button
          key={device.id}
          onClick={() => onDeviceChange(device.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentDevice === device.id
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title={`Xem ở ${device.name} (${device.width})`}
        >
          <span>{device.icon}</span>
          <span className="hidden sm:inline">{device.name}</span>
        </button>
      ))}
    </div>
  )
}

export default DevicePreview

