<template>
  <markdown :mdStr />
  <VjForm v-model="value1" v-bind="form1">
    <template #custom="scope">
      <div>custom{{ consoleScope(scope) }}</div>
    </template>
  </VjForm>

  <VjForm :form :col="5" :remerge />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { VjForm, type VjFormItemProps, type VjFormProps } from 'vue-jenga/form'
import { type VjOptions } from 'vue-jenga/utils'
import { list } from 'radash';
import mdStr from './index.md?raw'
import { VjfcDateRange, VjfcDatetime, VjfcDatetimeRange, VjfcTextarea } from '../../../lib/form';
// import axios from 'axios';


// axios.get('/admin/dashboard/geturl?id=1')
// .then(response => {
// console.log('用户列表:', response.data);
// })
// .catch(error => {
// console.error('请求出错:', error);
// });

const commonOptions: VjOptions = [
  {
    label: 'option1',
    value: 1
  },
  {
    label: 'option2',
    value: 2
  }
];

const consoleScope = (scope: unknown) => {
  console.log(scope)
}

const value1 = ref({});
const form1 = ref<VjFormProps>({
  form: [
    {
      label: '文本',
      code: 'text',
      required: true
    },
    {
      label: '数字',
      code: 'number',
      type: 'number',
      elNumberProps: {
        min: 3,
        max: 15
      },
      rules: [
        {
          min: 5,
          max: 10,
        }
      ]
    },
    {
      label: '选择',
      code: 'select',
      type: 'select',
      options: commonOptions
    },
    {
      label: '子表',
      code: 'sub',
      type: 'sub',
      subFormConf: {
        form: [
          {
            label: '子表1',
            code: 'sub1',
            required: true
          },
          {
            label: '子表2',
            code: 'sub2',
          }
        ]
      }
    },
    VjfcTextarea({
      label: '文本域',
      code: 'textarea',
    }),
    {
      label: '日期',
      code: 'date',
      type: 'date'
    },
    {
      label: '时间',
      code: 'time',
      type: 'time'
    },
    VjfcDatetime({
      label: '日期时间',
      code: 'datetime',
    }),
    VjfcDateRange({
      label: '日期范围',
      code: 'daterange'
    }),
    VjfcDatetimeRange({
      label: '日期时间范围',
      code: 'datetimerange'
    }),
    {
      label: '单选',
      code: 'radio',
      type: 'radio',
      options: commonOptions
    },
    {
      label: '单选按钮',
      code: 'radio-button',
      type: 'radio',
      button: true,
      options: commonOptions
    },
    {
      label: '多选',
      code: 'checkbox',
      type: 'checkbox',
      options: commonOptions
    },
    {
      label: '多选按钮',
      code: 'checkbox-button',
      type: 'checkbox',
      button: true,
      options: commonOptions
    },
    {
      label: '开关',
      code: 'switch',
      type: 'switch'
    },
    {
      label: '上传',
      code: 'upload',
      type: 'upload'
    },
    {
      label: '级联',
      code: 'cascader',
      type: 'cascader',
      options: commonOptions
    },
    {
      label: '树选择',
      code: 'treeselect',
      type: 'treeselect',
      options: commonOptions
    },
    {
      label: '自定义',
      code: 'custom',
      type: 'custom',
      skDefault: 'custom'
    }
  ],
  col: 3
});



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
</script>