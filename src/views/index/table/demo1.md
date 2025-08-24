```html
  <div class="vj-h-50"> <!-- 有高度限制的外部容器 -->
    <vj-table :data="data" :total v-model:pIndex="pIndex" v-model:pSize="pSize" :cloumns v-bind="tableProps">
      <template #expendTemplate="scope">  <!-- 提供给expend用的插槽 -->
        <div>expend{{ getScope(scope) }}</div>
      </template>
      <template #customTemplate="scope">  <!-- 提供给custom用的插槽 -->
        <div>custom{{ getScope(scope) }}</div>
      </template>
    </vj-table>
  </div>
```
```ts
import { onMounted, ref } from 'vue';
import {list} from 'radash'
import { type VjTableConfigItem, type VjTableProps } from 'vue-jenga/table'

const data = ref<Record<string, unknown>[]>([]); // 列表数据
const total = ref(0); // 总数
const pIndex = ref(1);  // 页码
const pSize = ref(20);  // 步长

const cloumns = ref<VjTableConfigItem[]>([  // 列定义
  {
    label: '',
    type: 'select', // 复选表格列
    width: 10,  // 宽度，开启rem后1单位等于标准宽度中的10px，其余场景不作处理
    fixed: true // 固定在左侧
  },
  {
    label: '序号',
    type: 'index',  // 索引表格列，根据页码等自动计算
    width: 10,
    fixed: true
  },
  {
    label: '展开',
    type: 'expand', // 扩展表格列
    width: 10,
    skDefault: 'expendTemplate',  // 注册插槽模板名
    fixed: true
  },
  {
    label: '常规列',
    children: list(0, 19, (i) => {  // 自动计算多级表头
      let index = `attr${i + 1}`;
      let obj: VjTableConfigItem = {
        label: index,
        prop: index,  // 取值字段
        width: 20,
        formatter(scope, value) { // formatter对取值二次加工
          if (i % 2 === 1) {
            return value + '-format';
          }
          return value;
        },
      };
      return obj;
    })
  },
  {
    label: 'map',
    type: 'map',  // map映射单元格
    prop: 'map',
    map: {a: '1', b: '2', c: '3'},  // 映射字典
    isArray: true,  // 开启数组映射，此时单元格内拥有vj-table-item-map-box样式类的元素会有为prop-${prop}的样式标记
    fixed: 'right', // 靠右固定
  },
  {
    label: '自定义',
    prop: 'custom',
    skDefault: 'customTemplate',  // 通过default插槽开启自定义模式
    fixed: 'right',
  }
]);

const getData = (...args: unknown[]) => {
  total.value = 5000;
  data.value = list<Record<string, unknown>>(0, 19, (i) => {
    let obj: Record<string, number | string[]> = {};
    list<number>(0, 19, i + 1).forEach((v, j) => {
      obj[`attr${j + 1}`] = v;
    });
    obj.map = ['a', 'b', 'c'];
    return obj;
  });
}

const tableProps = ref<VjTableProps>({
  elPagiEmit: {
    change: getData // 绑定pagination的change事件
  }
});

const getScope = (scope: ElTableScope) => {
  console.log(scope);
}

onMounted(() => {
  getData(); //初始化取值
});
```