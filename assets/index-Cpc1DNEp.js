import{d as l,b as m,k as e,e as s,j as c,F as i,ae as u,o as _,a9 as d,cQ as f}from"./index-CaRpFLgX.js";import{_ as p}from"./index.vue_vue_type_script_setup_true_lang-BkQRyxLZ.js";const g=`# 组件介绍

VjConfirm是对ElMessageBox进行的二次封装，主要解决繁琐的配置以及promise处理，应对用户确认场景  

# 使用方法

直接传参使用，参看类型说明，返回值true表示点击确认，false取消

# 类型说明

\`\`\`ts
const VjConfirm: (
  title: string,  // 标题
  message: string | VNode | (() => VNode),  // 内容，字符串/渲染函数/插槽
  callback: () => Promise<boolean>, // 确认回调
  options?: ElMessageBoxOptions,  // 原始组件选项暴露
) => Promise<boolean>  // 返回true为确认，false为取消
\`\`\`

# 运行实例`,b=`\`\`\`html
<el-button @click="confirm">操作确认</el-button>
\`\`\`

\`\`\`ts
const confirm = async () => {
  let res = await VjConfirm('操作确认', '123', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000)
    })
  })
  console.log(res);
}
\`\`\``,w=l({__name:"index",setup(k){const r=async()=>{let o=await f("操作确认","123",()=>new Promise(n=>{setTimeout(()=>{n(!0)},3e3)}));console.log(o)};return(o,n)=>{const t=p,a=u;return _(),m(i,null,[e(t,{mdStr:s(g)},null,8,["mdStr"]),e(a,{onClick:r},{default:c(()=>n[0]||(n[0]=[d("操作确认",-1)])),_:1,__:[0]}),e(t,{mdStr:s(b)},null,8,["mdStr"])],64)}}});export{w as default};
