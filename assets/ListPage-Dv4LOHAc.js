import{n as e}from"./rolldown-runtime-jpDsebLB.js";import{l as t,t as n}from"./vendor-D1R9liH6.js";import{t as r}from"./data-20aWxB7W.js";var i=e(t(),1),a=n(),o=56,s=(0,i.memo)(function({index:e,item:t}){return(0,a.jsxs)(`div`,{className:`vlist-row ${e%2==0?`even`:`odd`}`,style:{height:o,display:`flex`,alignItems:`center`},role:`row`,children:[(0,a.jsx)(`span`,{className:`vlist-index`,"aria-label":`第 ${e+1} 行`,children:e+1}),(0,a.jsx)(`span`,{className:`vlist-name`,children:t.name}),(0,a.jsx)(`span`,{className:`badge badge-primary`,children:t.category}),(0,a.jsxs)(`span`,{className:`vlist-score`,children:[t.score,` 分`]}),(0,a.jsxs)(`span`,{className:`vlist-students`,children:[`👥 `,t.students]})]})});function c({items:e,height:t=480}){let n=(0,i.useRef)(null),[r,c]=(0,i.useState)(0),l=e.length*o,u=Math.ceil(t/o)+2,d=Math.max(0,Math.floor(r/o)-1),f=Math.min(e.length,d+u+2),p=e.slice(d,f),m=d*o,h=(0,i.useCallback)(e=>{c(e.currentTarget.scrollTop)},[]);return(0,a.jsxs)(`div`,{className:`vlist-container`,role:`grid`,"aria-label":`虚拟列表（仅渲染可见行）`,"aria-rowcount":e.length,children:[(0,a.jsxs)(`div`,{className:`vlist-header`,role:`row`,children:[(0,a.jsx)(`span`,{children:`#`}),(0,a.jsx)(`span`,{children:`课程名称`}),(0,a.jsx)(`span`,{children:`分类`}),(0,a.jsx)(`span`,{children:`评分`}),(0,a.jsx)(`span`,{children:`学生数`})]}),(0,a.jsx)(`div`,{ref:n,onScroll:h,style:{height:t,overflowY:`auto`,position:`relative`},children:(0,a.jsx)(`div`,{style:{height:l,position:`relative`},children:(0,a.jsx)(`div`,{style:{transform:`translateY(${m}px)`},children:p.map((e,t)=>(0,a.jsx)(s,{index:d+t,item:e},d+t))})})}),(0,a.jsxs)(`p`,{className:`vlist-tip`,role:`status`,"aria-live":`polite`,children:[`共 `,e.length,` 条数据 · 当前渲染 `,p.length,` 行（虚拟滚动）`]})]})}function l(e,t){let n=[];for(let r=0;r<t;r++){let t=e[r%e.length];n.push({...t,id:r+1,name:`${t.name}（第 ${Math.floor(r/e.length)+1} 期）`,score:Math.max(60,t.score-Math.floor(Math.random()*10)),students:t.students+Math.floor(Math.random()*50)})}return n}var u=r.courses;function d(){let[e,t]=(0,i.useState)(100),[n,r]=(0,i.useState)(``),[o,s]=(0,i.useState)(`virtual`),[d,f]=(0,i.useState)(1),p=(0,i.useMemo)(()=>l(u,e),[e]),m=(0,i.useMemo)(()=>n?p.filter(e=>e.name.includes(n)):p,[p,n]),h=Math.ceil(m.length/10),g=(0,i.useMemo)(()=>m.slice((d-1)*10,d*10),[m,d]),_=(0,i.useCallback)(e=>{r(e.target.value),f(1)},[]),v=o===`virtual`?`约 10 个（虚拟滚动）`:`${Math.min(10,g.length)} 个（当前页）`;return(0,a.jsxs)(`div`,{className:`list-page`,children:[(0,a.jsx)(`h1`,{className:`page-title`,children:`📋 列表优化`}),(0,a.jsxs)(`section`,{className:`card`,"aria-labelledby":`vlist-principle-title`,children:[(0,a.jsx)(`h2`,{id:`vlist-principle-title`,children:`虚拟列表原理`}),(0,a.jsxs)(`div`,{className:`compare-grid`,children:[(0,a.jsxs)(`div`,{className:`card before`,children:[(0,a.jsx)(`h3`,{children:`❌ 普通列表（渲染全部 DOM）`}),(0,a.jsx)(`pre`,{className:`code-block`,children:`// 10000 条 → 10000 个 DOM 节点
// → 内存占用高，滚动卡顿
courses.map(c => (
  <div key={c.id} className="row">
    {c.name}
  </div>
))`})]}),(0,a.jsxs)(`div`,{className:`card after`,children:[(0,a.jsx)(`h3`,{children:`✅ 虚拟列表（只渲染可见行）`}),(0,a.jsx)(`pre`,{className:`code-block`,children:`// react-window：只渲染视口内的行
// 10000 条数据 → 约 10 个 DOM 节点
import { FixedSizeList as List } from 'react-window'

<List
  height={480}
  itemCount={10000}
  itemSize={56}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{data[index].name}</div>
  )}
</List>`})]})]})]}),(0,a.jsxs)(`section`,{"aria-labelledby":`list-demo-title`,children:[(0,a.jsx)(`h2`,{id:`list-demo-title`,className:`section-h2`,children:`互动演示`}),(0,a.jsxs)(`div`,{className:`list-controls card`,children:[(0,a.jsxs)(`div`,{className:`control-row`,children:[(0,a.jsxs)(`label`,{htmlFor:`list-size`,className:`control-label`,children:[`数据量：`,(0,a.jsxs)(`strong`,{children:[e,` 条`]})]}),(0,a.jsx)(`input`,{id:`list-size`,type:`range`,min:20,max:5e3,step:20,value:e,onChange:e=>{t(Number(e.target.value)),f(1)},"aria-valuemin":20,"aria-valuemax":5e3,"aria-valuenow":e,"aria-label":`调整数据量`})]}),(0,a.jsxs)(`div`,{className:`control-row`,children:[(0,a.jsx)(`label`,{htmlFor:`list-search`,className:`sr-only`,children:`搜索`}),(0,a.jsx)(`input`,{id:`list-search`,type:`search`,placeholder:`🔍 搜索课程…`,value:n,onChange:_,className:`search-input-sm`,"aria-label":`搜索课程`})]}),(0,a.jsxs)(`div`,{className:`mode-tabs`,role:`tablist`,"aria-label":`展示模式`,children:[(0,a.jsx)(`button`,{role:`tab`,"aria-selected":o===`virtual`,className:`mode-tab ${o===`virtual`?`active`:``}`,onClick:()=>s(`virtual`),children:`🌀 虚拟滚动`}),(0,a.jsx)(`button`,{role:`tab`,"aria-selected":o===`paginate`,className:`mode-tab ${o===`paginate`?`active`:``}`,onClick:()=>s(`paginate`),children:`📄 分页展示`})]}),(0,a.jsxs)(`div`,{className:`dom-stats`,role:`status`,"aria-live":`polite`,children:[(0,a.jsxs)(`span`,{children:[`过滤后：`,(0,a.jsx)(`strong`,{children:m.length}),` 条`]}),(0,a.jsxs)(`span`,{children:[`DOM 节点：`,(0,a.jsx)(`strong`,{style:{color:`var(--color-success)`},children:v})]})]})]}),o===`virtual`&&(0,a.jsx)(c,{items:m,height:400}),o===`paginate`&&(0,a.jsxs)(`div`,{className:`paginate-section`,children:[(0,a.jsx)(`div`,{className:`card`,children:(0,a.jsxs)(`table`,{className:`data-table`,"aria-label":`分页课程列表`,children:[(0,a.jsx)(`thead`,{children:(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`th`,{scope:`col`,children:`#`}),(0,a.jsx)(`th`,{scope:`col`,children:`课程名称`}),(0,a.jsx)(`th`,{scope:`col`,children:`分类`}),(0,a.jsx)(`th`,{scope:`col`,children:`评分`}),(0,a.jsx)(`th`,{scope:`col`,children:`学生数`})]})}),(0,a.jsx)(`tbody`,{children:g.map((e,t)=>(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{style:{color:`var(--color-text-muted)`},children:(d-1)*10+t+1}),(0,a.jsx)(`td`,{children:e.name}),(0,a.jsx)(`td`,{children:(0,a.jsx)(`span`,{className:`badge badge-primary`,children:e.category})}),(0,a.jsx)(`td`,{style:{color:e.score>=90?`var(--color-success)`:`var(--color-text)`},children:e.score}),(0,a.jsx)(`td`,{children:e.students})]},e.id))})]})}),(0,a.jsxs)(`div`,{className:`pagination`,role:`navigation`,"aria-label":`分页导航`,children:[(0,a.jsx)(`button`,{className:`btn btn-ghost`,onClick:()=>f(e=>Math.max(1,e-1)),disabled:d===1,"aria-label":`上一页`,children:`← 上一页`}),(0,a.jsxs)(`span`,{className:`page-info`,"aria-live":`polite`,children:[`第 `,d,` / `,h,` 页`]}),(0,a.jsx)(`button`,{className:`btn btn-ghost`,onClick:()=>f(e=>Math.min(h,e+1)),disabled:d===h,"aria-label":`下一页`,children:`下一页 →`})]})]})]}),(0,a.jsxs)(`section`,{className:`card`,"aria-labelledby":`vlist-code-title`,children:[(0,a.jsx)(`h2`,{id:`vlist-code-title`,children:`VirtualList 组件关键代码`}),(0,a.jsx)(`pre`,{className:`code-block`,children:`import { FixedSizeList as List } from 'react-window'
import { memo } from 'react'

// ✅ Row 组件用 memo 包裹，避免父组件引起不必要重渲染
const Row = memo(function Row({ index, style, data }) {
  return (
    <div style={style} className="vlist-row">
      <span>{data[index].name}</span>
    </div>
  )
})

// ✅ 传递 itemData 代替内联对象（保持引用稳定）
<List
  height={480}
  itemCount={items.length}
  itemSize={56}          // 每行固定高度 → CLS=0
  itemData={items}       // 稳定引用
  width="100%"
>
  {Row}
</List>`})]})]})}export{d as default};