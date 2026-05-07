import{n as e}from"./rolldown-runtime-jpDsebLB.js";import{l as t,t as n}from"./vendor-D1R9liH6.js";var r=e(t(),1),i=n();function a({src:e,alt:t,width:n=300,height:a=200,className:o=``}){let s=(0,r.useRef)(null),[c,l]=(0,r.useState)(!1),[u,d]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let e=s.current;if(!e)return;let t=new IntersectionObserver(([e])=>{e.isIntersecting&&(d(!0),t.disconnect())},{rootMargin:`200px`});return t.observe(e),()=>t.disconnect()},[]),(0,i.jsxs)(`div`,{ref:s,className:`lazy-image-wrapper ${o}`,style:{width:n,height:a,position:`relative`},children:[!c&&(0,i.jsx)(`div`,{className:`lazy-placeholder`,style:{width:n,height:a},"aria-hidden":`true`}),u&&(0,i.jsx)(`img`,{src:e,alt:t,width:n,height:a,loading:`lazy`,decoding:`async`,onLoad:()=>l(!0),style:{opacity:+!!c,transition:`opacity 0.3s ease`,position:`absolute`,top:0,left:0,objectFit:`cover`,borderRadius:`var(--radius-sm)`}})]})}function o({onClose:e}){return(0,i.jsx)(`div`,{className:`detail-modal`,role:`dialog`,"aria-modal":`true`,"aria-label":`懒加载详情组件`,children:(0,i.jsxs)(`div`,{className:`detail-inner`,children:[(0,i.jsx)(`button`,{className:`detail-close`,onClick:e,"aria-label":`关闭`,children:`✕`}),(0,i.jsx)(`h3`,{children:`✅ 此组件已懒加载`}),(0,i.jsxs)(`p`,{children:[`这个组件在用户点击之前 `,(0,i.jsx)(`strong`,{children:`不会`}),` 被加载到浏览器。 通过 `,(0,i.jsx)(`code`,{children:`React.lazy + Suspense`}),`，首屏 bundle 体积减少约 60%。`]}),(0,i.jsx)(`div`,{className:`code-block`,children:`// App.jsx — 路由级懒加载
const DetailPage = lazy(() =>
  import('./pages/DetailPage.jsx')
)

// 使用 Suspense 设置占位
<Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/detail" element={<DetailPage />} />
  </Routes>
</Suspense>`})]})})}var s=Array.from({length:12},(e,t)=>({id:t+1,src:`https://picsum.photos/seed/${t+10}/400/240`,alt:`课程配图 ${t+1}`})),c=[{chunk:`vendor.js`,before:`680 KB`,after:`680 KB`,note:`共享依赖（不可分割）`},{chunk:`router.js`,before:`（合并在 main）`,after:`48 KB`,note:`路由库单独 chunk`},{chunk:`main.js`,before:`1840 KB`,after:`280 KB`,note:`主应用逻辑`},{chunk:`RenderPage`,before:`（合并在 main）`,after:`62 KB`,note:`懒加载`},{chunk:`ListPage`,before:`（合并在 main）`,after:`95 KB`,note:`含 react-window，懒加载`},{chunk:`ReportPage`,before:`（合并在 main）`,after:`44 KB`,note:`懒加载`},{chunk:`首屏总计`,before:`2520 KB`,after:`960 KB`,note:`减少 62%`}];function l(){let[e,t]=(0,r.useState)(!1),[n,l]=(0,r.useState)(!1),u=(0,r.useRef)(null);function d(){u.current=setTimeout(()=>{l(!0)},200)}function f(){clearTimeout(u.current)}return(0,i.jsxs)(`div`,{className:`load-page`,children:[(0,i.jsx)(`h1`,{className:`page-title`,children:`🚀 加载优化`}),(0,i.jsxs)(`section`,{className:`card`,"aria-labelledby":`lazy-title`,children:[(0,i.jsx)(`h2`,{id:`lazy-title`,children:`React.lazy + Suspense — 路由懒加载`}),(0,i.jsxs)(`div`,{className:`compare-grid`,children:[(0,i.jsxs)(`div`,{className:`card before`,children:[(0,i.jsx)(`h3`,{children:`❌ 优化前（全部同步导入）`}),(0,i.jsx)(`pre`,{className:`code-block`,children:`// App.jsx — 全部页面一次性打包
import HomePage   from './pages/HomePage'
import RenderPage from './pages/RenderPage'
import ListPage   from './pages/ListPage'
import ReportPage from './pages/ReportPage'
// → 首屏下载 2.5 MB JS`})]}),(0,i.jsxs)(`div`,{className:`card after`,children:[(0,i.jsx)(`h3`,{children:`✅ 优化后（路由懒加载）`}),(0,i.jsx)(`pre`,{className:`code-block`,children:`// App.jsx — 按需加载
const HomePage   = lazy(() => import('./pages/HomePage'))
const RenderPage = lazy(() => import('./pages/RenderPage'))
const ListPage   = lazy(() => import('./pages/ListPage'))
const ReportPage = lazy(() => import('./pages/ReportPage'))

// → 首屏只下载 0.96 MB，减少 62%`})]})]})]}),(0,i.jsxs)(`section`,{className:`card demo-lazy-section`,"aria-labelledby":`lazy-demo-title`,children:[(0,i.jsx)(`h2`,{id:`lazy-demo-title`,children:`互动演示 — 懒加载组件`}),(0,i.jsx)(`p`,{className:`demo-desc`,children:`点击按钮模拟懒加载。悬停时会预加载（200ms 延迟），进入视口前组件代码不会执行。`}),(0,i.jsxs)(`div`,{className:`lazy-demo-btns`,children:[(0,i.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>t(!0),onMouseEnter:d,onMouseLeave:f,"aria-label":`加载详情组件`,children:n?`✅ 已预加载，点击打开`:`点击懒加载组件`}),n&&(0,i.jsx)(`span`,{className:`badge badge-success`,children:`已预加载`})]}),e&&(0,i.jsx)(o,{onClose:()=>t(!1)})]}),(0,i.jsxs)(`section`,{"aria-labelledby":`bundle-title`,children:[(0,i.jsx)(`h2`,{id:`bundle-title`,className:`section-h2`,children:`Bundle 体积对比`}),(0,i.jsx)(`div`,{className:`card`,children:(0,i.jsxs)(`table`,{className:`data-table`,"aria-label":`Bundle 体积优化前后对比`,children:[(0,i.jsx)(`thead`,{children:(0,i.jsxs)(`tr`,{children:[(0,i.jsx)(`th`,{scope:`col`,children:`Chunk`}),(0,i.jsx)(`th`,{scope:`col`,children:`优化前`}),(0,i.jsx)(`th`,{scope:`col`,children:`优化后`}),(0,i.jsx)(`th`,{scope:`col`,children:`说明`})]})}),(0,i.jsx)(`tbody`,{children:c.map(e=>(0,i.jsxs)(`tr`,{children:[(0,i.jsx)(`td`,{children:(0,i.jsx)(`code`,{children:e.chunk})}),(0,i.jsx)(`td`,{style:{color:`var(--color-danger)`},children:e.before}),(0,i.jsx)(`td`,{style:{color:`var(--color-success)`},children:e.after}),(0,i.jsx)(`td`,{style:{color:`var(--color-text-muted)`,fontSize:`0.85rem`},children:e.note})]},e.chunk))})]})})]}),(0,i.jsxs)(`section`,{"aria-labelledby":`imglayz-title`,children:[(0,i.jsx)(`h2`,{id:`imglayz-title`,className:`section-h2`,children:`图片懒加载演示（IntersectionObserver）`}),(0,i.jsx)(`p`,{style:{color:`var(--color-text-muted)`,fontSize:`0.9rem`,marginBottom:`16px`},children:`向下滚动 → 图片进入视口后才开始加载。占位骨架屏防止 CLS（布局抖动）。`}),(0,i.jsx)(`div`,{className:`image-grid`,children:s.map(e=>(0,i.jsxs)(`div`,{className:`image-item`,children:[(0,i.jsx)(a,{src:e.src,alt:e.alt,width:320,height:192}),(0,i.jsx)(`p`,{className:`image-caption`,children:e.alt})]},e.id))})]}),(0,i.jsxs)(`section`,{className:`card`,"aria-labelledby":`suspense-title`,children:[(0,i.jsx)(`h2`,{id:`suspense-title`,children:`Suspense 最佳实践`}),(0,i.jsx)(`pre`,{className:`code-block`,children:`// ✅ 在 ErrorBoundary 内包裹 Suspense
// → 防止懒加载失败导致整个页面崩溃

class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError)
      return <div role="alert">页面加载失败，<button>重试</button></div>
    return this.props.children
  }
}

// App.jsx
<ErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>`})]})]})}export{l as default};