# 组件介绍

表格组件VjTable，是对ElTable组件整合了ElPagination组件的二次封装，可以根据特定类型的对象数组渲染出表格  

表格在具有高度限制（固定高度/弹性高度）的容器内可自适应铺满  

提供类型VjTableProps、VjTableConfigItem、ElTableScope

# 使用方法

在模板中使用VjTable，绑定表格数据/总数/表格列等配置，双向绑定分页数据，在标签内通过插槽传入配置  

详见运行实例

```html
  <vj-table :data="data" :total v-model:pIndex="pIndex" v-model:pSize="pSize" :cloumns v-bind="tableProps">
    <template #expendTemplate="scope">
      <div>expend{{ getScope(scope) }}</div>
    </template>
    <template #customTemplate="scope">
      <div>custom{{ getScope(scope) }}</div>
    </template>
  </vj-table>
```

# 外部交互

组件可双向绑定的参数如下：

```ts
const pIndex = defineModel<number>("pIndex", { // 分页页码
  default: 1,
});

const pSize = defineModel<number>("pSize", {  // 分页步长
  default: 20,
});
```

组件通过defineExpose暴露内容与类型如下：
```ts
const elTableRef = ref<InstanceType<typeof ElTable>>();
const elPagiRef = ref<InstanceType<typeof ElPagination>>();

defineExpose({
  elTableRef,
  elPagiRef,
});
```

# 类型说明

```ts

export type VjTableItemBase = {
  prop?: string;  // 取值字段
  label: string;  // 标题
  elProps?: InstanceType<typeof ElTableColumn>["$props"]; // ElTableColumn的参数

  skDefault?: string; // default插槽key，配置此项等同于单元格自定义
  skHeader?: string;  // header插槽key
  
  width?: string | number; // 宽度，全局rem开启后，数字单位会自动计算，1单位代表基准屏幕宽度下的10px
  minWidth?: string | number; // 最小宽度，同width，默认值是基准屏幕宽度下100px
  formatter?: ( // 格式化函数，对字段值做二次处理
    scope: ElTableScope,
    value: unknown,
  ) => unknown;
  ellipsis?: boolean; // 开启后超长会省略
  fixed?: 'left' | 'right' | boolean; // 固定列
};

export type VjTableItemIndex = VjTableItemBase & { // 索引单元格
  type?: "index"; 
};

export type VjTableItemExpand = VjTableItemBase & { // 扩展单元格
  type?: "expand";
};

export type VjTableItemSelect = VjTableItemBase & { // 复选单元格
  type?: "select";
};

export type VjTableItemMap = VjTableItemBase & { // 值映射单元格
  type?: "map";
  map?: // 映射字典
    | Record<string | number | symbol, string>
    | ((item: VjTableItemMap) => Record<string | number | symbol, string>);
  isArray?: boolean;  // 数组映射
};

export type VjTableItemChild =
  | VjTableItemBase
  | VjTableItemMap
  | VjTableItemExpand
  | VjTableItemSelect
  | VjTableItemIndex;

export type VjTableItemParent = Partial<Omit<VjTableItemBase, "prop">> & {
  children?: VjTableConfigItem[];
};

export type VjTableConfigItem = VjTableItemParent | VjTableItemChild; // 支持单元格嵌套

export type VjTableProps<T = unknown> = { // 表格参数
  data?: T[]; // 数据
  total?: number; // 总数
  cloumns?: VjTableConfigItem[];  // 单元格配置
  elProps?: ElPropsType<typeof ElTable>;  // ElTable参数
  elEmit?: ElEventType<typeof ElTable>; // ElTable事件
  skDefault?: string; // default插槽key
  skAppend?: string;  // append插槽key
  skEmpty?: string; // empty插槽key
  slots?: Slots;  // 可全局透传vue插槽

  elPagiProps?: ElPropsType<typeof ElPagination>; // ElPagination参数
  elPagiEmit?: Partial<Record<keyof PaginationEmits, (...args: unknown[]) => unknown>>; // ElPagination事件
  skPagiDefault?: string; // ElPagination的default插槽key
};

export type ElTableScope = { row: Record<string, unknown>; column: TableColumnCtx; $index: number };  // 一些ElTable事件的参数类型

```

# 运行实例