import axios from 'axios'
import { detectIndustry, getIndustrySuggestions } from '../utils/detectIndustry'
import { detectStyle } from '../utils/detectStyle'
import { suggestColors } from '../utils/suggestColors'

/**
 * Generate landing page HTML using Gemini API directly from browser
 * @param {string} prompt - User's prompt describing the landing page
 * @returns {Promise<{code: string, metadata: object}>}
 */
export const generateLandingPage = async (prompt) => {
    // API Key - hardcode (chỉ cho dev)
    const apiKey = 'AIzaSyCN0zJx7whRiSgAdKXFFYxyLdgRlQWpREM'

    if (!apiKey || apiKey.trim() === '') {
        throw new Error('Gemini API key không được tìm thấy.')
    }

    // Detect industry and style
    const industryDetection = detectIndustry(prompt)
    const styleDetection = detectStyle(prompt)
    const colorSuggestion = suggestColors(industryDetection.industry, styleDetection.style)
    const industrySuggestions = getIndustrySuggestions(industryDetection.industry)

    // Build enhanced system prompt with industry context
    const systemPrompt = `You are an expert web designer and developer. Your task is to generate a complete, production-ready landing page based on the user's description.

    CONTEXT:
    - Industry: ${industryDetection.metadata.name}
    - Style: ${styleDetection.style}
    - Color Scheme: ${colorSuggestion.name}
    - Recommended Sections: ${industrySuggestions.sections.join(', ')}

    Requirements:
    - Use HTML5 semantic elements
    - Use TailwindCSS via CDN (https://cdn.tailwindcss.com) for all styling
    - MOBILE-FIRST DESIGN: Prioritize mobile experience (375px width), then scale up to tablet and desktop
    - Create a ${styleDetection.style}, mobile-optimized responsive design
    - Use mobile-friendly touch targets (minimum 44x44px for buttons)
    - Use larger fonts for mobile readability (minimum 16px base font size)
    
    MANDATORY SECTIONS (MUST INCLUDE):
    - HEADER/NAVIGATION: Always include a header with navigation menu at the top of the page. Include logo, menu items (Home, About, Services, Contact, etc.), and mobile hamburger menu. Use <header> or <nav> semantic HTML.
    - Include the following additional sections: ${industrySuggestions.sections.join(', ')}
    
    - Use color scheme: ${colorSuggestion.colors.join(', ')}
    - Use clean, professional code optimized for mobile performance
    - Ensure excellent mobile UX/UI practices (swipe-friendly, thumb-friendly navigation)
    - Make it visually appealing with proper spacing, typography, and colors optimized for small screens
    - Tailor the content and design specifically for ${industryDetection.metadata.name} industry
    - Include placeholder text and content that matches the ${industryDetection.metadata.name} theme
    - Use placeholder images: Use placehold.co service (https://placehold.co/600x400/png) or SVG icons, DO NOT use private image URLs or external image links that require authentication
    - For images, use: https://placehold.co/WIDTHxHEIGHT/FORMAT (FORMAT: png, jpg, webp) or https://placehold.co/WIDTHxHEIGHT/COLOR/TEXT/FORMAT
    - Examples: 
      * <img src="https://placehold.co/400x300/png" alt="Placeholder">
      * <img src="https://placehold.co/600x400/jpg" alt="Image">
      * <img src="https://placehold.co/800x600/4F46E5/FFFFFF/png" alt="Hero Image">
    - Always use placehold.co for all placeholder images in the landing page
    - Stack elements vertically on mobile, use single-column layouts
    - Ensure all interactive elements are easily tappable on mobile devices

    STRUCTURE REQUIREMENTS:
    - The page MUST start with a header/navigation section at the very top
    - Header should include: logo, navigation links, and mobile menu toggle
    - After header, include the recommended sections: ${industrySuggestions.sections.join(', ')}
    - End with a footer section
    
    Generate ONLY the HTML code, starting with <!DOCTYPE html> and ending with </html>.
    The structure should be: <header> → <main> (with sections) → <footer>
    Do not include any explanations, markdown, or code blocks. Just the raw HTML.

    User's request: ${prompt}`

    try {
        console.log('📡 Calling Gemini API directly from browser...')

        // First, try to list available models
        let availableModels = []
        try {
            console.log('🔍 Fetching available models...')
            const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
            const listResponse = await axios.get(listUrl, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
            })
            
            availableModels = listResponse.data?.models
                ?.filter(m => m.supportedGenerationMethods?.includes('generateContent'))
                ?.map(m => m.name.replace('models/', '')) || []
            
            console.log('✅ Available models:', availableModels)
        } catch (err) {
            console.log('⚠️ Could not list models, using fallback list:', err.message)
        }

        // Use available models if found, otherwise use fallback
        const fallbackModels = [
            'gemini-pro',
            'gemini-1.0-pro',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
        ]
        
        const modelsToTry = availableModels.length > 0 
            ? availableModels.slice(0, 5) // Use first 5 available models
            : fallbackModels

        const apiVersions = ['v1beta', 'v1'] // Try v1beta first (more stable)

        let generatedText = null
        let lastError = null

        for (const version of apiVersions) {
            for (const modelName of modelsToTry) {
                try {
                    console.log(`🔄 Trying: ${modelName} (${version})`)

                    const apiUrl = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${apiKey}`

                    const response = await axios.post(
                        apiUrl,
                        {
                            contents: [
                                {
                                    parts: [
                                        { text: systemPrompt }
                                    ]
                                }
                            ],
                            generationConfig: {
                                temperature: 0.7,
                                topK: 40,
                                topP: 0.95,
                                maxOutputTokens: 8192,
                            }
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            timeout: 60000,
                        }
                    )

                    generatedText = response.data.candidates[0]?.content?.parts[0]?.text

                    if (generatedText) {
                        console.log(`✅ Success with: ${modelName} (${version})`)
                        break
                    }
                } catch (err) {
                    const errorMsg = err.response?.data?.error?.message || err.message || err.toString()
                    console.log(`❌ ${modelName} (${version}) failed:`, errorMsg)
                    lastError = err
                    continue
                }
            }
            if (generatedText) break
        }

        if (!generatedText) {
            const errorMsg = lastError?.response?.data?.error?.message || lastError?.message || 'Unknown error'
            throw new Error(`Không thể tạo landing page. Lỗi: ${errorMsg}`)
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

        // Extract metadata
        const metadata = {
            industry: industryDetection.industry,
            industryName: industryDetection.metadata.name,
            confidence: industryDetection.confidence,
            style: styleDetection.style,
            colorScheme: colorSuggestion.name,
            colors: colorSuggestion.colors,
            sections: industrySuggestions.sections,
            matchedKeywords: industryDetection.matchedKeywords || []
        }

        return {
            code: htmlCode,
            metadata
        }
    } catch (error) {
        if (error.response) {
            throw new Error(`API Error: ${error.response.data?.error?.message || error.message}`)
        } else if (error.request) {
            throw new Error('Không thể kết nối đến Gemini API. Vui lòng kiểm tra kết nối internet.')
        } else {
            throw new Error(`Error: ${error.message}`)
        }
    }
}


