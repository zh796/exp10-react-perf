import React, { useRef, useEffect, useState } from 'react'

/**
 * LazyImage — 图片懒加载组件
 * ✅ 使用 IntersectionObserver 监听图片是否进入视口
 * ✅ 进入视口前显示占位，避免 CLS（Cumulative Layout Shift）
 */
function LazyImage({ src, alt, width = 300, height = 200, className = '' }) {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    // ✅ IntersectionObserver — 只在进入视口时才加载
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }  // 提前 200px 开始加载
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={imgRef}
      className={`lazy-image-wrapper ${className}`}
      style={{ width, height, position: 'relative' }}
    >
      {/* 占位骨架屏 — 防止 CLS */}
      {!loaded && (
        <div
          className="lazy-placeholder"
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            position: 'absolute',
            top: 0, left: 0,
            objectFit: 'cover',
            borderRadius: 'var(--radius-sm)',
          }}
        />
      )}
    </div>
  )
}

export default LazyImage
