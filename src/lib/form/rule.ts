import type { FormItemRule } from "element-plus";
import { assign, isArray, isNumber, isString, template } from "radash";
import type { VjFormItemProps } from ".";
import type { ComputedRef, ModelRef } from "vue";

export const ruleTypeCheckMsg = {
  "string": "不是字符串",
  "method": "不是方法或函数",
  "array": "不是数组",
  "object": "不是对象",
  "number": "不是数字",
  "date": "不是日期",
  "boolean": "不是布尔值",
  "integer": "不是整数",
  "float": "不是浮点数",
  "regexp": "不是合格的正则表达式",
  "email": "不是合格的邮箱",
  "url": "不是合格的URL",
  "hex": "不是合格的十六进制"
};

export const ruleNumCheckMsg = {
  string: {
    "range": "必须在{{1}}到{{2}}个字符之间",
    "len": "只能是{{1}}个字符",
    "min": "必须有至少{{1}}个字符",
    "max": "最多只能有{{1}}个字符"
  },
  number: {
    "len": "必须等于{{1}}",
    "min": "不得小于{{1}}",
    "max": "不得大于{{1}}",
    "range": "必须在{{1}}到{{2}}之间"
  },
  array: {
    "len": "必须有{{1}}个元素",
    "min": "不得少于{{1}}个元素",
    "max": "不得多于{{1}}个元素",
    "range": "必须在{{1}}到{{2}}个元素之间"
  },
};

export const ruleDefaultMsg = {
  "type": "类型不符",
  "required": "此项必填",
  "pattern": "格式不符",
  "min": "超出下限",
  "max": "超出上限",
  "len": "特定值不符",
  "whitespace": "空格无效",
  "range": "取值范围不符"
};

type ValueType = "array" | "string" | "number" | "other";

const checkValueType = (model: ModelRef<Record<string, unknown>, string, Record<string, unknown>>, code: string, value?: unknown): ValueType => {
  let v = value || value === 0 ? value : model.value[code];
  if (isArray(v)) { return 'array'; }
  if (isString(v)) { return 'string'; }
  if (isNumber(v)) { return 'number'; }
  return 'other';
};

const checkNum = (
  rule: string,
  value: number,
  num: { min?: number; max?: number; len?: number },
): boolean => {
  switch (rule) {
    case 'range': return value >= num.min! && value <= num.max!;
    case 'min': return value >= num.min!;
    case 'max': return value <= num.max!;
    default: return value === num.len;
  }
};

const splitRules = (item: FormItemRule, code: string, labelMap: ComputedRef<Record<string, string>>, model: ModelRef<Record<string, unknown>, string, Record<string, unknown>>): FormItemRule[] => {
  if (item.message) { return [item]; }
  let arr: FormItemRule[] = [];
  const addRule = (key: string, getMsg?: () => string, patch?: { obj?: object; arr?: unknown[] }) => {
    let obj: FormItemRule = {
      message: (c?: string) => {
        let param: unknown[] = [labelMap.value[code]];
        if (patch && patch.arr) {
          param = [labelMap.value[code], ...patch.arr];
        } else {
          param = [labelMap.value[code], item[key as keyof FormItemRule]];
        }
        return template((getMsg ? getMsg() : "") || ruleDefaultMsg[key as keyof typeof ruleDefaultMsg], param);
      },
    };
    if (patch && patch.obj) {
      assign(obj, patch.obj);
    } else {
      obj[key as keyof FormItemRule] = (item as FormItemRule)[key as keyof FormItemRule] as never;
    }
    if (["range", "min", "max", "len"].includes(key)) {
      obj.validator = (rule, value) => {
        let type = checkValueType(model, code, value);
        let v;
        switch (type) {
          case 'array': v = value.length; break;
          case 'number': v = value; break;
          case 'string': v = value.length; break;
          default: return true; // 不检查
        }
        let result = checkNum(key, v, {
          min: item.min,
          max: item.max,
          len: item.len,
        });
        return result;
      };
    } else {
      (obj as unknown as Record<string, unknown>)[key] = item[key as keyof FormItemRule];
    }
    arr.push(obj);
  };
  const has = (k: string) => {
    return item[k as keyof FormItemRule] || item[k as keyof FormItemRule] === 0;
  };
  ["required", "pattern", "whitespace"].forEach((v) => {
    has(v) && addRule(v);
  });
  has("type") && addRule("type", () => ruleTypeCheckMsg[item.type! as keyof typeof ruleTypeCheckMsg]);
  const getNumMsg = (v: string) => {
    let value = checkValueType(model, code);
    let target = ruleNumCheckMsg[value as keyof typeof ruleNumCheckMsg];
    return target ? target[v as "len" | "min" | "max" | "range"] : "";
  };
  if (has("min") && has("max")) {
    addRule("range", () => getNumMsg("range"), { arr: [item.min, item.max] });
    has("len") && addRule("len", () => getNumMsg("len"));
  } else {
    ["min", "max", "len"].forEach((v) => {
      has(v) && addRule(v, () => getNumMsg(v));
    });
  }
  return arr;
};

export const getRule = (v: VjFormItemProps, labelMap: ComputedRef<Record<string, string>>, model: ModelRef<Record<string, unknown>, string, Record<string, unknown>>) => {
  let arr: FormItemRule[] = [];
  v.required && arr.push(...splitRules({ required: true }, v.code, labelMap, model));
  if (v.rules) {
    if (isArray(v.rules)) {
      arr = arr.concat(v.rules.reduce((p: FormItemRule[], n: FormItemRule) => {
        return p.concat([...splitRules(n, v.code, labelMap, model)]);
      }, []));
    } else {
      arr.push(...splitRules(v.rules, v.code, labelMap, model));
    }
  }
  return arr;
};