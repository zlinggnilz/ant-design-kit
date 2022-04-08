---
order: 100
nav:
  title: Form
---

## Form

> 基于 antd `Form`
>
> 基于 ant-design-kit `CreateField`
>
> 根据配置生成表单, 需手动配置表单提交状态的 loading。 表单大部分属性与 antd `Form` 相同。
>
> **注意: 表单中有 `Form.List` 时, 不要添加 `preserve` 为 `false`, 尤其是表单放在 `Modal` 中时。**

## Demo

### 🌵 基础表单

```tsx
import React from 'react';
import { DatePicker } from 'antd';
import { Form } from 'ant-design-kit';

const selectList = [
  { label: '选择1', value: 'tag1' },
  { label: '选择2', value: 'tag2' },
  { label: '选择3', value: 'tag3' },
];

const formAttr = [
  { label: '名称', name: 'name' },
  { label: '邮箱', name: 'email', type: 'email', required: true },
  {
    label: '下拉',
    name: 'select1',
    type: 'select',
    fieldProps: { dataSource: selectList },
  },
  {
    label: '单选',
    name: 'select2',
    type: 'radio',
    fieldProps: { dataSource: selectList },
  },
  {
    label: '多选',
    name: 'select3',
    type: 'checkbox',
    fieldProps: { dataSource: selectList },
  },
  { label: '日期', name: 'date', component: <DatePicker /> },
];
const handleSubmit = values => {
  console.log('form submit >>', values);
};
export default () => <Form formAttr={formAttr} onSubmit={handleSubmit} />;
```

### 🌵 表单联动

```tsx
import React, { useRef } from 'react';
import { Form, CreateField } from 'ant-design-kit';

const selectList = [
  { label: '居家', value: 'home' },
  { label: '外出', value: 'outside' },
];

const handleSubmit = values => {
  console.log('form submit >>', values);
};
export default () => {
  const formRef = useRef();

  const handleChange = () => {
    formRef.current.setFields([
      {
        name: 'reason',
        value: undefined,
        error: [],
      },
    ]);
  };

  const formAttr = [
    {
      label: '单选',
      name: 'choice',
      required: true,
      type: 'radio',
      fieldProps: { dataSource: selectList, onChange: handleChange },
    },
    {
      shouldUpdate: (prevValues, curValues) =>
        prevValues.choice !== curValues.choice,
      component: ({ getFieldValue }) => {
        const choice = getFieldValue('choice');
        if (choice === 'home') {
          return (
            <CreateField
              label="居家备注"
              name="homeMark"
              required
              type="text"
            />
          );
        }
        if (choice === 'outside') {
          return (
            <CreateField
              label="外出备注"
              name="outsideMark"
              required
              type="text"
            />
          );
        }
        return null;
      },
    },
  ];
  return (
    <Form
      ref={formRef}
      data={{ choice: 'home' }}
      formAttr={formAttr}
      onSubmit={handleSubmit}
    />
  );
};
```

### 🌵 使用 CreateField

直接使用 `CreateField`

```tsx
import React, { useRef } from 'react';
import { Row, Col } from 'antd';
import { Form, CreateField } from 'ant-design-kit';

const selectList = [
  { label: '居家', value: 'home' },
  { label: '外出', value: 'outside' },
];

const handleSubmit = values => {
  console.log('form submit >>', values);
};

export default () => (
  <Form onSubmit={handleSubmit} layout="vertical" data={{ choice: 'home' }}>
    <Row gutter={24}>
      <Col span={12}>
        <CreateField label="姓名" name="name" required />
      </Col>
      <Col span={12}>
        <CreateField
          label="选项"
          name="choice"
          required
          type="select"
          fieldProps={{ dataSource: selectList }}
        />
      </Col>
      <Col span={24}>
        <CreateField
          shouldUpdate={(prevValues, curValues) =>
            prevValues.choice !== curValues.choice
          }
        >
          {({ getFieldValue }) => {
            const choice = getFieldValue('choice');
            if (choice === 'home') {
              return (
                <CreateField
                  label="居家备注"
                  name="homeMark"
                  required
                  type="text"
                />
              );
            }
            if (choice === 'outside') {
              return (
                <CreateField
                  label="外出备注"
                  name="outsideMark"
                  required
                  type="text"
                />
              );
            }
            return null;
          }}
        </CreateField>
      </Col>
    </Row>
  </Form>
);
```

## API

<Alert type='info'>
<strong>其他属性</strong> 同 antd Form
</Alert>

| 属性名             | 说明                                                                                                                                                                                 | 默认值                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| editable           | 是否编辑状态, 会放置到通过 `formAttr` 遍历生成的 `CreateField` 上。 **注意**是只有通过 `formAttr` 遍历生成的 `CreateField` 才会添加该属性, `shouldUpdate` 的自定义控件也需要自己添加 | true                                   |
| data               | 表单默认值                                                                                                                                                                           | {}                                     |
| className          |                                                                                                                                                                                      | -                                      |
| layout             | 布局方式, `horizontal`、 `inline` 或 `vertical`, 同 antd Form                                                                                                                        | 'horizontal'                           |
| formAttr           | 数组, 遍历生成 `CreateField` 控件                                                                                                                                                    | []                                     |
| loading            | 布尔值, 表单提交时的 loading                                                                                                                                                         | -                                      |
| onSubmit           | 提交表单且数据验证成功后回调事件                                                                                                                                                     | -                                      |
| onFinishFailed     | 提交表单且数据验证失败后回调事件                                                                                                                                                     | -                                      |
| submitText         | 如果用默认的保存按钮,按钮文字                                                                                                                                                        | 提交                                   |
| submitButtonProps  | 如果用默认的保存按钮,按钮属性                                                                                                                                                        | -                                      |
| submitAction       | 自定义 保存按钮                                                                                                                                                                      | button                                 |
| onCancel           | 如果用默认的取消按钮,点击取消按钮的事件, 默认重置表单                                                                                                                                | reset form                             |
| cancelButtonProps  | 如果用默认的保存按钮,按钮属性                                                                                                                                                        | -                                      |
| cancelAction       | 自定义 取消按钮                                                                                                                                                                      | button                                 |
| cancelText         | 如果用默认的取消按钮,按钮文字                                                                                                                                                        | 重置                                   |
| scrollToFirstError | 同 antd Form                                                                                                                                                                         | true                                   |
| labelCol           | 同 antd Form                                                                                                                                                                         | { xs: { span: 24 }, sm: { span: 5 } }  |
| wrapperCol         | 同 antd Form                                                                                                                                                                         | { xs: { span: 24 }, sm: { span: 15 } } |
| actionCol          | action 按钮的布局, 会自动获取, 也可自行设置                                                                                                                                          | -                                      |
| showAction         | 是否显示 action 按钮                                                                                                                                                                 | true                                   |
| extra              | 放在 action 按钮后面的内容                                                                                                                                                           | -                                      |
| children           | 放在 `formAttr` 生成的控件之后                                                                                                                                                       | -                                      |

### formAttr

数组，用来遍历每一项赋给 `CreateField`, 与 `CreateField` 属性大致相同

**type**: `'text', 'email', 'textarea', 'select', 'int', 'number', 'radio', 'checkbox', 'url', 'group', 'onlyLabel'`

<Alert type="warning">
比 <code>CreateField</code> 多了 <code>onlyLabel</code>, 表示只渲染 <code>label</code> 属性, 值为 <code>ReactNode</code> 类型
</Alert>

**children**: 子 formAttr, 如果 `formAttr` 的 item 有 `children` 属性, 则增加一个 DIV, 在该 DIV 内遍历渲染 children。

<Alert type="warning">
<strong>需要在页面体现 div 嵌套的时候, formAttr 才需要用到 children 属性</strong>
</Alert>

## Method

<Alert type='info'>
<strong>其他 Method</strong> 同 antd Form
</Alert>

| 属性名      | 说明                                             | 默认值 |
| ----------- | ------------------------------------------------ | ------ |
| resetFields | 重置表单到初始值                                 | -      |
| submit      | 手动触发 form 的提交, 仍通过 `onSubmit` 获取数据 | -      |

## Form.config

**全局设置 Form 默认属性**, 可设置 `labelCol, wrapperCol, onCancel, cancelText, submitText, submitButtonProps, cancelButtonProps`

```ts
Form.config({
  cancelText: '保存', // 默认为 "提交"
  submitText: '取消', // 默认为 "重置"
  // onCancel
  // labelCol
  // wrapperCol
  // submitButtonProps
  // cancelButtonProps
});
```
