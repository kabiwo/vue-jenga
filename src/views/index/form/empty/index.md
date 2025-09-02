# 组件介绍

表单布局中的空白格子项，可以提供一处空白

# 使用方法

在配置表单项时，以“empty”作为type参数传入，参数类型如下：

```ts
export type VjfEmptyProps = VjFormItemBase & { // 空格
  type: "empty";
};
```
