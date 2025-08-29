import { VjObjDeepMerge } from "../utils";
import type { VjfDateProps } from "./items/date";
import type { VjfInputProps } from "./items/input";

export const VjfcTextarea = (conf: Omit<VjfInputProps, 'type'>): VjfInputProps => {
  let pre: Partial<VjfInputProps> = {
    elInputProps: {
      type: 'textarea'
    }
  };
  return VjObjDeepMerge(pre, conf) as VjfInputProps;
};

export const VjfcDateRange = (conf: Omit<VjfDateProps, 'type'>): VjfDateProps => {
  let pre: Partial<VjfDateProps> = {
    type: 'date',
    elDateProps: {
      type: 'daterange',
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  };
  return VjObjDeepMerge(pre, conf) as VjfDateProps;
};

export const VjfcDatetime = (conf: Omit<VjfDateProps, 'type'>): VjfDateProps => {
  let pre: Partial<VjfDateProps> = {
    type: 'date',
    elDateProps: {
      type: 'datetime'
    }
  };
  return VjObjDeepMerge(pre, conf) as VjfDateProps;
};

export const VjfcDatetimeRange = (conf: Omit<VjfDateProps, 'type'>): VjfDateProps => {
  let pre: Partial<VjfDateProps> = {
    type: 'date',
    elDateProps: {
      type: 'datetimerange',
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  };
  return VjObjDeepMerge(pre, conf) as VjfDateProps;
};
