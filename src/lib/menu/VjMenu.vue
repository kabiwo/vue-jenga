<template>
  <el-scrollbar>
    <el-menu ref="elMenuRef" v-bind="props.elProps || {}" v-on="props.elEmits || {}" class="">
      <component v-for="(item, index) in (props.menus || [])" :key="index" :is="menuItemRender(item)" />
    </el-menu>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { ElIcon, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElMenu, ElScrollbar } from "element-plus";
import { h, ref, type VNode } from "vue";
import { type VjMenuProps, type VjMenuItem } from ".";
import { _VjOnEmitsFromEmits } from "../utils";

const props = defineProps<VjMenuProps>();

const elMenuRef = ref<InstanceType<typeof ElMenu>>();

const getTitle = (item: VjMenuItem): VNode[] => {
  let arr: VNode[] = [h("span", null, item.name)];
  if (item.icon) {
    arr.unshift(
      h(ElIcon,
        {
          class: (() => {
            if (item.icon?.startsWith("i-")) {
              return item.icon;
            } else {
              return undefined;
            }
          })(),
        }
      ),
    );
  }
  return arr;
};

const menuItemRender = (item: VjMenuItem): VNode => {
  if (item.children) {
    if (item.group) {
      return h(ElMenuItemGroup,
        {
          title: item.name,
        },
        () => item.children!.map((v) => menuItemRender(v)),
      );
    }
    return h(ElSubMenu,
      {
        index: item.path,
        class: "",
        ...(item.elSubProps || {})
      },
      {
        default: () => item.children!.map((v) => menuItemRender(v)),
        title: () => getTitle(item),
      },
    );
  }
  return h(ElMenuItem,
    {
      index: item.path,
      title: item.name,
      class: "",
      ...(item.elItemProps || {}),
      ..._VjOnEmitsFromEmits(item.elItemEmits || {})
    },
    () => getTitle(item),
  );
};

defineExpose({
  elMenuRef
})
</script>