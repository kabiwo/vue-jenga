import { useWindowSize } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export type VjConf = {
  remEnable: boolean;
  baseWidowWidth: number;
  baseFont: number;
};

export const VjConfBase: VjConf = {
  remEnable: true,
  baseWidowWidth: 1920,
  baseFont: 40,
};

export const useVjConfStore = defineStore("vj-conf", () => {
  const conf = ref<VjConf>(VjConfBase);

  const setConf = (config: Partial<VjConf>) => {
    conf.value = Object.assign({}, conf.value, config);
  };

  const getConf = () => {
    return conf.value;
  };

  const resetConf = () => {
    conf.value = VjConfBase;
  };

  const rootFont = computed(() => {
    const { width } = useWindowSize();
    let scale = parseInt((window.outerWidth / window.innerWidth).toFixed(2));
    let c = conf.value;
    const number = ((c.baseFont * scale) / c.baseWidowWidth) * width.value * scale;
    return number;
  });

  const root10px = computed(() => {
    return rootFont.value / 4;
  });

  const rootFontStr = computed(() => {
    const { width } = useWindowSize();
    return `calc(${(rootFont.value * 100) / width.value}vw)`;
  });

  const scaleRate = computed(() => {
    return rootFont.value / conf.value.baseFont;
  });

  const getScaledNum = (num: number) => {
    if (conf.value.remEnable) {
      return num * scaleRate.value;
    } else {
      return num;
    }
  };

  const init = (config?: Partial<VjConf>) => {
    if (config) {
      setConf(config);
    }
    watch(rootFontStr, (value) => {
      let c = conf.value;
      if (c.remEnable) {
        window.document.documentElement.style.fontSize = value;
      } else {
        window.document.documentElement.style.fontSize = 'initial';
      }
    }, {
      immediate: true
    })
  };

  return {
    setConf,
    getConf,
    resetConf,

    rootFont,
    root10px,
    scaleRate,
    getScaledNum,

    init
  };
});