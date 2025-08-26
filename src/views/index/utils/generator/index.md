# 组件介绍

这里搜集了一些数据转换与生成的方法，目前有：  

VjOptionsFromEnum： 根据Enum类型和字典生成对应的VjOptions选项

_VjOnEmitsFromEmits： 内部方法，用于给省略了on的事件绑定参数在渲染函数中增加上on

# 使用方法

直接调用

# 类型说明

```ts
const VjOptionsFromEnum: <K>(E: K, map: Record<string, string>) => VjOptions<K>

const _VjOnEmitsFromEmits: <T extends Record<string, unknown>>(source: T) => T
```
