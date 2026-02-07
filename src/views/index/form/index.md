# 组件介绍

VjForm组件是将常用的表单元素预配置，对ElForm相关组件进行二次封装，实现了通过配置的表单动态渲染

并且预制了处理函数以快速获取特定配置，同时预处理了表单校验与错误提示以及排版布局，通过配置透传，允许使用者调整组件行为表现  


子组件的类型会随着开发经验的积累进行增补

# 使用方法

从vue-jenga包中引入VjForm与所用类型，填写参数并在模板中使用

```html
<VjForm :form :col="5" />
```

```ts
import { VjForm, type VjFormItemProps, type VjFormProps } from 'vue-jenga/form'
```

# 外部交互

组件可双向绑定的参数如下：  
```ts
const model = defineModel<Record<string, unknown>>({ // form 值
  default: {},
});
```

组件通过defineExpose暴露内容与类型如下：
```ts
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
```

childRefs和childRefMap中item实例通过defineExpose暴露内容与类型如下：  

```ts
defineExpose({
  formItemRef, // el-form-item的ref
  typeItemRef,  // 具体子组件的ref
  clearValidate,  // 清除验证
  mergedProps // 合并后的props
});
```


# 类型说明

```ts
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
```

# 运行实例