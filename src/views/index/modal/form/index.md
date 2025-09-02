# 组件介绍

VjModalForm是在VjModal和VjForm基础上针对弹窗表单场景进行的二次封装

# 使用方法

在模板中使用VjModalForm，传入form配置并进行引用，调用ref.show方法展示弹窗

# 外部交互

通过defineExpose暴露如下属性

```ts
defineExpose({
  form: formRef,  // VjForm实例
  modal: modalRef,  // VjModal实例
  show, // 显示函数
  setData,  // 设置表单数据
  getData,  // 获取表单数据
  validate, // 触发表单验证
});
```

# 类型说明

```ts

export type VjModalFormProps = VjModalProps & {
  formProps?: VjFormProps;  // VjForm配置

  skPre?: string; // 表单前pre插槽
  skPost?: string;  // 表单后post插槽
};

```

# 运行实例