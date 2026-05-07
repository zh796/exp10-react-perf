import React, { Suspense, lazy } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

// ✅ 路由级懒加载（加载优化）
const HomePage    = lazy(() => import('./pages/HomePage.jsx'))
const RenderPage  = lazy(() => import('./pages/RenderPage.jsx'))
const LoadPage    = lazy(() => import('./pages/LoadPage.jsx'))
const ListPage    = lazy(() => import('./pages/ListPage.jsx'))
const ReportPage  = lazy(() => import('./pages/ReportPage.jsx'))

// 加载占位组件
function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="loader-spinner" aria-hidden="true"></div>
      <span>页面加载中…</span>
    </div>
  )
}

// ErrorBoundary（Best Practices）
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <h2>😕 页面加载出错</h2>
          <button onClick={() => this.setState({ hasError: false })}>重试</button>
        </div>
      )
    }
    return this.props.children
  }
}

const navItems = [
  { to: '/',        label: '🏠 首页' },
  { to: '/render',  label: '⚡ 渲染优化' },
  { to: '/load',    label: '🚀 加载优化' },
  { to: '/list',    label: '📋 列表优化' },
  { to: '/report',  label: '📊 性能报告' },
]

export default function App() {
  return (
    <div className="app-wrapper">
      {/* ✅ Accessibility: skip link target */}
      {/* ✅ SEO: 语义化 header */}
      <header className="app-header" role="banner">
        <div className="header-inner">
          <a href="#main-content" className="skip-link">跳到主要内容</a>
          <div className="logo" aria-label="实验10 React性能优化">
            <span aria-hidden="true">⚛️</span>
            <span>React 性能优化实验</span>
          </div>
          <nav className="main-nav" aria-label="主导航">
            <ul role="list">
              {navItems.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    aria-current={({ isActive }) => isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ✅ SEO: 语义化 main */}
      <main id="main-content" className="app-main" tabIndex={-1}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"       element={<HomePage />} />
              <Route path="/render" element={<RenderPage />} />
              <Route path="/load"   element={<LoadPage />} />
              <Route path="/list"   element={<ListPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="*"       element={
                <div className="not-found" role="main">
                  <h1>404 — 页面不存在</h1>
                  <NavLink to="/">返回首页</NavLink>
                </div>
              } />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <footer className="app-footer" role="contentinfo">
        <p>
          实验10 · React 性能优化综合实验 ·&nbsp;
          <a href="https://github.com/zh796/exp10-react-perf" target="_blank" rel="noopener noreferrer">
            GitHub 仓库
          </a>
        </p>
      </footer>
    </div>
  )
}
