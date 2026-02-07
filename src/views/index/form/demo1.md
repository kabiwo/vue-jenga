这段实例列出了所有当前支持的子表单项

```html
  <VjForm v-model="value1" v-bind="form1">
    <template #custom="scope">
      <div>custom{{ consoleScope(scope) }}</div>
    </template>
  </VjForm>
  <el-button type="primary" @click="trigger()">触发验证</el-button>
```
```ts
  const formRef = ref<InstanceType<typeof VjForm>>();

  const trigger = () => {
    console.log(formRef, value1);
    formRef.value?.validate();
  };

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

  let customScope: VjFormItemScope;
  const consoleScope = (scope: VjFormItemScope) => {
    console.log(scope)
    customScope = scope;
    customScope!._ItemProps!.addItemRule!('custom', {
      code: 'custom',
      rules: [
        {
          validator: () => {
            return false;
          }
        }
      ]
    });
  };

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
      VjfcSelectMulti({
        label: '本地多选',
        code: 'multi-select-local',
        options: commonOptions,
      }),
      VjfcSelectMulti({
        label: '远程多选',
        code: 'multi-select-remote',
        remote: true,
        remoteInitQuery: true,
        remoteFunc: async () => {
          console.log('search');
          return commonOptions
        },
        remoteInitOptions: async () => commonOptions,
      }),
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
        label: '复选',
        code: 'checkbox',
        type: 'checkbox',
        options: commonOptions
      },
      {
        label: '复选按钮',
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
      },
      {
        label: '空',
        code: 'empty',
        type: 'empty'
      },
      {
        label: 'repeat',
        code: 'repeat',
        type: 'repeat',
        repeatItems: [
          {
            label: 'repeat',
            code: 'repeat',
            required: true
          }
        ],
        repeatTime: 3
      },
      {
        label: 'multi',
        code: 'multi',
        type: 'multi',
        multiItemConf: {
          label: 'multi-sub',
          code: 'multi-sub',
          required: true,
          noLabel: true
        }
      }
    ],
    col: 3
  });
```