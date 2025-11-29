/**
 * Generate project files for different export formats
 */

/**
 * Generate HTML standalone project files
 */
export const generateHTMLFiles = (htmlCode) => {
  // Extract CSS and JS from HTML if present
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlCode, 'text/html')
  
  // Extract CSS
  const styleTags = doc.querySelectorAll('style')
  const css = Array.from(styleTags).map(tag => tag.textContent).join('\n\n')
  
  // Extract JS
  const scriptTags = doc.querySelectorAll('script:not([src])')
  const js = Array.from(scriptTags).map(tag => tag.textContent).join('\n\n')
  
  // Clean HTML (remove inline styles and scripts)
  const cleanHTML = htmlCode
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link[^>]*>/gi, '')

  // Create clean HTML structure
  const indexHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${doc.body ? doc.body.innerHTML : cleanHTML}
<script src="script.js"></script>
</body>
</html>`

  return {
    'index.html': indexHTML,
    'styles.css': css || '/* Custom styles */',
    'script.js': js || '// Custom JavaScript',
    'README.md': `# Landing Page

## Setup

1. Extract all files to a folder
2. Open \`index.html\` in your browser
3. That's it! No build process needed.

## Files

- \`index.html\` - Main HTML file
- \`styles.css\` - Custom CSS styles
- \`script.js\` - Custom JavaScript

## Customization

Edit the files directly to customize your landing page.
`
  }
}

/**
 * Generate React project files
 */
export const generateReactFiles = (htmlCode) => {
  // Convert HTML to React component
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlCode, 'text/html')
  const bodyHTML = doc.body ? doc.body.innerHTML : ''

  // Simple HTML to JSX conversion (basic)
  let jsxCode = bodyHTML
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments

  const componentCode = `import React from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
${jsxCode.split('\n').map(line => '      ' + line).join('\n')}
    </div>
  )
}

export default App`

  const packageJson = {
    name: 'landing-page',
    version: '1.0.0',
    private: true,
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-scripts': '5.0.1'
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
      eject: 'react-scripts eject'
    },
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
    }
  }

  const appCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
`

  const indexHTML = `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Landing Page</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`

  const indexJS = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`

  const indexCSS = `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`

  const gitignore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`

  const readme = `# Landing Page - React Project

## Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start development server:
\`\`\`bash
npm start
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the \`build\` folder.

## Project Structure

\`\`\`
src/
  ├── App.jsx       # Main component
  ├── App.css       # Component styles
  ├── index.js      # Entry point
  └── index.css     # Global styles
\`\`\`

## Customization

Edit \`src/App.jsx\` to customize your landing page.
`

  return {
    'package.json': JSON.stringify(packageJson, null, 2),
    'README.md': readme,
    '.gitignore': gitignore,
    'tailwind.config.js': tailwindConfig,
    'postcss.config.js': postcssConfig,
    'public/index.html': indexHTML,
    'src/App.jsx': componentCode,
    'src/App.css': appCSS,
    'src/index.js': indexJS,
    'src/index.css': indexCSS
  }
}

/**
 * Generate Next.js project files
 */
export const generateNextJSFiles = (htmlCode) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlCode, 'text/html')
  const bodyHTML = doc.body ? doc.body.innerHTML : ''

  let jsxCode = bodyHTML
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--[\s\S]*?-->/g, '')

  const pageCode = `export default function Home() {
  return (
    <div className="min-h-screen">
${jsxCode.split('\n').map(line => '      ' + line).join('\n')}
    </div>
  )
}`

  const packageJson = {
    name: 'landing-page',
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      next: '14.0.0'
    },
    devDependencies: {
      tailwindcss: '^3.3.6',
      postcss: '^8.4.32',
      autoprefixer: '^10.4.16'
    }
  }

  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig`

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`

  const globalCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
`

  const layoutCode = `import './globals.css'

export const metadata = {
  title: 'Landing Page',
  description: 'Generated landing page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}`

  const readme = `# Landing Page - Next.js Project

## Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
app/
  ├── page.jsx      # Home page
  ├── layout.jsx    # Root layout
  └── globals.css   # Global styles
\`\`\`

## Customization

Edit \`app/page.jsx\` to customize your landing page.
`

  return {
    'package.json': JSON.stringify(packageJson, null, 2),
    'README.md': readme,
    'next.config.js': nextConfig,
    'tailwind.config.js': tailwindConfig,
    'postcss.config.js': postcssConfig,
    'app/page.jsx': pageCode,
    'app/layout.jsx': layoutCode,
    'app/globals.css': globalCSS,
    '.gitignore': 'node_modules\n.next\nout\n'
  }
}

