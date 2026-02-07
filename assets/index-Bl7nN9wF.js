import{d as I,h as p,b as x,k as r,e as m,j as i,q as R,F as k,E as w,o as h,l as v,t as S,s as _}from"./index-_HcIXaH9.js";import{_ as E}from"./index.vue_vue_type_script_setup_true_lang-x8QCuA8C.js";import{y as b}from"./VjForm.vue_vue_type_script_setup_true_lang-DzHhrbRl-CBE0hkgO.js";import"./el-checkbox-Cy1zeTbL.js";import{m as s}from"./generator-Vx02v1om-Dpahd4Jk.js";import{l as T}from"./array-DIpJ5Tfm.js";import"./string-CEni-xdW-C2QwjiYz.js";import"./index-tFvSIMde.js";const C=n=>s({elInputProps:{type:"textarea"}},n),D=n=>{let t={type:"date",elDateProps:{type:"daterange",defaultTime:[new Date(2e3,1,1,0,0,0),new Date(2e3,2,1,23,59,59)],startPlaceholder:"开始日期",endPlaceholder:"结束日期"}};return s(t,n)},O=n=>s({type:"date",elDateProps:{type:"datetime"}},n),M=n=>{let t={type:"date",elDateProps:{type:"datetimerange",defaultTime:[new Date(2e3,1,1,0,0,0),new Date(2e3,2,1,23,59,59)],startPlaceholder:"开始时间",endPlaceholder:"结束时间"}};return s(t,n)},f=n=>s({type:"select",elSelectProps:{multiple:!0}},n),q=`# 组件介绍

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

组件可双向绑定的参数如下：  
\`\`\`ts
const model = defineModel<Record<string, unknown>>({ // form 值
  default: {},
});
\`\`\`

组件通过defineExpose暴露内容与类型如下：
\`\`\`ts
defineExpose({
  forms, // 最终进行渲染的表单项列表
  validate, // 触发校验
  reset,  // 重置表单值
  formRef,  // ElForm的引用
  labelMap, // 从code到label的字典

  childRefs,  // form-item 的ref
  childRefMap,  // form-item 的ref的map

  ruleCollect,  // 所有ruleCollect
  addItemRule,  // 增加rule
  rmItemRule  // 移除rule
});
\`\`\`

childRefs和childRefMap中item实例通过defineExpose暴露内容与类型如下：  

\`\`\`ts
defineExpose({
  formItemRef, // el-form-item的ref
  typeItemRef,  // 具体子组件的ref
  clearValidate,  // 清除验证
  mergedProps // 合并后的props
});
\`\`\`


# 类型说明

\`\`\`ts
export type ElFormInsType = InstanceType<typeof ElForm>;

export type VjFormItemAttach = {  // 父组件向子组件注入的附加参数
  index: number; // 在同一层级的序号
  forms: VjFormItemProps[]; // 同一层级整个form的表单项配置
  labelMap: Record<string, string>; // 表单统一计算label字典传入表单项
  model: Record<string, unknown>; // 给子组件接收的回调函数传参
  rootModel: Record<string, unknown>; // 为split等多级表单场景统一收集model数据透传
  addItemRule: (key: string, rule: VjFormItemProps) => FormRules; // 允许子组件异步增加规则
  rmItemRule: (key: string) => FormRules; // 子组件异步移除规则
  addSubForm: (key: string, form: ElFormInsType) => Record<string, ElFormInsType>; // 子组件增加子表单，用于校验
  rmSubForm: (key: string) => Record<string, ElFormInsType>; // 子组件注销子表单，用于校验
  slots?: Slots;  // 透传slots
  disabled?: boolean; // 传入disabled结果
};

export type VjFormItemBase = { // 用户输入的基准参数
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

  noLabel?: boolean; // 隐藏label

  spanPre?: number; // 前缀尺寸
  skPre?: string; // 前缀插槽
  spanPost?: number;  // 后缀尺寸
  skPost?: string;  // 后缀插槽
  skLabel?: string; // label插槽

  colspan?: number; // 跨列
  rowspan?: number; // 跨行

  [x: string]: unknown;
};

export type VjfEmptyProps = VjFormItemBase & { // 空格
  type: "empty";
};

export type VjfRepeatProps = VjFormItemBase & { // 循环生成
  type: "repeat";
  repeatItems?: VjFormItemProps[] | ((props: VjfRepeatProps, model: Record<string, unknown>) => VjFormItemProps[]); // 循环项
};

export type VjfCustomProps = VjFormItemBase & { // 自定义
  type: "custom";
  skDefault?: string; // default插槽
  formatter?: (value: unknown, item: VjFormItemProps, model: Record<string, unknown>) => string; // 非插槽场景下对值进行格式化
  className?: string;  // 非插槽场景附加css样式类
};

export type VjFormItemReg = VjFormItemBase & { // 自注册
  type: string;
  regProps?: Record<string, unknown>;
  regEmit?: Record<string, Function>;
};

export type VjFormItemProps = VjFormItemBase
  | VjfEmptyProps
  | VjfRepeatProps
  | VjfCustomProps
  | VjFormItemReg
  | VjfInputProps
  | VjfNumberProps
  | VjfSelectProps
  | VjfSubProps
  | VjfDateProps
  | VjfRadioProps
  | VjfCheckboxProps
  | VjfSwitchProps
  | VjfUploadProps
  | VjfCascaderProps
  | VjfTreeSelectProps
  | VjfMultiProps

export type VjFormItemPropsTotal = VjFormItemProps & VjFormItemAttach;

export type VjFormPropsAttach = {
  rootModel?: Record<string, unknown>;
};

export type VjFormProps = {
  col?: number; // 列数
  form?: VjFormItemProps[]; // 表单项数组
  elFormProps?: ElPropsType<typeof ElForm>;  // ElForm类型
  slots?: Slots; // 注入插槽
  loading?: boolean;  // 加载状态
  remerge?: (item: VjFormItemProps, index: number) => Partial<VjFormItemProps>; // 渲染前对生成的表单配置项数组再进行一次额外的merge处理
};

export type VjFormPropsTotal = VjFormProps & VjFormPropsAttach;

export type VjFormItemScopeAttach = {
  _FormModel: Record<string, unknown>;
  _ItemProps: Partial<VjFormItemPropsTotal> & Record<string, unknown>;
  _code: string;
  _index: number;
  _forms: VjFormItemProps[];
};

export type VjFormItemScope = VjFormItemScopeAttach & Record<string, unknown>;
\`\`\`

# 运行实例`,B=`这段实例列出了所有当前支持的子表单项

\`\`\`html
  <VjForm v-model="value1" v-bind="form1">
    <template #custom="scope">
      <div>custom{{ consoleScope(scope) }}</div>
    </template>
  </VjForm>
  <el-button type="primary" @click="trigger()">触发验证</el-button>
\`\`\`
\`\`\`ts
  const formRef = ref<InstanceType<typeof VjForm>>();

  const trigger = () => {
    console.log(formRef, value1);
    formRef.value?.validate();
  };

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

  let customScope: VjFormItemScope;
  const consoleScope = (scope: VjFormItemScope) => {
    console.log(scope)
    customScope = scope;
    customScope!._ItemProps!.addItemRule!('custom', {
      code: 'custom',
      rules: [
        {
          validator: () => {
            return false;
          }
        }
      ]
    });
  };

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
      },
      {
        label: '空',
        code: 'empty',
        type: 'empty'
      },
      {
        label: 'repeat',
        code: 'repeat',
        type: 'repeat',
        repeatItems: [
          {
            label: 'repeat',
            code: 'repeat',
            required: true
          }
        ],
        repeatTime: 3
      },
      {
        label: 'multi',
        code: 'multi',
        type: 'multi',
        multiItemConf: {
          label: 'multi-sub',
          code: 'multi-sub',
          required: true,
          noLabel: true
        }
      }
    ],
    col: 3
  });
\`\`\``,N=`这段实例用于展示布局效果与remerge功能

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
\`\`\``,J=I({__name:"index",setup(n){const t=p(),y=()=>{console.log(t,c),t.value?.validate()},o=[{label:"option1",value:1},{label:"option2",value:2}];let d;const V=l=>{console.log(l),d=l,d._ItemProps.addItemRule("custom",{code:"custom",rules:[{validator:()=>!1}]})},c=p({}),j=p({form:[{label:"文本",code:"text",required:!0},{label:"数字",code:"number",type:"number",elNumberProps:{min:3,max:15},rules:[{min:5,max:10}]},{label:"选择",code:"select",type:"select",options:o},f({label:"本地多选",code:"multi-select-local",options:o}),f({label:"远程多选",code:"multi-select-remote",remote:!0,remoteInitQuery:!0,remoteFunc:async()=>(console.log("search"),o),remoteInitOptions:async()=>o}),{label:"子表",code:"sub",type:"sub",subFormConf:{form:[{label:"子表1",code:"sub1",required:!0},{label:"子表2",code:"sub2"}]}},C({label:"文本域",code:"textarea"}),{label:"日期",code:"date",type:"date"},{label:"时间",code:"time",type:"time"},O({label:"日期时间",code:"datetime"}),D({label:"日期范围",code:"daterange"}),M({label:"日期时间范围",code:"datetimerange"}),{label:"单选",code:"radio",type:"radio",options:o},{label:"单选按钮",code:"radio-button",type:"radio",button:!0,options:o},{label:"复选",code:"checkbox",type:"checkbox",options:o},{label:"复选按钮",code:"checkbox-button",type:"checkbox",button:!0,options:o},{label:"开关",code:"switch",type:"switch"},{label:"上传",code:"upload",type:"upload"},{label:"级联",code:"cascader",type:"cascader",options:o},{label:"树选择",code:"treeselect",type:"treeselect",options:o},{label:"自定义",code:"custom",type:"custom",skDefault:"custom"},{label:"空",code:"empty",type:"empty"},{label:"repeat",code:"repeat",type:"repeat",repeatItems:[{label:"repeat",code:"repeat",required:!0}],repeatTime:3},{label:"multi",code:"multi",type:"multi",multiItemConf:{label:"multi-sub",code:"multi-sub",required:!0,noLabel:!0}}],col:3}),g=p(T(20).map((l,e)=>({label:`${e}`,code:`${e}`}))),F=(l,e)=>e===0?{colspan:3,rowspan:3}:e===2?{colspan:3,rowspan:2}:e===13?{colspan:3,rowspan:3}:{};return(l,e)=>{const u=E,P=w;return h(),x(k,null,[r(u,{mdStr:m(q)},null,8,["mdStr"]),r(m(b),R({ref_key:"formRef",ref:t,modelValue:c.value,"onUpdate:modelValue":e[0]||(e[0]=a=>c.value=a)},j.value),{custom:i(a=>[v("div",null,"custom"+S(V(a)),1)]),_:1},16,["modelValue"]),r(P,{type:"primary",onClick:e[1]||(e[1]=a=>y())},{default:i(()=>e[2]||(e[2]=[_("触发验证",-1)])),_:1,__:[2]}),r(u,{mdStr:m(B)},null,8,["mdStr"]),r(m(b),{form:g.value,col:5,remerge:F},null,8,["form"]),r(u,{mdStr:m(N)},null,8,["mdStr"])],64)}}});export{J as default};
