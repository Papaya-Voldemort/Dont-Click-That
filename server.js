// Production-hardened Bun static server for Vite-built Svelte app (dist)
const PORT = Number(process.env.PORT || 3000)
const DIST = `${process.cwd()}/dist`

function resolveDistPath(pathname) {
  const safePath = pathname.replace(/\/+/g, '/')
  return `${DIST}${safePath}`
}

import { statSync } from 'fs'

// In-memory short-lived cache to avoid excessive stat() calls per-request
const FILE_CACHE_TTL = 60_000 // 60s
const fileExistsCache = new Map()

function now() {
  return Date.now()
}

function checkFileCached(path) {
  const entry = fileExistsCache.get(path)
  if (entry && now() - entry.ts < FILE_CACHE_TTL) return entry.exists
  try {
    const s = statSync(path)
    const exists = !!s && s.isFile()
    fileExistsCache.set(path, { exists, ts: now() })
    return exists
  } catch {
    fileExistsCache.set(path, { exists: false, ts: now() })
    return false
  }
}

function contentType(path) {
  const ext = path.split('.').pop().toLowerCase()
  const m = {
    html: 'text/html; charset=utf-8',
    js: 'application/javascript; charset=utf-8',
    css: 'text/css; charset=utf-8',
    json: 'application/json; charset=utf-8',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    map: 'application/json',
    wasm: 'application/wasm',
    txt: 'text/plain; charset=utf-8',
    woff2: 'font/woff2',
    woff: 'font/woff'
  }
  return m[ext] || 'application/octet-stream'
}

// Heuristic for long-term caching (immutable) for hashed assets
const IMMUTABLE_HASH_RE = /[\.\-]([a-f0-9]{8,})/i

const server = Bun.serve({
  port: PORT,
  hostname: '0.0.0.0',
  async fetch(req) {
    try {
      const url = new URL(req.url)
      let pathname = decodeURIComponent(url.pathname || '/')

      // Basic safety: reject suspicious paths
      if (pathname.includes('..')) return new Response('Invalid path', { status: 400 })

      if (pathname === '/') pathname = '/index.html'

      const filePath = resolveDistPath(pathname)

      // Fast path: if file is known to exist (cached), serve it
      if (checkFileCached(filePath)) {
        const headers = {
          'content-type': contentType(filePath),
          'cache-control': (pathname === '/index.html')
            ? 'no-cache, no-store, must-revalidate'
            : (IMMUTABLE_HASH_RE.test(pathname) || pathname.startsWith('/assets/'))
              ? 'public, max-age=31536000, immutable'
              : 'public, max-age=3600'
        }
        return new Response(Bun.file(filePath), { headers })
      }

      // SPA fallback: serve index.html for any non-asset route
      const indexPath = resolveDistPath('/index.html')
      if (checkFileCached(indexPath)) {
        return new Response(Bun.file(indexPath), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache, no-store, must-revalidate' } })
      }

      return new Response('Not found', { status: 404 })
    } catch (err) {
      // Log internal error for operator; do not leak internals to client
      console.error('Server error:', err)
      return new Response('Internal Server Error', { status: 500 })
    }
  }
})

console.log(`Server running on http://localhost:${PORT}`)

// Graceful shutdown hooks (compatible in Bun environments)
try {
  if (typeof process !== 'undefined' && process && typeof process.on === 'function') {
    const shutdown = (sig) => {
      console.log(`Received ${sig}; shutting down.`)
      try { server.stop && server.stop() } catch (e) { /* ignore */ }
      // allow process to exit
    }
    process.on('SIGINT', () => shutdown('SIGINT'))
    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('uncaughtException', (err) => {
      console.error('Uncaught exception:', err)
    })
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled rejection:', reason)
    })
  }
} catch (e) {
  // If process hooks aren't available, it's fine — Bun environments vary.
}
