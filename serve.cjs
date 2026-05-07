// 极简静态文件服务器，serve dist 目录
// 用法: node serve.js
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3213
const DIST = path.join(__dirname, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
}

http.createServer((req, res) => {
  let filePath = path.join(DIST, req.url.split('?')[0])

  // SPA fallback：找不到文件时返回 index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html')
  }

  const ext = path.extname(filePath)
  const mime = MIME[ext] || 'application/octet-stream'

  res.writeHead(200, { 'Content-Type': mime })
  fs.createReadStream(filePath).pipe(res)
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
