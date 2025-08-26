# 组件介绍

VjConfirm是对ElMessageBox进行的二次封装，主要解决繁琐的配置以及promise处理，应对用户确认场景  

# 使用方法

直接传参使用，参看类型说明，返回值true表示点击确认，false取消

# 类型说明

```ts
const VjConfirm: (
  title: string,  // 标题
  message: string | VNode | (() => VNode),  // 内容，字符串/渲染函数/插槽
  callback: () => Promise<boolean>, // 确认回调
  options?: ElMessageBoxOptions,  // 原始组件选项暴露
) => Promise<boolean>  // 返回true为确认，false为取消
```

# 运行实例