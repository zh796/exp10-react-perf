import React, { useState, useMemo, useCallback } from 'react'
import data from '../assets/data.json'
import VirtualList from '../components/VirtualList.jsx'
import './ListPage.css'

// 生成大量数据用于演示虚拟列表
function generateLargeData(base, count) {
  const result = []
  for (let i = 0; i < count; i++) {
    const src = base[i % base.length]
    result.push({
      ...src,
      id: i + 1,
      name: `${src.name}（第 ${Math.floor(i / base.length) + 1} 期）`,
      score: Math.max(60, src.score - Math.floor(Math.random() * 10)),
      students: src.students + Math.floor(Math.random() * 50),
    })
  }
  return result
}

const BASE_COURSES = data.courses

export default function ListPage() {
  const [listSize, setListSize]   = useState(100)
  const [keyword, setKeyword]     = useState('')
  const [showMode, setShowMode]   = useState('virtual') // 'virtual' | 'paginate'
  const [page, setPage]           = useState(1)
  const PAGE_SIZE = 10

  // ✅ useMemo — 大数据只在 listSize 变化时重新生成
  const largeData = useMemo(() => generateLargeData(BASE_COURSES, listSize), [listSize])

  // ✅ useMemo — 过滤（关键字变化时重新计算）
  const filtered = useMemo(() =>
    keyword
      ? largeData.filter(c => c.name.includes(keyword))
      : largeData,
    [largeData, keyword]
  )

  // 分页数据
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pagedData  = useMemo(() =>
    filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  )

  // ✅ useCallback
  const handleKeyword = useCallback((e) => {
    setKeyword(e.target.value)
    setPage(1)
  }, [])

  const domCount = showMode === 'virtual'
    ? '约 10 个（虚拟滚动）'
    : `${Math.min(PAGE_SIZE, pagedData.length)} 个（当前页）`

  return (
    <div className="list-page">
      <h1 className="page-title">📋 列表优化</h1>

      {/* ===== 原理对比 ===== */}
      <section className="card" aria-labelledby="vlist-principle-title">
        <h2 id="vlist-principle-title">虚拟列表原理</h2>
        <div className="compare-grid">
          <div className="card before">
            <h3>❌ 普通列表（渲染全部 DOM）</h3>
            <pre className="code-block">
{`// 10000 条 → 10000 个 DOM 节点
// → 内存占用高，滚动卡顿
courses.map(c => (
  <div key={c.id} className="row">
    {c.name}
  </div>
))`}
            </pre>
          </div>
          <div className="card after">
            <h3>✅ 虚拟列表（只渲染可见行）</h3>
            <pre className="code-block">
{`// react-window：只渲染视口内的行
// 10000 条数据 → 约 10 个 DOM 节点
import { FixedSizeList as List } from 'react-window'

<List
  height={480}
  itemCount={10000}
  itemSize={56}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{data[index].name}</div>
  )}
</List>`}
            </pre>
          </div>
        </div>
      </section>

      {/* ===== 互动演示 ===== */}
      <section aria-labelledby="list-demo-title">
        <h2 id="list-demo-title" className="section-h2">互动演示</h2>

        {/* 控制面板 */}
        <div className="list-controls card">
          <div className="control-row">
            <label htmlFor="list-size" className="control-label">
              数据量：<strong>{listSize} 条</strong>
            </label>
            <input
              id="list-size"
              type="range"
              min={20}
              max={5000}
              step={20}
              value={listSize}
              onChange={e => { setListSize(Number(e.target.value)); setPage(1) }}
              aria-valuemin={20}
              aria-valuemax={5000}
              aria-valuenow={listSize}
              aria-label="调整数据量"
            />
          </div>

          <div className="control-row">
            <label htmlFor="list-search" className="sr-only">搜索</label>
            <input
              id="list-search"
              type="search"
              placeholder="🔍 搜索课程…"
              value={keyword}
              onChange={handleKeyword}
              className="search-input-sm"
              aria-label="搜索课程"
            />
          </div>

          <div className="mode-tabs" role="tablist" aria-label="展示模式">
            <button
              role="tab"
              aria-selected={showMode === 'virtual'}
              className={`mode-tab ${showMode === 'virtual' ? 'active' : ''}`}
              onClick={() => setShowMode('virtual')}
            >
              🌀 虚拟滚动
            </button>
            <button
              role="tab"
              aria-selected={showMode === 'paginate'}
              className={`mode-tab ${showMode === 'paginate' ? 'active' : ''}`}
              onClick={() => setShowMode('paginate')}
            >
              📄 分页展示
            </button>
          </div>

          {/* DOM 节点数统计 */}
          <div className="dom-stats" role="status" aria-live="polite">
            <span>过滤后：<strong>{filtered.length}</strong> 条</span>
            <span>DOM 节点：<strong style={{ color: 'var(--color-success)' }}>{domCount}</strong></span>
          </div>
        </div>

        {/* 虚拟列表 */}
        {showMode === 'virtual' && (
          <VirtualList items={filtered} height={400} />
        )}

        {/* 分页列表 */}
        {showMode === 'paginate' && (
          <div className="paginate-section">
            <div className="card">
              <table className="data-table" aria-label="分页课程列表">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">课程名称</th>
                    <th scope="col">分类</th>
                    <th scope="col">评分</th>
                    <th scope="col">学生数</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((c, i) => (
                    <tr key={c.id}>
                      <td style={{ color: 'var(--color-text-muted)' }}>
                        {(page - 1) * PAGE_SIZE + i + 1}
                      </td>
                      <td>{c.name}</td>
                      <td><span className="badge badge-primary">{c.category}</span></td>
                      <td style={{ color: c.score >= 90 ? 'var(--color-success)' : 'var(--color-text)' }}>
                        {c.score}
                      </td>
                      <td>{c.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 分页控件 */}
            <div className="pagination" role="navigation" aria-label="分页导航">
              <button
                className="btn btn-ghost"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="上一页"
              >
                ← 上一页
              </button>
              <span className="page-info" aria-live="polite">
                第 {page} / {totalPages} 页
              </span>
              <button
                className="btn btn-ghost"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="下一页"
              >
                下一页 →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 虚拟列表组件代码 */}
      <section className="card" aria-labelledby="vlist-code-title">
        <h2 id="vlist-code-title">VirtualList 组件关键代码</h2>
        <pre className="code-block">
{`import { FixedSizeList as List } from 'react-window'
import { memo } from 'react'

// ✅ Row 组件用 memo 包裹，避免父组件引起不必要重渲染
const Row = memo(function Row({ index, style, data }) {
  return (
    <div style={style} className="vlist-row">
      <span>{data[index].name}</span>
    </div>
  )
})

// ✅ 传递 itemData 代替内联对象（保持引用稳定）
<List
  height={480}
  itemCount={items.length}
  itemSize={56}          // 每行固定高度 → CLS=0
  itemData={items}       // 稳定引用
  width="100%"
>
  {Row}
</List>`}
        </pre>
      </section>
    </div>
  )
}
