import React, { memo, useRef, useState, useCallback, useEffect } from 'react'

/**
 * VirtualList — 自实现虚拟列表组件（无第三方依赖）
 * ✅ 仅渲染可视区域内的 DOM 节点
 * ✅ 上下添加占位 padding 保持滚动条正确
 * ✅ 演示虚拟滚动原理：10000 条数据只渲染约 10 个节点
 */

const ROW_HEIGHT = 56

const Row = memo(function Row({ index, item }) {
  return (
    <div
      className={`vlist-row ${index % 2 === 0 ? 'even' : 'odd'}`}
      style={{ height: ROW_HEIGHT, display: 'flex', alignItems: 'center' }}
      role="row"
    >
      <span className="vlist-index" aria-label={`第 ${index + 1} 行`}>
        {index + 1}
      </span>
      <span className="vlist-name">{item.name}</span>
      <span className="badge badge-primary">{item.category}</span>
      <span className="vlist-score">{item.score} 分</span>
      <span className="vlist-students">👥 {item.students}</span>
    </div>
  )
})

function VirtualList({ items, height = 480 }) {
  const containerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)

  const totalHeight = items.length * ROW_HEIGHT
  const visibleCount = Math.ceil(height / ROW_HEIGHT) + 2  // 多渲染 2 个作缓冲
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - 1)
  const endIndex = Math.min(items.length, startIndex + visibleCount + 2)

  const visibleItems = items.slice(startIndex, endIndex)
  const offsetY = startIndex * ROW_HEIGHT

  const onScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return (
    <div
      className="vlist-container"
      role="grid"
      aria-label="虚拟列表（仅渲染可见行）"
      aria-rowcount={items.length}
    >
      {/* 列表头 */}
      <div className="vlist-header" role="row">
        <span>#</span>
        <span>课程名称</span>
        <span>分类</span>
        <span>评分</span>
        <span>学生数</span>
      </div>

      {/* 可滚动区域 */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{ height, overflowY: 'auto', position: 'relative' }}
      >
        {/* 撑开总高度的占位元素 */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* 只渲染可见行，用 translateY 定位 */}
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems.map((item, i) => (
              <Row key={startIndex + i} index={startIndex + i} item={item} />
            ))}
          </div>
        </div>
      </div>

      <p className="vlist-tip" role="status" aria-live="polite">
        共 {items.length} 条数据 · 当前渲染 {visibleItems.length} 行（虚拟滚动）
      </p>
    </div>
  )
}

export default VirtualList
