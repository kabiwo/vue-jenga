import type { VjOptions } from "./type";
import { camel } from 'radash'

export const VjOptionsFromEnum = <K>(
  E: K,
  map: Record<string, string>,
): VjOptions<K> => {
  const arr: VjOptions<K> = [];
  const set = new Set();
  for (const i in E) {
    const intI = parseInt(i);
    let target;
    if (isNaN(intI)) {
      target = E[i];
    } else {
      target = intI;
    }
    if (!set.has(target)) {
      set.add(target);
      arr.push({
        label: map[(target as string).toString()],
        value: target as K
      })
    }
  }
  return arr;
};

export const _VjOnEmitsFromEmits = <T extends Record<string, unknown>>(source: T): T => {
  let obj: Record<string, unknown> = {};
  Object.keys(source).forEach(v => {
    obj[camel('on-' + v)] = source[v];
  });
  return obj as T;
}