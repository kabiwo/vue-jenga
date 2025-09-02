这段实例用于展示布局效果与remerge功能

```html
<VjForm :form :col="5" :remerge />
```
```ts
const form = ref<VjFormItemProps[]>(list(20).map((v, i) => {
  return {
    label: `${i}`,
    code: `${i}`
  }
}))

const remerge = (item: unknown, index: number) => {
  if (index === 0) {
    return {
      colspan: 3,
      rowspan: 3
    }
  }
  if (index === 2) {
    return {
      colspan: 3,
      rowspan: 2
    }
  }
  if (index === 13) {
    return {
      colspan: 3,
      rowspan: 3
    }
  }
  return {}
}
```