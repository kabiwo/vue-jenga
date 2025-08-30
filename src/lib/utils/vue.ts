import { defineComponent, type Slot } from "vue";

export const VjSlotRender = (slot: Slot, scope?: unknown) => {
  return defineComponent(() => () => slot(scope));
};