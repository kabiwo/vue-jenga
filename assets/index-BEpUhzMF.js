import{d,h as t,b as f,k as o,e as m,j as p,F as u,ae as i,o as c,a9 as _}from"./index-BaxgVisC.js";import{Z as j}from"./modal-CJpiFDXp.js";import"./VjForm.vue_vue_type_script_setup_true_lang-DxZ-DOUp-CHN5c4MM.js";import"./object-B6854-Ot-Cefx54rY.js";import"./el-popper-DtCPpSeA.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-B5OiQiOr.js";import"./string-CEni-xdW-fxBoRSc9.js";const b=`# 组件介绍

VjModalForm是在VjModal和VjForm基础上针对弹窗表单场景进行的二次封装

# 使用方法

在模板中使用VjModalForm，传入form配置并进行引用，调用ref.show方法展示弹窗

# 外部交互

通过defineExpose暴露如下属性

\`\`\`ts
defineExpose({
  form: formRef,  // VjForm实例
  modal: modalRef,  // VjModal实例
  show, // 显示函数
  setData,  // 设置表单数据
  getData,  // 获取表单数据
  validate, // 触发表单验证
});
\`\`\`

# 类型说明

\`\`\`ts

export type VjModalFormProps = VjModalProps & {
  formProps?: VjFormProps;  // VjForm配置

  skPre?: string; // 表单前pre插槽
  skPost?: string;  // 表单后post插槽
};

\`\`\`

# 运行实例`,F=`\`\`\`html
  <VjModalForm ref="modalRef" :formProps>

  </VjModalForm>
  <el-button @click="modalRef.show()">显示弹窗</el-button>
\`\`\`
\`\`\`ts
import { ref } from 'vue';
import type { VjFormProps } from 'vue-jenga/form';


const modalRef = ref();

const formProps = ref<VjFormProps>({
  form: [
    {
      label: 'a',
      code: 'a',
      required: true
    },
    {
      label: 'b',
      code: 'b',
      required: true,
      type: 'number'
    }
  ]
})
\`\`\``,h=d({__name:"index",setup(P){const r=t(),a=t({form:[{label:"a",code:"a",required:!0},{label:"b",code:"b",required:!0,type:"number"}]});return(k,n)=>{const e=V,s=j,l=i;return c(),f(u,null,[o(e,{mdStr:m(b)},null,8,["mdStr"]),o(s,{ref_key:"modalRef",ref:r,formProps:a.value},null,8,["formProps"]),o(l,{onClick:n[0]||(n[0]=M=>r.value.show())},{default:p(()=>n[1]||(n[1]=[_("显示弹窗",-1)])),_:1,__:[1]}),o(e,{mdStr:m(F)},null,8,["mdStr"])],64)}}});export{h as default};
