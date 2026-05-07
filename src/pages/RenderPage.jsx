import React, {
  useState, useMemo, useCallback, useRef, memo
} from 'react'
import data from '../assets/data.json'
import CourseCard from '../components/CourseCard.jsx'
import RenderCounter from '../components/RenderCounter.jsx'
import './RenderPage.css'

// ====================================================
// 演示1：未用 memo 的子组件（每次父组件渲染都会重新渲染）
// ====================================================
function UnoptimizedChild({ onSearch }) {
  const renderCount = useRef(0)
  renderCount.current += 1
  return (
    <div className="demo-child unoptimized" role="status">
      <span className="child-label">❌ 未优化子组件</span>
      <span className="child-renders">已渲染 {renderCount.current} 次</span>
    </div>
  )
}

// ====================================================
// 演示2：用 React.memo 包裹的子组件（props 不变不重渲染）
// ====================================================
const OptimizedChild = memo(function OptimizedChild({ onSearch }) {
  const renderCount = useRef(0)
  renderCount.current += 1
  return (
    <div className="demo-child optimized" role="status">
      <span className="child-label">✅ memo 优化子组件</span>
      <span className="child-renders">已渲染 {renderCount.current} 次</span>
    </div>
  )
})

// ====================================================
// 主页面
// ====================================================
export default function RenderPage() {
  const [counter, setCounter]   = useState(0)
  const [keyword, setKeyword]   = useState('')
  const [category, setCategory] = useState('全部')
  const [selected, setSelected] = useState(null)

  const parentRenders = useRef(0)
  parentRenders.current += 1

  // ✅ useMemo — 缓存过滤 + 排序结果，避免每次渲染重复计算
  const filteredCourses = useMemo(() => {
    return data.courses
      .filter(c => {
        const matchKw  = c.name.includes(keyword) || c.teacher.includes(keyword)
        const matchCat = category === '全部' || c.category === category
        return matchKw && matchCat
      })
      .sort((a, b) => b.score - a.score)
  }, [keyword, category])   // 只在 keyword / category 变化时重新计算

  // ✅ useMemo — 缓存统计数据
  const stats = useMemo(() => ({
    total:   filteredCourses.length,
    avgScore: filteredCourses.length
      ? (filteredCourses.reduce((s, c) => s + c.score, 0) / filteredCourses.length).toFixed(1)
      : 0,
    maxScore: filteredCourses.length
      ? Math.max(...filteredCourses.map(c => c.score))
      : 0,
  }), [filteredCourses])

  // ✅ useCallback — 缓存函数引用，防止 OptimizedChild 因函数 prop 变化而重渲染
  const handleSearch = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])   // 空依赖：函数引用永不变

  const handleSelect = useCallback((id) => {
    setSelected(prev => prev === id ? null : id)
  }, [])

  const categories = useMemo(() => ['全部', ...new Set(data.courses.map(c => c.category))], [])

  return (
    <div className="render-page">
      <h1 className="page-title">⚡ 渲染优化</h1>

      {/* ========== 演示区域：memo 对比 ========== */}
      <section className="demo-section card" aria-labelledby="memo-demo-title">
        <h2 id="memo-demo-title">React.memo 演示</h2>
        <p className="demo-desc">
          点击下方按钮触发<strong>父组件重新渲染</strong>，观察两个子组件的渲染次数差异。
          <code>OptimizedChild</code> 的 <code>onSearch</code> 函数通过 <code>useCallback</code> 缓存，
          所以 props 引用不变 → memo 生效 → 不重渲染。
        </p>
        <div className="demo-counter-row">
          <RenderCounter label="父组件渲染" count={parentRenders.current} color="var(--color-primary)" />
          <button
            className="btn btn-primary"
            onClick={() => setCounter(c => c + 1)}
            aria-label="触发父组件重新渲染"
          >
            触发父组件渲染（已点 {counter} 次）
          </button>
        </div>
        <div className="demo-children-row">
          <UnoptimizedChild onSearch={() => {}} />
          <OptimizedChild   onSearch={handleSearch} />
        </div>
      </section>

      {/* ========== useMemo 代码示例 ========== */}
      <section className="card" aria-labelledby="usememo-title">
        <h2 id="usememo-title">useMemo — 缓存计算结果</h2>
        <div className="compare-grid">
          <div className="card before">
            <h3>❌ 优化前</h3>
            <pre className="code-block">
{`// 每次渲染都重新过滤
const filtered = courses
  .filter(c => c.name.includes(kw))
  .sort((a,b) => b.score - a.score)`}
            </pre>
          </div>
          <div className="card after">
            <h3>✅ 优化后</h3>
            <pre className="code-block">
{`// 只在依赖变化时重新计算
const filtered = useMemo(() =>
  courses
    .filter(c => c.name.includes(kw))
    .sort((a,b) => b.score - a.score),
  [courses, kw]  // 依赖数组
)`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========== useCallback 代码示例 ========== */}
      <section className="card" aria-labelledby="usecallback-title">
        <h2 id="usecallback-title">useCallback — 缓存函数引用</h2>
        <div className="compare-grid">
          <div className="card before">
            <h3>❌ 优化前（每次新函数引用）</h3>
            <pre className="code-block">
{`// 每次渲染创建新函数
// → OptimizedChild 检测到 prop 变化 → 重渲染
function Parent() {
  const handleClick = () => { ... }
  return <Child onClick={handleClick} />
}`}
            </pre>
          </div>
          <div className="card after">
            <h3>✅ 优化后（稳定函数引用）</h3>
            <pre className="code-block">
{`// useCallback 缓存函数引用
// → prop 引用不变 → memo 子组件不重渲染
function Parent() {
  const handleClick = useCallback(() => {
    // ...
  }, [])  // 空依赖 = 永不重建
  return <Child onClick={handleClick} />
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========== 稳定 key ========== */}
      <section className="card" aria-labelledby="key-title">
        <h2 id="key-title">稳定 key — 列表 diff 优化</h2>
        <div className="compare-grid">
          <div className="card before">
            <h3>❌ 错误写法（不稳定 key）</h3>
            <pre className="code-block">
{`// 使用数组下标 → 排序/删除时 DOM 重建
courses.map((c, index) => (
  <CourseCard key={index} course={c} />
))

// 使用随机数 → 每次渲染全部重建
courses.map(c => (
  <CourseCard key={Math.random()} course={c} />
))`}
            </pre>
          </div>
          <div className="card after">
            <h3>✅ 正确写法（稳定唯一 key）</h3>
            <pre className="code-block">
{`// 使用数据中的唯一 ID
// → diff 算法可复用现有 DOM
courses.map(c => (
  <CourseCard key={c.id} course={c} />
))`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========== 实际课程列表（可交互） ========== */}
      <section aria-labelledby="course-list-title">
        <h2 id="course-list-title" className="section-h2">
          实时演示 — 搜索/筛选 + useMemo 缓存
        </h2>

        {/* 统计数据 (useMemo) */}
        <div className="stats-row" role="status" aria-live="polite">
          <span>共 <strong>{stats.total}</strong> 门课程</span>
          <span>平均分 <strong>{stats.avgScore}</strong></span>
          <span>最高分 <strong>{stats.maxScore}</strong></span>
        </div>

        {/* 搜索框 */}
        <div className="filter-row">
          <label htmlFor="search-input" className="sr-only">搜索课程</label>
          <input
            id="search-input"
            type="search"
            className="search-input"
            placeholder="🔍 搜索课程或老师名…"
            value={keyword}
            onChange={handleSearch}
            aria-label="搜索课程"
          />

          {/* 分类筛选 */}
          <div className="category-tabs" role="tablist" aria-label="按分类筛选">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                className={`cat-tab ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 课程卡片网格 (使用 CourseCard + memo + 稳定 key) */}
        {filteredCourses.length > 0 ? (
          <div className="course-grid" role="list">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}          /* ✅ 稳定 key */
                course={course}
                onSelect={handleSelect}  /* ✅ useCallback 缓存 */
                selected={selected === course.id}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">🔍</span>
            <p>未找到相关课程，试试其他关键词</p>
          </div>
        )}
      </section>
    </div>
  )
}
