import React, { memo } from 'react'

/**
 * CourseCard — 纯展示组件，用 React.memo 包裹
 * ✅ 渲染优化：父组件重新渲染时，只要 props 不变就不会重新渲染
 */
const CourseCard = memo(function CourseCard({ course, onSelect, selected }) {
  return (
    <article
      className={`course-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(course.id)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(course.id)}
      aria-label={`${course.name}，${course.category}，评分 ${course.rating}`}
    >
      <div className="course-card-header">
        <span className="badge badge-primary">{course.category}</span>
        <span className="course-rating" aria-label={`评分 ${course.rating}`}>
          ⭐ {course.rating}
        </span>
      </div>
      <h3 className="course-name">{course.name}</h3>
      <div className="course-meta">
        <span>👨‍🏫 {course.teacher}</span>
        <span>👥 {course.students} 人</span>
      </div>
      <div className="course-score-row">
        <span className="score-label">综合评分</span>
        <div className="progress-bar" style={{ flex: 1 }}>
          <div
            className="progress-fill"
            style={{
              width: `${course.score}%`,
              background: course.score >= 90
                ? 'var(--color-success)'
                : course.score >= 80
                  ? 'var(--color-primary)'
                  : 'var(--color-secondary)',
            }}
            role="progressbar"
            aria-valuenow={course.score}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <span className="score-value">{course.score}</span>
      </div>
    </article>
  )
})

export default CourseCard
