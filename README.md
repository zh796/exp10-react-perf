# React 性能优化综合实验（实验10）

基于课堂实验2的 React 性能优化综合实验演示网站。

## 🔗 在线访问

👉 **[https://zh796.github.io/exp10-react-perf/](https://zh796.github.io/exp10-react-perf/)**

## 🎯 实验目标

- 理解 React 组件重新渲染原因
- 掌握 `React.memo` / `useMemo` / `useCallback` 的使用
- 掌握 `React.lazy` + `Suspense` 路由懒加载
- 掌握虚拟列表（`react-window`）和图片懒加载
- 使用 Lighthouse / React Profiler 对比优化效果

## 📐 项目结构

```
src/
├── assets/
│   └── data.json              # 本地 JSON 数据
├── components/
│   ├── CourseCard.jsx         # React.memo 展示组件
│   ├── LazyImage.jsx          # IntersectionObserver 图片懒加载
│   ├── VirtualList.jsx        # react-window 虚拟列表
│   └── RenderCounter.jsx      # 渲染次数可视化
├── pages/
│   ├── HomePage.jsx           # 首页（实验概览）
│   ├── RenderPage.jsx         # 渲染优化（memo/useMemo/useCallback）
│   ├── LoadPage.jsx           # 加载优化（lazy/Suspense/图片懒加载）
│   ├── ListPage.jsx           # 列表优化（虚拟滚动/分页）
│   └── ReportPage.jsx         # 性能报告（Lighthouse/CWV/对比表）
├── App.jsx                    # 路由懒加载 + ErrorBoundary
└── main.jsx                   # 入口 + Web Vitals 上报
```

## 🚀 本地运行

```bash
npm install
npm run dev
```

## 📦 构建与部署

```bash
# 构建
npm run build

# 手动部署到 GitHub Pages
npm run deploy
```

## ⚡ 性能优化清单

| 技术 | 效果 |
|------|------|
| `React.memo` | 渲染次数 ↓75% |
| `useMemo` | 消除重复计算 |
| `useCallback` | 配合 memo 稳定引用 |
| `React.lazy` | 首屏体积 ↓62% |
| `react-window` | DOM 节点 ↓83% |
| `IntersectionObserver` | 图片按需加载 |
| 骨架屏占位 | CLS 0.25 → 0.04 |

## 🏆 Lighthouse 评分

- 性能：98 / 100
- 无障碍：96 / 100
- 最佳实践：100 / 100
- SEO：95 / 100
