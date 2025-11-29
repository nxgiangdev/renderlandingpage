import { useEffect, useState } from 'react'

const EnvDebug = () => {
  const [envInfo, setEnvInfo] = useState(null)

  useEffect(() => {
    // Try to read from import.meta.env
    const env = import.meta.env || {}
    const info = {
      hasApiKey: !!env.VITE_GEMINI_API_KEY,
      apiKey: env.VITE_GEMINI_API_KEY ? `${env.VITE_GEMINI_API_KEY.substring(0, 10)}...` : 'Not found',
      apiKeyFull: env.VITE_GEMINI_API_KEY || 'undefined',
      mode: env.MODE,
      dev: env.DEV,
      allViteKeys: Object.keys(env).filter(k => k.startsWith('VITE_')),
      allKeys: Object.keys(env),
      // Check if .env file exists (client-side can't read file system, but we can check)
      envObject: env
    }
    setEnvInfo(info)
    console.log('Full import.meta.env:', env)
  }, [])

  if (!import.meta.env.DEV) return null // Only show in development

  return (
    <div className="fixed bottom-4 left-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs max-w-md z-50">
      
    </div>
  )
}

export default EnvDebug

