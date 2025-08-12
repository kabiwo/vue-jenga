import { useVjConfStore, type VjConf } from "./conf"


export const VjInit = (config?: Partial<VjConf>) => {

  const conf = useVjConfStore();

  conf.init(config);
};
