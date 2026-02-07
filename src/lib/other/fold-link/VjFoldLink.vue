<template>
  <el-space class="vj-whitespace-nowrap">
    <component v-if="props.skDefault && slots[props.skDefault]"
            :is="VjSlotRender(slots[props.skDefault]!, Object.assign({links, normalList, moreList}))" />
    <el-link type="primary" :underline="false" v-for="(item, index) in normalList" :key="index"
      @click="item.func && !item.loading && item.func(props.tableScope || props._scope as ElTableScope, item)" v-bind="item.elLinkProps || {}">{{
        item.label }}</el-link>
    <el-dropdown placement="bottom-start" v-if="moreList.length > 1">
      <el-link type="primary" :underline="false" class="lh-2.3">更多<el-icon class="i-ep-arrow-down" /></el-link>
      <template #dropdown>
        <el-dropdown-menu v-if="props.skMore && slots[props.skMore]">
          <component :is="VjSlotRender(slots[props.skMore]!, Object.assign({links, normalList, moreList}))" />
        </el-dropdown-menu>
        <el-dropdown-menu v-else class="vj-max-h-30 vj-overflow-auto">
          <el-dropdown-item v-for="(item, index) in moreList" :key="index" @click="
            item.func && !item.loading && item.func(props.tableScope || props._scope as ElTableScope, item)
            ">
            <el-link type="primary" :underline="false" v-bind="item.elLinkProps || {}">{{ item.label }}</el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
</template>
<script setup lang="ts">
import { ElSpace, ElDropdown, ElLink, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { computed, useAttrs, useSlots, type Slots } from "vue";
import { type VjFoldLinkProps } from ".";
import { assign, mapKeys } from "radash";
import { VjSlotRender } from "../../utils";
import type { ElTableScope } from '../../table';

const p = defineProps<VjFoldLinkProps>();
const attrs = useAttrs();
const props = computed(() => {return Object.assign({}, p, attrs)});

const s: Slots = useSlots();
const slots = computed<Slots>(() => {
  return assign(mapKeys(s, key => key), p.slots || {});
});

const links = computed(() => {
  return (p.links || []).filter((item) => {
    if (item.hide) {
      if (typeof item.hide === "function") {
        return !item.hide(item, p.tableScope);
      } else {
        return !item.hide;
      }
    }
    return true;
  });
});

const normalList = computed(() => {
  let arr = links.value;
  let num = p.num && p.num > 0 ? p.num : 2;
  if (arr.length > num) {
    return arr.slice(0, num - 1);
  }
  return arr;
});
const moreList = computed(() => {
  let arr = links.value;
  let num = p.num && p.num > 0 ? p.num : 2;
  if (arr.length > num) {
    return arr.slice(num - 1);
  }
  return [];
});

defineExpose({
  links,
  normalList,
  moreList
});
</script>