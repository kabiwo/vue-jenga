# 组件介绍

折叠链接组件VjFoldLink，是对ElLink组件的二次封装，可以在表格操作栏等空间有限的场景提供可部分收起的操作链接  

提供类型VjFoldLinkProps、VjFoldLinkItem  

支持default和more插槽  

# 使用方法

在模板中使用VjFoldLink，绑定链接配置数组/保留数量/表格参数等配置，也可利用VjConf全局注册，在VjTable或VjForm等可注册场景进行使用  

详见运行实例

```html
  <vj-fold-link :links="links" :num="3" skMore="more">
    <template #more="scope">
      <div>more</div>
    </template>
  </vj-fold-link>
```

# 外部交互

组件通过defineExpose暴露内容与类型如下：
```ts
const links: ComputedRef<VjFoldLinkItem[]>;
const normalList: ComputedRef<VjFoldLinkItem[]>;
const moreList: ComputedRef<VjFoldLinkItem[]>

defineExpose({
  links,
  normalList,
  moreList
});
```

# 类型说明

```ts
export type VjFoldLinkItem = {
  label: string;  //链接名
  func?: (scope: ElTableScope | undefined, item: VjFoldLinkItem) => void; // 点击函数
  hide?: boolean | ((item: VjFoldLinkItem, scope?: ElTableScope) => boolean); // 是否隐藏
  loading?: boolean;  // loading状态，阻塞点击函数
  elLinkProps?: ElPropsType<typeof ElLink> | ((item: VjFoldLinkItem, scope?: ElTableScope) => ElPropsType<typeof ElLink>); // ElLink类型
};

export type VjFoldLinkProps = {
  tableScope?: ElTableScope;  // 传入ElTableScope
  num?: number; // 显示几个（包括“更多”）
  links?: VjFoldLinkItem[]; // 链接配置
  slots?: Slots; // 注入插槽  
  skDefault?: string; // default 插槽key
  skMore?: string;  // more 插槽key
};

```

# 运行实例

可参看对应table组件展示实例  