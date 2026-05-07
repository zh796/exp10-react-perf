import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// 上报 Core Web Vitals（Best Practices）
function reportWebVitals(metric) {
  // 实验演示：将指标打印到控制台
  console.log('[Web Vitals]', metric.name, metric.value.toFixed(2))
}

// 懒加载时使用 PerformanceObserver 监控 LCP
if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
  try {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVitals({ name: 'LCP', value: entry.startTime })
      }
    })
    po.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (e) {
    // 浏览器不支持时静默处理
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
