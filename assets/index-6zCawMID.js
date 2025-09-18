import{_ as y}from"./index.vue_vue_type_script_setup_true_lang-CvVgCYEb.js";import{d as g,h as c,b as F,k as t,e as r,j as P,q as V,F as j,o as x,l as h,t as k}from"./index-tVMZFrV7.js";import{t as d}from"./VjForm.vue_vue_type_script_setup_true_lang-Dq7hVD8v-BZLtVPIP.js";import"./object-mrbcERGG-C7jm_891.js";import"./el-popper-D6lBm-dc.js";import{m as a}from"./generator-Bb6p3Rz3-C7Of82WL.js";import{l as w}from"./array-DIpJ5Tfm.js";import"./string-CEni-xdW-Ck9im92u.js";const v=o=>a({elInputProps:{type:"textarea"}},o),I=o=>{let n={type:"date",elDateProps:{type:"daterange",defaultTime:[new Date(2e3,1,1,0,0,0),new Date(2e3,2,1,23,59,59)],startPlaceholder:"开始日期",endPlaceholder:"结束日期"}};return a(n,o)},D=o=>a({type:"date",elDateProps:{type:"datetime"}},o),S=o=>{let n={type:"date",elDateProps:{type:"datetimerange",defaultTime:[new Date(2e3,1,1,0,0,0),new Date(2e3,2,1,23,59,59)],startPlaceholder:"开始时间",endPlaceholder:"结束时间"}};return a(n,o)},_=`# 组件介绍

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

# 运行实例`,O=`这段实例列出了所有当前支持的子表单项

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
        label: '多选',
        code: 'checkbox',
        type: 'checkbox',
        options: commonOptions
      },
      {
        label: '多选按钮',
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
\`\`\``,R=`这段实例用于展示布局效果与remerge功能

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
\`\`\``,U=g({__name:"index",setup(o){const n=[{label:"option1",value:1},{label:"option2",value:2}],i=l=>{console.log(l)},p=c({}),u=c({form:[{label:"文本",code:"text",required:!0},{label:"数字",code:"number",type:"number",elNumberProps:{min:3,max:15},rules:[{min:5,max:10}]},{label:"选择",code:"select",type:"select",options:n},{label:"子表",code:"sub",type:"sub",subFormConf:{form:[{label:"子表1",code:"sub1",required:!0},{label:"子表2",code:"sub2"}]}},v({label:"文本域",code:"textarea"}),{label:"日期",code:"date",type:"date"},{label:"时间",code:"time",type:"time"},D({label:"日期时间",code:"datetime"}),I({label:"日期范围",code:"daterange"}),S({label:"日期时间范围",code:"datetimerange"}),{label:"单选",code:"radio",type:"radio",options:n},{label:"单选按钮",code:"radio-button",type:"radio",button:!0,options:n},{label:"多选",code:"checkbox",type:"checkbox",options:n},{label:"多选按钮",code:"checkbox-button",type:"checkbox",button:!0,options:n},{label:"开关",code:"switch",type:"switch"},{label:"上传",code:"upload",type:"upload"},{label:"级联",code:"cascader",type:"cascader",options:n},{label:"树选择",code:"treeselect",type:"treeselect",options:n},{label:"自定义",code:"custom",type:"custom",skDefault:"custom"}],col:3}),b=c(w(20).map((l,e)=>({label:`${e}`,code:`${e}`}))),f=(l,e)=>e===0?{colspan:3,rowspan:3}:e===2?{colspan:3,rowspan:2}:e===13?{colspan:3,rowspan:3}:{};return(l,e)=>{const s=y;return x(),F(j,null,[t(s,{mdStr:r(_)},null,8,["mdStr"]),t(r(d),V({modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=m=>p.value=m)},u.value),{custom:P(m=>[h("div",null,"custom"+k(i(m)),1)]),_:1},16,["modelValue"]),t(s,{mdStr:r(O)},null,8,["mdStr"]),t(r(d),{form:b.value,col:5,remerge:f},null,8,["form"]),t(s,{mdStr:r(R)},null,8,["mdStr"])],64)}}});export{U as default};
