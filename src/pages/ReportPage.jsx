import React, { useState, useEffect } from 'react'
import data from '../assets/data.json'
import './ReportPage.css'

const { before, after } = data.perfStats

// ===== Lighthouse 圆环图 =====
function GaugeRing({ score, label, color }) {
  const r = 36, cx = 44, cy = 44
  const circ = 2 * Math.PI * r
  const dash  = (score / 100) * circ

  return (
    <div className="gauge-item" aria-label={`${label} 得分 ${score}`}>
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth="8" />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90, 44, 44)"
          style={{ transition: 'stroke-dasharray 1.2s ease' }}
        />
        <text x="44" y="48" textAnchor="middle" fill={color} fontSize="18" fontWeight="700">
          {score}
        </text>
      </svg>
      <span className="gauge-label">{label}</span>
    </div>
  )
}

// ===== CWV 指标卡片 =====
function CWVCard({ name, value, threshold, unit, icon, desc }) {
  const status = value <= threshold ? 'good' : value <= threshold * 2 ? 'needs' : 'poor'
  const statusMap = { good: { label: 'Good ✅', color: 'var(--color-success)' }, needs: { label: 'Needs Improvement ⚠️', color: 'var(--color-secondary)' }, poor: { label: 'Poor ❌', color: 'var(--color-danger)' } }
  return (
    <div className={`cwv-card card cwv-${status}`} aria-label={`${name}: ${value}${unit}`}>
      <div className="cwv-icon" aria-hidden="true">{icon}</div>
      <div className="cwv-name">{name}</div>
      <div className="cwv-value" style={{ color: statusMap[status].color }}>
        {value}{unit}
      </div>
      <div className="cwv-status" style={{ color: statusMap[status].color }}>
        {statusMap[status].label}
      </div>
      <div className="cwv-desc">{desc}</div>
    </div>
  )
}

// ===== 对比数据 =====
const compareRows = [
  { metric: 'FCP（首次内容绘制）', before: `${before.fcp}ms`, after: `${after.fcp}ms`,  improve: `${Math.round((1-after.fcp/before.fcp)*100)}%`, good: true },
  { metric: 'LCP（最大内容绘制）', before: `${before.lcp}ms`, after: `${after.lcp}ms`,  improve: `${Math.round((1-after.lcp/before.lcp)*100)}%`, good: true },
  { metric: 'CLS（布局稳定性）',   before: before.cls,        after: after.cls,           improve: `${Math.round((1-after.cls/before.cls)*100)}%`,  good: true },
  { metric: 'INP（交互响应延迟）', before: `${before.inp}ms`, after: `${after.inp}ms`,    improve: `${Math.round((1-after.inp/before.inp)*100)}%`,  good: true },
  { metric: '组件渲染次数',        before: `${before.renderCount} 次`, after: `${after.renderCount} 次`, improve: `${Math.round((1-after.renderCount/before.renderCount)*100)}%`, good: true },
  { metric: 'Bundle 首屏体积',     before: `${before.bundleSize} MB`,  after: `${after.bundleSize} MB`,  improve: `${Math.round((1-after.bundleSize/before.bundleSize)*100)}%`,  good: true },
  { metric: 'DOM 节点数（列表页）',before: `${before.domNodes}`,        after: `${after.domNodes}`,        improve: `${Math.round((1-after.domNodes/before.domNodes)*100)}%`,        good: true },
]

const optimizeTechs = [
  { tech: 'React.memo',       scene: '纯展示型子组件',         effect: '渲染次数 ↓75%' },
  { tech: 'useMemo',          scene: '搜索/筛选/统计计算',     effect: '重复计算消除' },
  { tech: 'useCallback',      scene: '传递给子组件的函数',     effect: '配合 memo 生效' },
  { tech: '稳定 key',         scene: '列表渲染',               effect: 'diff 复用 DOM' },
  { tech: 'React.lazy',       scene: '路由级页面组件',         effect: '首屏体积 ↓62%' },
  { tech: 'Suspense',         scene: '懒加载边界',             effect: '优雅加载占位' },
  { tech: 'react-window',     scene: '大列表（>100 条）',      effect: 'DOM 节点 ↓83%' },
  { tech: 'IntersectionObserver', scene: '图片/组件懒加载',   effect: 'LCP ↑，流量↓' },
  { tech: '骨架屏占位',       scene: '图片/异步内容',          effect: 'CLS 0.25→0.04' },
  { tech: '代码分割',         scene: 'Vite manualChunks',      effect: '缓存命中率↑' },
]

export default function ReportPage() {
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="report-page">
      <h1 className="page-title">📊 性能报告</h1>

      {/* Lighthouse 得分 */}
      <section className="card" aria-labelledby="lighthouse-title">
        <h2 id="lighthouse-title">Lighthouse 评分（优化后）</h2>
        <div className="gauge-row">
          <GaugeRing score={98} label="性能" color="#10b981" />
          <GaugeRing score={96} label="无障碍" color="#6366f1" />
          <GaugeRing score={100} label="最佳实践" color="#f59e0b" />
          <GaugeRing score={95} label="SEO" color="#f472b6" />
        </div>
      </section>

      {/* Core Web Vitals */}
      <section aria-labelledby="cwv-title">
        <h2 id="cwv-title" className="section-h2">Core Web Vitals（优化后）</h2>
        <div className="cwv-grid">
          <CWVCard name="LCP" value={1.8} threshold={2.5} unit="s" icon="🖼️"
            desc="最大内容绘制 ≤2.5s → 优秀" />
          <CWVCard name="INP" value={62}  threshold={200} unit="ms" icon="👆"
            desc="交互到下一帧 ≤200ms → 优秀" />
          <CWVCard name="CLS" value={0.04} threshold={0.1} unit="" icon="📐"
            desc="布局偏移 ≤0.1 → 优秀" />
        </div>
      </section>

      {/* 优化前后对比表 */}
      <section aria-labelledby="compare-title">
        <h2 id="compare-title" className="section-h2">优化前后对比</h2>
        <div className="card">
          <table className="data-table" aria-label="性能指标优化前后对比">
            <thead>
              <tr>
                <th scope="col">指标</th>
                <th scope="col">优化前</th>
                <th scope="col">优化后</th>
                <th scope="col">提升幅度</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(row => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  <td style={{ color: 'var(--color-danger)' }}>{row.before}</td>
                  <td style={{ color: 'var(--color-success)' }}>{row.after}</td>
                  <td>
                    <span className="badge badge-success">{row.improve} ↑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 优化技术汇总 */}
      <section aria-labelledby="tech-title">
        <h2 id="tech-title" className="section-h2">优化技术汇总</h2>
        <div className="card">
          <table className="data-table" aria-label="使用的优化技术">
            <thead>
              <tr>
                <th scope="col">技术</th>
                <th scope="col">适用场景</th>
                <th scope="col">效果</th>
              </tr>
            </thead>
            <tbody>
              {optimizeTechs.map(row => (
                <tr key={row.tech}>
                  <td><code style={{ color: '#a5b4fc' }}>{row.tech}</code></td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{row.scene}</td>
                  <td><span className="badge badge-primary">{row.effect}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 总结 */}
      <section className="card conclusion" aria-labelledby="conclusion-title">
        <h2 id="conclusion-title">实验总结与思考</h2>
        <div className="conclusion-list">
          {[
            { icon: '🧠', title: '按需使用，不过度优化', desc: '只有组件真的频繁重渲染，且渲染成本较高时，才有必要用 memo/useMemo/useCallback。过早优化会增加代码复杂度。' },
            { icon: '📏', title: '用数据说话', desc: 'React DevTools Profiler 可以精确记录每个组件的渲染次数和时间，优化前后都应该跑 Profiler，对比数字而不是凭感觉。' },
            { icon: '🚀', title: '首屏是最重要的优化点', desc: 'lazy + Suspense 路由懒加载对首屏体积的改善最为明显（本实验减少 62%），是性价比最高的优化手段。' },
            { icon: '🎯', title: 'CLS 往往被忽视', desc: '图片不设置固定宽高、骨架屏缺失都会导致 CLS 飙高。IntersectionObserver + 占位元素是解决 CLS 的标准方案。' },
          ].map(item => (
            <div key={item.title} className="conclusion-item">
              <span className="conclusion-icon" aria-hidden="true">{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
