# 组件介绍

对ElDialog的二次封装，减少了配置项

# 使用方法

在模板中使用VjModal，并进行引用，调用ref.show方法展示弹窗

# 外部交互

暴露了如下实例属性

```ts

defineExpose({
  dialog: dialogRef,  // ElDialog实例类型
  show, // 显示弹窗方法
  dialogShow  // 弹窗显示状态
});

```

# 类型说明

```ts

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

```

# 运行实例