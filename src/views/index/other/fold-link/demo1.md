```html
<vj-fold-link :links="links" :num="3">
</vj-fold-link>
```

```ts
const links = ref(list(0, 20, i => {
  return {
    label: `link${i + 1}`,
    func: () => alert(`link${i + 1}`)
  };
}));
```