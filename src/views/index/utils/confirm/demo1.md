```html
<el-button @click="confirm">操作确认</el-button>
```

```ts
const confirm = async () => {
  let res = await VjConfirm('操作确认', '123', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000)
    })
  })
  console.log(res);
}
```