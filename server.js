import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Key - lấy từ env hoặc hardcode (chỉ cho dev)
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCN0zJx7whRiSgAdKXFFYxyLdgRlQWpREM'

console.log('🚀 Server started on port', PORT)
console.log('🔑 API Key loaded:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT FOUND')

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' })
})

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API route is working' })
})

// Generate landing page API
app.post('/api/gen-landing', async (req, res) => {
    console.log('📥 Received request at /api/gen-landing')
    console.log('📦 Request body:', { 
        hasPrompt: !!req.body.prompt, 
        hasSystemPrompt: !!req.body.systemPrompt 
    })
    try {
        const { prompt, systemPrompt } = req.body

        if (!prompt && !systemPrompt) {
            return res.status(400).json({ 
                error: 'Missing prompt or systemPrompt' 
            })
        }

        if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
            return res.status(500).json({ 
                error: 'API key is missing or invalid' 
            })
        }

        // Try different models
        const modelsToTry = [
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
        ]

        let generatedText = null
        let lastError = null

        for (const modelName of modelsToTry) {
            try {
                console.log(`🔄 Trying model: ${modelName}`)

                // Create model with API key
                const model = google(modelName, {
                    apiKey: API_KEY
                })

                // Generate text
                const { text } = await generateText({
                    model: model,
                    prompt: systemPrompt || prompt,
                    maxTokens: 8192,
                    temperature: 0.7,
                })

                generatedText = text

                if (generatedText) {
                    console.log(`✅ Success with model: ${modelName}`)
                    break
                }
            } catch (err) {
                const errorMsg = err.message || err.toString()
                console.log(`❌ Model ${modelName} failed:`, errorMsg)
                lastError = err
                continue
            }
        }

        if (!generatedText) {
            const errorMsg = lastError?.message || 'Unknown error'
            return res.status(500).json({ 
                error: `Tất cả các model đều thất bại. Lỗi cuối: ${errorMsg}` 
            })
        }

        // Clean up the response
        let htmlCode = generatedText.trim()

        // Remove markdown code blocks
        if (htmlCode.startsWith('```html')) {
            htmlCode = htmlCode.replace(/^```html\n?/, '').replace(/\n?```$/, '')
        } else if (htmlCode.startsWith('```')) {
            htmlCode = htmlCode.replace(/^```\n?/, '').replace(/\n?```$/, '')
        }

        // Ensure TailwindCSS CDN is included
        if (!htmlCode.includes('cdn.tailwindcss.com')) {
            htmlCode = htmlCode.replace(
                '</head>',
                '<script src="https://cdn.tailwindcss.com"></script>\n</head>'
            )
        }

        res.json({ 
            code: htmlCode,
            success: true
        })

    } catch (error) {
        console.error('❌ Server error:', error)
        res.status(500).json({ 
            error: error.message || 'Internal server error' 
        })
    }
})

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
    console.log(`📡 Health check: http://localhost:${PORT}/health`)
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/gen-landing`)
    console.log(`📡 Test endpoint: http://localhost:${PORT}/api/test`)
})

