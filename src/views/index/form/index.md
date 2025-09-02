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

组件通过defineExpose暴露内容与类型如下：
```ts
defineExpose({
  forms, // 最终进行渲染的表单项列表
  validate, // 触发校验
  reset,  // 重置表单值
  formRef,  // ElForm的引用
  labelMap  // 从code到label的字典
})
```

# 类型说明

```ts

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

```

# 运行实例