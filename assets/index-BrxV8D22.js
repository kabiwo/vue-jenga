import{_ as g}from"./index.vue_vue_type_script_setup_true_lang-Bx4jZDz8.js";import{d as F,h as c,b as V,k as t,e as l,j as P,q as j,F as x,o as h,l as k,t as w}from"./index-DX3DE4jv.js";import{t as d}from"./VjForm.vue_vue_type_script_setup_true_lang-CoTzov0y-CxgQT1vC.js";import"./object-BASiahlM-YTibLQfU.js";import"./el-popper-0cytxVH1.js";import{m as r}from"./generator-nQ7uPD3I-ClvTNe9C.js";import{l as v}from"./array-DIpJ5Tfm.js";import"./string-CEni-xdW-DwWwxVxW.js";const I=n=>r({elInputProps:{type:"textarea"}},n),O=n=>{let e={type:"date",elDateProps:{type:"daterange",defaultTime:[new Date(2e3,1,1,0,0,0),new Date(2e3,2,1,23,59,59)],startPlaceholder:"开始日期",endPlaceholder:"结束日期"}};return r(e,n)},S=n=>r({type:"date",elDateProps:{type:"datetime"}},n),D=n=>{let e={type:"date",elDateProps:{type:"datetimerange",defaultTime:[new Date(2e3,1,1,0,0,0),new Date(2e3,2,1,23,59,59)],startPlaceholder:"开始时间",endPlaceholder:"结束时间"}};return r(e,n)},i=n=>r({type:"select",elSelectProps:{multiple:!0}},n),_=`# 组件介绍

VjForm组件是将常用的表单元素预配置，对ElForm相关组件进行二次封装，实现了通过配置的表单动态渲染

并且预制了处理函数以快速获取特定配置，同时预处理了表单校验与错误提示以及排版布局，通过配置透传，允许使用者调整组件行为表现  


子组件的类型会随着开发经验的积累进行增补

# 使用方法

从vue-jenga包中引入VjForm与所用类型，填写参数并在模板中使用

\`\`\`html
<VjForm :form :col="5" />
\`\`\`

\`\`\`ts
import { VjForm, type VjFormItemProps, type VjFormProps } from 'vue-jenga/form'
\`\`\`

# 外部交互

组件通过defineExpose暴露内容与类型如下：
\`\`\`ts
defineExpose({
  forms, // 最终进行渲染的表单项列表
  validate, // 触发校验
  reset,  // 重置表单值
  formRef,  // ElForm的引用
  labelMap  // 从code到label的字典
})
\`\`\`

# 类型说明

\`\`\`ts

export type VjFormItemBase = { // 表单项基准参数，与不同类型参数合并成为VjFormItemProps
  type?: string;
  disableCheck?: boolean | ((props: VjFormItemProps, model: Record<string, unknown>) => boolean); // 检查disabled状态
  defaultValue?: unknown | ((props: VjFormItemProps, model: Record<string, unknown>) => unknown); // 传入默认值
  label?: string | ((item: VjFormItemProps) => string); // 标签
  code: string; // 唯一编码
  required?: boolean; // 必填
  placeholder?: string; // placeholder文本
  noPlaceholder?: boolean;  // 不显示placeholder
  rules?: FormItemRule | FormItemRule[];  // 校验规则
  hide?: boolean | ((item: VjFormItemProps, model: Record<string, unknown>) => boolean); // 隐藏
  onChange?: (value: unknown, item: VjFormItemProps, model: Record<string, unknown>) => void; // 值变化

  spanPre?: number; // 前缀尺寸
  skPre?: string; // 前缀插槽
  spanPost?: number;  // 后缀尺寸
  skPost?: string;  // 后缀插槽

  colspan?: number; // 跨列
  rowspan?: number; // 跨行

  [x: string]: unknown;
};

export type VjFormProps = {
  col?: number; // 列数
  form?: VjFormItemProps[]; // 表单项数组
  elFormProps?: ElPropsType<typeof ElForm>;  // ElForm类型
  slots?: Slots; // 注入插槽
  loading?: boolean;  // 加载状态
  remerge?: (item: VjFormItemProps, index: number) => Partial<VjFormItemProps>; // 渲染前对生成的表单配置项数组再进行一次额外的merge处理
};

\`\`\`

# 运行实例`,R=`这段实例列出了所有当前支持的子表单项

\`\`\`html
  <VjForm v-model="value1" v-bind="form1">
    <template #custom="scope">
      <div>custom{{ consoleScope(scope) }}</div>
    </template>
  </VjForm>
\`\`\`
\`\`\`ts
  const commonOptions: VjOptions = [
    {
      label: 'option1',
      value: 1
    },
    {
      label: 'option2',
      value: 2
    }
  ];

  const consoleScope = (scope: unknown) => {
    console.log(scope)
  }

  const value1 = ref({});
  const form1 = ref<VjFormProps>({
    form: [
      {
        label: '文本',
        code: 'text',
        required: true
      },
      {
        label: '数字',
        code: 'number',
        type: 'number',
        elNumberProps: {
          min: 3,
          max: 15
        },
        rules: [
          {
            min: 5,
            max: 10,
          }
        ]
      },
      {
        label: '选择',
        code: 'select',
        type: 'select',
        options: commonOptions
      },
      VjfcSelectMulti({
        label: '本地多选',
        code: 'multi-select-local',
        options: commonOptions,
      }),
      VjfcSelectMulti({
        label: '远程多选',
        code: 'multi-select-remote',
        remote: true,
        remoteInitQuery: true,
        remoteFunc: async () => {
          console.log('search');
          return commonOptions
        },
        remoteInitOptions: async () => commonOptions,
      }),
      {
        label: '子表',
        code: 'sub',
        type: 'sub',
        subFormConf: {
          form: [
            {
              label: '子表1',
              code: 'sub1',
              required: true
            },
            {
              label: '子表2',
              code: 'sub2',
            }
          ]
        }
      },
      VjfcTextarea({
        label: '文本域',
        code: 'textarea',
      }),
      {
        label: '日期',
        code: 'date',
        type: 'date'
      },
      {
        label: '时间',
        code: 'time',
        type: 'time'
      },
      VjfcDatetime({
        label: '日期时间',
        code: 'datetime',
      }),
      VjfcDateRange({
        label: '日期范围',
        code: 'daterange'
      }),
      VjfcDatetimeRange({
        label: '日期时间范围',
        code: 'datetimerange'
      }),
      {
        label: '单选',
        code: 'radio',
        type: 'radio',
        options: commonOptions
      },
      {
        label: '单选按钮',
        code: 'radio-button',
        type: 'radio',
        button: true,
        options: commonOptions
      },
      {
        label: '复选',
        code: 'checkbox',
        type: 'checkbox',
        options: commonOptions
      },
      {
        label: '复选按钮',
        code: 'checkbox-button',
        type: 'checkbox',
        button: true,
        options: commonOptions
      },
      {
        label: '开关',
        code: 'switch',
        type: 'switch'
      },
      {
        label: '上传',
        code: 'upload',
        type: 'upload'
      },
      {
        label: '级联',
        code: 'cascader',
        type: 'cascader',
        options: commonOptions
      },
      {
        label: '树选择',
        code: 'treeselect',
        type: 'treeselect',
        options: commonOptions
      },
      {
        label: '自定义',
        code: 'custom',
        type: 'custom',
        skDefault: 'custom'
      }
    ],
    col: 3
  });
\`\`\``,E=`这段实例用于展示布局效果与remerge功能

\`\`\`html
<VjForm :form :col="5" :remerge />
\`\`\`
\`\`\`ts
const form = ref<VjFormItemProps[]>(list(20).map((v, i) => {
  return {
    label: \`\${i}\`,
    code: \`\${i}\`
  }
}))

const remerge = (item: unknown, index: number) => {
  if (index === 0) {
    return {
      colspan: 3,
      rowspan: 3
    }
  }
  if (index === 2) {
    return {
      colspan: 3,
      rowspan: 2
    }
  }
  if (index === 13) {
    return {
      colspan: 3,
      rowspan: 3
    }
  }
  return {}
}
\`\`\``,U=F({__name:"index",setup(n){const e=[{label:"option1",value:1},{label:"option2",value:2}],u=a=>{console.log(a)},p=c({}),b=c({form:[{label:"文本",code:"text",required:!0},{label:"数字",code:"number",type:"number",elNumberProps:{min:3,max:15},rules:[{min:5,max:10}]},{label:"选择",code:"select",type:"select",options:e},i({label:"本地多选",code:"multi-select-local",options:e}),i({label:"远程多选",code:"multi-select-remote",remote:!0,remoteInitQuery:!0,remoteFunc:async()=>(console.log("search"),e),remoteInitOptions:async()=>e}),{label:"子表",code:"sub",type:"sub",subFormConf:{form:[{label:"子表1",code:"sub1",required:!0},{label:"子表2",code:"sub2"}]}},I({label:"文本域",code:"textarea"}),{label:"日期",code:"date",type:"date"},{label:"时间",code:"time",type:"time"},S({label:"日期时间",code:"datetime"}),O({label:"日期范围",code:"daterange"}),D({label:"日期时间范围",code:"datetimerange"}),{label:"单选",code:"radio",type:"radio",options:e},{label:"单选按钮",code:"radio-button",type:"radio",button:!0,options:e},{label:"复选",code:"checkbox",type:"checkbox",options:e},{label:"复选按钮",code:"checkbox-button",type:"checkbox",button:!0,options:e},{label:"开关",code:"switch",type:"switch"},{label:"上传",code:"upload",type:"upload"},{label:"级联",code:"cascader",type:"cascader",options:e},{label:"树选择",code:"treeselect",type:"treeselect",options:e},{label:"自定义",code:"custom",type:"custom",skDefault:"custom"}],col:3}),f=c(v(20).map((a,o)=>({label:`${o}`,code:`${o}`}))),y=(a,o)=>o===0?{colspan:3,rowspan:3}:o===2?{colspan:3,rowspan:2}:o===13?{colspan:3,rowspan:3}:{};return(a,o)=>{const s=g;return h(),V(x,null,[t(s,{mdStr:l(_)},null,8,["mdStr"]),t(l(d),j({modelValue:p.value,"onUpdate:modelValue":o[0]||(o[0]=m=>p.value=m)},b.value),{custom:P(m=>[k("div",null,"custom"+w(u(m)),1)]),_:1},16,["modelValue"]),t(s,{mdStr:l(R)},null,8,["mdStr"]),t(l(d),{form:f.value,col:5,remerge:y},null,8,["form"]),t(s,{mdStr:l(E)},null,8,["mdStr"])],64)}}});export{U as default};
