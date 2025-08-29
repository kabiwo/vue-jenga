# 组件介绍

这里搜集了一些数据转换与生成的方法，目前有：  

VjOptionsFromEnum： 根据Enum类型和字典生成对应的VjOptions选项

_VjOnEmitsFromEmits： 内部方法，用于给省略了on的事件绑定参数在渲染函数中增加上on

VjObjDeepMerge: 深度合并对象，返回新对象，不会对原对象进行操作

# 使用方法

直接调用

# 类型说明

```ts
const VjOptionsFromEnum: <K>(E: K, map: Record<string, string>) => VjOptions<K>

const _VjOnEmitsFromEmits: <T extends Record<string, unknown>>(source: T) => T

const VjObjDeepMerge: (...args: Record<string, unknown>[]) => Record<string, unknown>
```
