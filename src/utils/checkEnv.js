/**
 * Check if environment variables are properly configured
 */
export const checkEnvironment = () => {
  console.log('import.meta.env', import.meta.env)
  // Get API key from import.meta.env (Vite way)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY  
  
  // Get all env keys for debugging
  const allEnv = import.meta.env || {}
  const allEnvKeys = Object.keys(allEnv).filter(k => k.startsWith('VITE_'))
  
  return {
    hasApiKey: !!apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey !== '',
    apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found',
    isDev: import.meta.env.DEV,
    mode: import.meta.env.MODE,
    allEnvKeys: allEnvKeys,
    allEnv: allEnv // For debugging
  }
}

/**
 * Get helpful error message for missing API key
 */
export const getEnvErrorMessage = () => {
  const env = checkEnvironment()
  
  if (!env.hasApiKey) {
    return {
      title: 'API Key không được tìm thấy',
      message: `Vui lòng kiểm tra cấu hình:
      
1. Đảm bảo file .env tồn tại trong thư mục root của project
2. File .env phải chứa: VITE_GEMINI_API_KEY=your_api_key_here
3. Restart dev server sau khi tạo/sửa file .env:
   - Dừng server (Ctrl+C)
   - Chạy lại: npm run dev

Debug info:
- Mode: ${env.mode}
- Environment keys: ${env.allEnvKeys.length > 0 ? env.allEnvKeys.join(', ') : 'None found'}
- API Key found: ${env.hasApiKey ? 'Yes' : 'No'}`
    }
  }
  
  return null
}

