# 组件介绍

这里归纳一些对文件的操作，目前有：  

VjDownFile： 下载文件

VjBlobToUrl： Blob转url

VjBlobToStr： Blob转文本

# 使用方法

直接调用

# 类型说明

```ts
const VjDownFile: (data: unknown, fileName: string, type?: string | undefined) => void

const VjBlobToUrl: (data: unknown, type?: string | undefined) => string

const VjBlobToStr: (blob: Blob, encode?: string | undefined) => Promise<string>
```
