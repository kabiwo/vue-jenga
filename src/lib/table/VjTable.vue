<template>
  <div ref="tableBoxRef"
    class="vj-table-box vj-max-h-full vj-w-full vj-flex vj-shrink-1 vj-grow vj-flex-col vj-gap-1 vj-overflow-auto">
    <el-table ref="elTableRef" size="large" table-layout="fixed" :data="props.data" :height="maxHeight" stripe
      v-bind="props.elProps" v-on="props.elEmit || {}">
      <TableItem v-for="(item, index) in props.cloumns" :key="index" :pIndex :pSize v-bind="item" :slots>
      </TableItem>
      <template v-if="props.skAppend && slots[props.skAppend]" #append="scope">
        <component :is="getComponent(slots[props.skAppend]!, scope)" />
      </template>
      <template v-if="props.skEmpty && slots[props.skEmpty]" #empty="scope">
        <component :is="getComponent(slots[props.skEmpty]!, scope)" />
      </template>
      <template v-else #empty>
        <el-empty />
      </template>
    </el-table>
    <div ref="pagiBoxRef" v-if="props.total">
      <el-pagination v-model:current-page="pIndex" v-model:page-size="pSize" hide-on-single-page :total="props.total"
        layout="->, total, sizes, prev, pager, next, jumper" v-bind="props.elPagiProps" v-on="props.elPagiEmit || {}">
        <template v-if="props.skPagiDefault && slots[props.skPagiDefault]" #default="scope">
          <component :is="getComponent(slots[props.skPagiDefault]!, scope)" />
        </template>
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElTable, ElPagination } from 'element-plus'
import {
  ref,
  onMounted,
  computed,
  useSlots,
  type Slot,
  defineComponent,
} from "vue";
import { type VjTableProps } from "./index";
import TableItem from "./TableItem.vue";
import { useVjConfStore } from '../utils';
import { useResizeObserver } from '@vueuse/core';

const pIndex = defineModel<number>("pIndex", {
  default: 1,
});

const pSize = defineModel<number>("pSize", {
  default: 20,
});

const props = defineProps<VjTableProps>();

const conf = useVjConfStore();

const tableBoxRef = ref<Element>();
const pagiBoxRef = ref<Element>();
const elTableRef = ref<InstanceType<typeof ElTable>>();
const elPagiRef = ref<InstanceType<typeof ElPagination>>();

defineExpose({
  elTableRef,
  elPagiRef,
});

const maxHeight = ref<number>();

const getComponent = (slot: Slot, scope: unknown) => {
  return defineComponent(() => () => slot(scope));
};

const s = useSlots();
const slots = computed<Record<string, Slot>>(() => {
  let keys = Object.keys(s);
  let obj: Record<string | number, Slot> = {};
  keys.forEach((key) => {
    obj[key] = s[key]!;
  });
  return Object.assign({}, obj, props.slots || {});
});

onMounted(() => {
  useResizeObserver(tableBoxRef.value!.parentElement!, (entries) => {
    if (!tableBoxRef.value) {
      return;
    }
    let pagiEl = tableBoxRef.value?.querySelector(".el-pagination");
    let height = entries[0].contentRect.height - (pagiEl ? (pagiEl.clientHeight + conf.rootFont / 4) : 0);
    maxHeight.value = height;
  });
});
</script>