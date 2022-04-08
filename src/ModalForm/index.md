---
order: 110
nav:
  title: ModalForm
---

## ModalForm

> 基于 antd `Modal`
>
> 基于 ant-design-kit `Form`

## Demo

### 🌵 基础弹窗表单

`onSubmit` 应返回 `Promise`

```tsx
import React, { useRef } from 'react';
import { Button } from 'antd';
import { ModalForm } from 'ant-design-kit';

const formAttr = [
  { label: '名称', name: 'name', required: true },
  { label: '邮箱', name: 'email', type: 'email' },
];

export default () => {
  const modalFormRef = useRef();
  const handleClick = () => {
    modalFormRef.current.open();
  };
  const handleSubmit = values => {
    console.log('values >>', values);
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1300);
    });
  };
  return (
    <>
      <Button type="primary" onClick={handleClick}>
        点击
      </Button>
      <ModalForm
        title="添加信息"
        ref={modalFormRef}
        formAttr={formAttr}
        onSubmit={handleSubmit}
      />
    </>
  );
};
```

## API

| 属性名          | 说明                                                               | 默认值         |
| --------------- | ------------------------------------------------------------------ | -------------- |
| title           | 标题                                                               | -              |
| formData        | 表单初始值                                                         | {}             |
| formDataLoading | 布尔值, 异步获取表单数据时的 loading                               | -              |
| formAttr        | 表单结构数组                                                       | []             |
| payload         | 默认数据,表单提交时一起提交                                        | -              |
| onSubmit        | 表单提交 function,需返回 Promise                                   | -              |
| onCancel        | 点击取消按钮的回调                                                 | -              |
| okText          | 弹框确认按钮的文字                                                 | '保存'         |
| cancelText      | 弹框取消按钮的文字                                                 | '取消'         |
| modalProps      | Modal 上的其他属性                                                 | {}             |
| successMessage  | 表单提交成功后的提示文字, successMessage 值为 false 时, 不显示提示 | title + '成功' |
| cancelMessage   | 表单提交成功后的提示文字, cancelMessage 值为 false 时, 不显示提示  | false          |
| formProps       | Form 上的其他属性                                                  | {}             |

## Method

> 其他 `Method` 参看 `Form`

| 属性名 | 说明                                 | 默认值 |
| ------ | ------------------------------------ | ------ |
| open   | 打开 ModalForm                       | -      |
| close  | 关闭 Modal, 一般情况下不需要主动调用 | -      |

## ModalForm.config

**全局设置 ModalForm 默认属性**, 可设置 `formProps, modalProps`

```ts
ModalForm.config({
  modalProps: { centered: true }, // 默认为空
  // formProps
});
```
