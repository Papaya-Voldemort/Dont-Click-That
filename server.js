import { createServer as createViteServer } from 'vite'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'production'

const app = express()

if (NODE_ENV === 'production') {
  // Serve built assets in production
  app.use(express.static(join(__dirname, 'dist')))
  
  // Fallback to index.html for SPA routing
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
} else {
  // Dev server with HMR in development
  const vite = await createViteServer()
  app.use(vite.middlewares)
  
  app.get('*', (req, res) => {
    res.end()
  })
}

app.listen(PORT, () => {
  console.log(`🚀 ${NODE_ENV === 'production' ? 'Production' : 'Development'} server running on http://localhost:${PORT}`)
  console.log(`📦 NODE_ENV=${NODE_ENV}`)
  console.log(`🔌 PORT=${PORT}`)
})
