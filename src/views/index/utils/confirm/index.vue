<template>
  <markdown :mdStr/>

  <el-button @click="confirm">操作确认</el-button>

  <markdown :mdStr="demo1"/>
</template>
<script setup lang="ts">
import mdStr from './index.md?raw'
import demo1 from './demo1.md?raw'

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

</script>