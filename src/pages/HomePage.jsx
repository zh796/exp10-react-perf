import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const features = [
  {
    icon: '⚡',
    title: '渲染优化',
    desc: 'React.memo / useMemo / useCallback / 稳定 key，减少无效重渲染',
    to: '/render',
    badge: '必掌握',
    color: 'var(--color-primary)',
  },
  {
    icon: '🚀',
    title: '加载优化',
    desc: 'React.lazy + Suspense 路由懒加载，代码分割减少首屏体积',
    to: '/load',
    badge: '首屏关键',
    color: 'var(--color-secondary)',
  },
  {
    icon: '📋',
    title: '列表优化',
    desc: 'react-window 虚拟滚动 + IntersectionObserver 图片懒加载',
    to: '/list',
    badge: '大数据',
    color: 'var(--color-success)',
  },
  {
    icon: '📊',
    title: '性能报告',
    desc: 'Lighthouse / Core Web Vitals / React Profiler 优化前后对比',
    to: '/report',
    badge: '可量化',
    color: '#f472b6',
  },
]

const metrics = [
  { label: 'LCP', before: '4.8s', after: '1.8s', icon: '🖼️', improvement: '62%↑' },
  { label: 'INP', before: '320ms', after: '62ms', icon: '👆', improvement: '81%↑' },
  { label: 'CLS', before: '0.25', after: '0.04', icon: '📐', improvement: '84%↑' },
  { label: '渲染次数', before: '48次', after: '12次', icon: '🔄', improvement: '75%↓' },
]

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-badge">第10章实验</div>
        <h1 id="hero-title" className="hero-title">
          React 性能优化<br />
          <span className="hero-accent">综合实验</span>
        </h1>
        <p className="hero-desc">
          基于课堂实验2基础项目，系统演示 memo、useMemo、useCallback、
          虚拟列表、懒加载等 React 性能优化手段，量化展示优化效果。
        </p>
        <div className="hero-actions">
          <Link to="/render" className="btn btn-primary">开始实验 →</Link>
          <a
            href="https://github.com/zh796/exp10-react-perf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            GitHub 仓库
          </a>
        </div>
      </section>

      {/* 性能指标预览 */}
      <section aria-labelledby="metrics-title">
        <h2 id="metrics-title" className="section-title">优化效果预览</h2>
        <div className="metrics-grid">
          {metrics.map(m => (
            <div key={m.label} className="metric-card card">
              <div className="metric-icon" aria-hidden="true">{m.icon}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-row">
                <span className="metric-before">{m.before}</span>
                <span className="metric-arrow" aria-hidden="true">→</span>
                <span className="metric-after">{m.after}</span>
              </div>
              <span className="badge badge-success">{m.improvement}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 功能模块卡片 */}
      <section aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">实验模块</h2>
        <div className="features-grid">
          {features.map(f => (
            <Link
              key={f.to}
              to={f.to}
              className="feature-card card"
              aria-label={`${f.title}：${f.desc}`}
            >
              <div className="feature-icon" aria-hidden="true" style={{ color: f.color }}>
                {f.icon}
              </div>
              <div>
                <div className="feature-title-row">
                  <h3 className="feature-title">{f.title}</h3>
                  <span className="badge badge-primary">{f.badge}</span>
                </div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 技术栈 */}
      <section aria-labelledby="stack-title">
        <h2 id="stack-title" className="section-title">技术栈</h2>
        <div className="stack-grid">
          {['React 18', 'Vite 6', 'React Router 7', 'react-window', 'GitHub Pages'].map(s => (
            <span key={s} className="stack-tag">{s}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
