type EventMap<T extends (event: any, ...args: unknown[]) => void> = Partial<Record<Parameters<T>[0], (...args: unknown[]) => unknown>>;
type EventFunc<T extends abstract new (...args: unknown[]) => any> = InstanceType<T>["$emit"];
export type ElEventType<T extends abstract new (...args: unknown[]) => any> = EventMap<EventFunc<T>>;

export type ElModelType<T extends abstract new (...args: unknown[]) => any> = InstanceType<T>["$props"]["modelValue"];

export type ElPropsType<T extends abstract new (...args: unknown[]) => any> = InstanceType<T>["$props"];

export type VjOptionItem<T = unknown, K = unknown> = {
  key?: string | number | symbol;
  label: string;
  value: T;
  disabled?: boolean;
  children?: VjOptionItem<T, K>[];
  isLeaf?: boolean;
  source?: K;
  [property: string]: unknown;
};
export type VjOptions<T = unknown, K = unknown> = VjOptionItem<T, K>[];
export type VjOptionMap<
  T extends string | number | symbol,
  K = unknown,
> = Record<T, VjOptionItem<K>>
