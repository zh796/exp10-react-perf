import React, { memo } from 'react'

/**
 * RenderCounter — 渲染次数计数器
 * 用于直观展示组件重新渲染次数
 */
const RenderCounter = memo(function RenderCounter({ label, count, color = 'var(--color-primary)' }) {
  return (
    <div className="render-counter" role="status" aria-live="polite">
      <div className="render-counter-label">{label}</div>
      <div
        className="render-counter-value"
        style={{ color }}
        aria-label={`${label} 已渲染 ${count} 次`}
      >
        {count}
      </div>
      <div className="render-counter-unit">次</div>
    </div>
  )
})

export default RenderCounter
