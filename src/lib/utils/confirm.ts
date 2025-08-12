import { type VNode } from "vue"
import { ElMessageBox, type ElMessageBoxOptions } from "element-plus"
import { tryit } from 'radash'

export const VjConfirm = async (
  title: string,
  message: string | VNode | (() => VNode),
  callback: () => Promise<boolean>,
  options?: ElMessageBoxOptions,
): Promise<boolean> => {
  const res = await ElMessageBox(Object.assign({
    title,
    message,
    showCancelButton: true,
    type: "warning",
    customStyle: { wordBreak: "break-all" },
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        const [err, res] = await tryit(callback)();
        instance.confirmButtonLoading = false;
        err && console.log(err);
        res && done();
      } else {
        done();
      }
    },
  } as ElMessageBoxOptions, options || {}));
  return res === "confirm";
};