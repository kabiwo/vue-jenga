<template>
  <template v-if="(props as VjTableItemParent).children">
    <el-table-column :label :width="width" :min-width="minWidth" :fixed="props.fixed" v-bind="props.elProps">
      <template v-if="props.skDefault && slots[props.skDefault]" #default="scope">
        <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
      </template>
      <template v-else #default>
        <TableItem v-for="(item, index) of (props as VjTableItemParent).children" :key="index" v-bind="item"
          :slots="props.slots">
        </TableItem>
      </template>
      <template v-if="props.skHeader && slots[props.skHeader]" #header="scope">
        <component :is="VjSlotRender(slots[props.skHeader]!, scope)" />
      </template>
    </el-table-column>
  </template>
  <template v-else>
    <template v-if="(props as VjTableItemIndex).type === 'index'">
      <el-table-column :label :width="width" :min-width="minWidth" :prop="computedProp" type="index" :index="getIndex"
        :fixed="props.fixed" v-bind="props.elProps"></el-table-column>
    </template>
    <template v-else-if="(props as VjTableItemExpand).type === 'expand'">
      <el-table-column :label :width="width" :min-width="minWidth" :prop="computedProp" type="expand"
        :fixed="props.fixed" v-bind="props.elProps">
        <template #default="scope">
          <template v-if="props.skDefault && slots[props.skDefault]">
            <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
          </template>
        </template>
      </el-table-column>
    </template>
    <template v-else-if="(props as VjTableItemSelect).type === 'select'">
      <el-table-column :label :width="width" :min-width="minWidth" :prop="computedProp" type="selection"
        :fixed="props.fixed" v-bind="props.elProps">
        <template #default="scope">
          <template v-if="props.skDefault && slots[props.skDefault]">
            <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
          </template>
        </template>
      </el-table-column>
    </template>
    <template v-else>
      <el-table-column :label :width="width" :min-width="minWidth" :prop="computedProp" :fixed="props.fixed"
        v-bind="props.elProps">
        <template #default="scope" v-if="(props as any).type || props.skDefault">
          <template v-if="(props as VjTableItemMap).type === 'map'">
            <template v-if="(props as VjTableItemMap).isArray">
              <div class="vj-table-item-map-box" :class="`prop-${computedProp}`">
                <div class="vj-table-item-map" v-for="(item, index) in scope.row[computedProp!]" :key="index">
                  {{ !!item ? (computedMap[item] || "") : "" }}
                </div>
              </div>
            </template>
            <div class="vj-table-item-map"> {{
              scope.row[computedProp!] !== undefined && scope.row[computedProp!] !== null ?
                (computedMap[scope.row[computedProp!]]
                  || "") : ""
            }}
            </div>
          </template>
          <template v-else>
            <template v-if="props.skDefault && slots[props.skDefault]">
              <component :is="VjSlotRender(slots[props.skDefault]!, scope)" />
            </template>
          </template>
        </template>
        <template v-else #default="scope">
          <div class="inline" :class="{ ' whitespace-nowrap text-ellipsis': props.ellipsis }" :title="getText(scope)">
            {{ getText(scope) }}
          </div>
        </template>
        <template #header="scope">
          <template v-if="props.skHeader && slots[props.skHeader]">
            <component :is="VjSlotRender(slots[props.skHeader]!, scope)" />
          </template>
        </template>
      </el-table-column>
    </template>
  </template>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ElTableColumn } from 'element-plus';
import {
  type VjTableItemParent,
  type VjTableConfigItem,
  type VjTableItemBase,
  type VjTableItemIndex,
  type VjTableItemMap,
  type VjTableItemExpand,
  type VjTableItemSelect,
  type ElTableScope,
} from "./";
import { VjSlotRender, useVjConfStore } from "../utils";

const props = defineProps<VjTableConfigItem>();

const conf = useVjConfStore();

const label = computed(() => {
  return props.label;
});

const slots = computed(() => {
  return props.slots || {};
});

const getIndex = (row: number): number => {
  return (props.pIndex! - 1) * props.pSize! + row + 1;
};

const computedMap = computed<Record<string | number | symbol, string>>(() => {
  let map = (props as VjTableItemMap).map;
  if (map) {
    if (typeof map === "function") {
      return (
        map as (...args: unknown[]) => Record<string | number | symbol, string>
      )(props);
    } else {
      return map;
    }
  } else {
    return {};
  }
});

const computedProp = computed<string | undefined>(() => {
  return (props as VjTableItemBase).prop;
});

const width = computed(() => {
  if (typeof props.width === "number" && conf.getConf().remEnable) {
    return props.width * conf.root10px;
  }
  return props.width;
});

const minWidth = computed(() => {
  if (conf.getConf().remEnable) {
    if (typeof props.minWidth === "number") {
      return props.minWidth * conf.root10px;
    }
    return props.minWidth || 10 * conf.root10px;
  }
  return props.minWidth;
});

const getText = (scope: ElTableScope): string => {
  let value = scope?.row[scope.column.property];
  if (props.formatter) {
    return props.formatter(scope, value) as string;
  }
  return value || value === 0 || value === false ? (value as string) : "-";
};
</script>