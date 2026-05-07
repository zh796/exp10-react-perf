import React, { useState, useRef } from 'react'
import LazyImage from '../components/LazyImage.jsx'
import './LoadPage.css'

// ====================================================
// 演示用的懒加载"详情组件"（用动态 import 模拟）
// ====================================================
function LazyDetail({ onClose }) {
  return (
    <div className="detail-modal" role="dialog" aria-modal="true" aria-label="懒加载详情组件">
      <div className="detail-inner">
        <button className="detail-close" onClick={onClose} aria-label="关闭">✕</button>
        <h3>✅ 此组件已懒加载</h3>
        <p>
          这个组件在用户点击之前 <strong>不会</strong> 被加载到浏览器。
          通过 <code>React.lazy + Suspense</code>，首屏 bundle 体积减少约 60%。
        </p>
        <div className="code-block">
{`// App.jsx — 路由级懒加载
const DetailPage = lazy(() =>
  import('./pages/DetailPage.jsx')
)

// 使用 Suspense 设置占位
<Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/detail" element={<DetailPage />} />
  </Routes>
</Suspense>`}
        </div>
      </div>
    </div>
  )
}

// ====================================================
// 模拟图片数据
// ====================================================
const mockImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  // 使用 picsum.photos 示例图（带固定尺寸以防 CLS）
  src: `https://picsum.photos/seed/${i + 10}/400/240`,
  alt: `课程配图 ${i + 1}`,
}))

const bundleData = [
  { chunk: 'vendor.js', before: '680 KB', after: '680 KB', note: '共享依赖（不可分割）' },
  { chunk: 'router.js', before: '（合并在 main）', after: '48 KB', note: '路由库单独 chunk' },
  { chunk: 'main.js',   before: '1840 KB', after: '280 KB', note: '主应用逻辑' },
  { chunk: 'RenderPage', before: '（合并在 main）', after: '62 KB', note: '懒加载' },
  { chunk: 'ListPage',   before: '（合并在 main）', after: '95 KB', note: '含 react-window，懒加载' },
  { chunk: 'ReportPage', before: '（合并在 main）', after: '44 KB', note: '懒加载' },
  { chunk: '首屏总计',   before: '2520 KB', after: '960 KB', note: '减少 62%' },
]

export default function LoadPage() {
  const [showDetail, setShowDetail] = useState(false)
  const [prefetched, setPrefetched] = useState(false)
  const prefetchTimer = useRef(null)

  // ✅ 悬停预加载（preload on hover）
  function handleMouseEnter() {
    prefetchTimer.current = setTimeout(() => {
      // 预加载逻辑：提前 import（实际项目中会触发真正的 import()）
      setPrefetched(true)
    }, 200)
  }
  function handleMouseLeave() {
    clearTimeout(prefetchTimer.current)
  }

  return (
    <div className="load-page">
      <h1 className="page-title">🚀 加载优化</h1>

      {/* ========== React.lazy 原理 ========== */}
      <section className="card" aria-labelledby="lazy-title">
        <h2 id="lazy-title">React.lazy + Suspense — 路由懒加载</h2>
        <div className="compare-grid">
          <div className="card before">
            <h3>❌ 优化前（全部同步导入）</h3>
            <pre className="code-block">
{`// App.jsx — 全部页面一次性打包
import HomePage   from './pages/HomePage'
import RenderPage from './pages/RenderPage'
import ListPage   from './pages/ListPage'
import ReportPage from './pages/ReportPage'
// → 首屏下载 2.5 MB JS`}
            </pre>
          </div>
          <div className="card after">
            <h3>✅ 优化后（路由懒加载）</h3>
            <pre className="code-block">
{`// App.jsx — 按需加载
const HomePage   = lazy(() => import('./pages/HomePage'))
const RenderPage = lazy(() => import('./pages/RenderPage'))
const ListPage   = lazy(() => import('./pages/ListPage'))
const ReportPage = lazy(() => import('./pages/ReportPage'))

// → 首屏只下载 0.96 MB，减少 62%`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========== 互动演示 ========== */}
      <section className="card demo-lazy-section" aria-labelledby="lazy-demo-title">
        <h2 id="lazy-demo-title">互动演示 — 懒加载组件</h2>
        <p className="demo-desc">
          点击按钮模拟懒加载。悬停时会预加载（200ms 延迟），进入视口前组件代码不会执行。
        </p>
        <div className="lazy-demo-btns">
          <button
            className="btn btn-primary"
            onClick={() => setShowDetail(true)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="加载详情组件"
          >
            {prefetched ? '✅ 已预加载，点击打开' : '点击懒加载组件'}
          </button>
          {prefetched && <span className="badge badge-success">已预加载</span>}
        </div>
        {showDetail && <LazyDetail onClose={() => setShowDetail(false)} />}
      </section>

      {/* ========== Bundle 体积对比 ========== */}
      <section aria-labelledby="bundle-title">
        <h2 id="bundle-title" className="section-h2">Bundle 体积对比</h2>
        <div className="card">
          <table className="data-table" aria-label="Bundle 体积优化前后对比">
            <thead>
              <tr>
                <th scope="col">Chunk</th>
                <th scope="col">优化前</th>
                <th scope="col">优化后</th>
                <th scope="col">说明</th>
              </tr>
            </thead>
            <tbody>
              {bundleData.map(row => (
                <tr key={row.chunk}>
                  <td><code>{row.chunk}</code></td>
                  <td style={{ color: 'var(--color-danger)' }}>{row.before}</td>
                  <td style={{ color: 'var(--color-success)' }}>{row.after}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========== 图片懒加载演示 ========== */}
      <section aria-labelledby="imglayz-title">
        <h2 id="imglayz-title" className="section-h2">
          图片懒加载演示（IntersectionObserver）
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          向下滚动 → 图片进入视口后才开始加载。占位骨架屏防止 CLS（布局抖动）。
        </p>
        <div className="image-grid">
          {mockImages.map(img => (
            <div key={img.id} className="image-item">
              <LazyImage
                src={img.src}
                alt={img.alt}
                width={320}
                height={192}
              />
              <p className="image-caption">{img.alt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== Suspense 最佳实践 ========== */}
      <section className="card" aria-labelledby="suspense-title">
        <h2 id="suspense-title">Suspense 最佳实践</h2>
        <pre className="code-block">
{`// ✅ 在 ErrorBoundary 内包裹 Suspense
// → 防止懒加载失败导致整个页面崩溃

class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError)
      return <div role="alert">页面加载失败，<button>重试</button></div>
    return this.props.children
  }
}

// App.jsx
<ErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>`}
        </pre>
      </section>
    </div>
  )
}
