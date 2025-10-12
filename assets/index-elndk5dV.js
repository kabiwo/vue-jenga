import{d as i,h as m,b as d,k as o,e as l,j as a,F as f,ae as u,o as p,l as c,a9 as _}from"./index-DX3DE4jv.js";import{q as g}from"./modal-BwAff7KS.js";import"./VjForm.vue_vue_type_script_setup_true_lang-CoTzov0y-CxgQT1vC.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-Bx4jZDz8.js";import"./object-BASiahlM-YTibLQfU.js";import"./el-popper-0cytxVH1.js";import"./string-CEni-xdW-DwWwxVxW.js";const E=`# 组件介绍

对ElDialog的二次封装，减少了配置项

# 使用方法

在模板中使用VjModal，并进行引用，调用ref.show方法展示弹窗

# 外部交互

暴露了如下实例属性

\`\`\`ts

defineExpose({
  dialog: dialogRef,  // ElDialog实例类型
  show, // 显示弹窗方法
  dialogShow  // 弹窗显示状态
});

\`\`\`

# 类型说明

\`\`\`ts

export type VjModalProps = {
  title?: string; // 标题
  width?: number | string;  // 宽度
  cancelText?: string;  // 取消按钮文本
  confirmText?: string; // 确定按钮文本
  confirmFunc?: (value?: unknown) => Promise<boolean>;  // 确定点击函数
  confirmCheckFunc?: (value?: unknown) => Promise<boolean>; // 触发确定点击函数前的校验函数
  showFunc?: (value: unknown) => Promise<boolean>;  // 弹窗展开后的回调函数
  noFooter?: boolean; // 不显示下方按钮
  elDialogProps?: ElPropsType<typeof ElDialog>; // ElDialog参数
  elDialogEmit?: ElEventType<typeof ElDialog>;  // ElDialog事件
  slots?: Slots;  // 插槽
  skDefault?: string; // default插槽
  skHeader?: string;  // header插槽
};

\`\`\`

# 运行实例`,w=`\`\`\`html
<VjModal ref="modalRef">
  <div>modal</div>
</VjModal>
<el-button @click="modalRef.show()">显示弹窗</el-button>
\`\`\`
\`\`\`ts
import { ref } from 'vue';


const modalRef = ref();
\`\`\``,P=i({__name:"index",setup(v){const e=m();return(b,n)=>{const t=k,r=g,s=u;return p(),d(f,null,[o(t,{mdStr:l(E)},null,8,["mdStr"]),o(r,{ref_key:"modalRef",ref:e},{default:a(()=>n[1]||(n[1]=[c("div",null,"modal",-1)])),_:1,__:[1]},512),o(s,{onClick:n[0]||(n[0]=x=>e.value.show())},{default:a(()=>n[2]||(n[2]=[_("显示弹窗",-1)])),_:1,__:[2]}),o(t,{mdStr:l(w)},null,8,["mdStr"])],64)}}});export{P as default};
