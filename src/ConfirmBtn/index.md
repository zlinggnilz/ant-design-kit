---
order: 1
nav:
  title: ConfirmBtn
---

## ConfirmBtn

> 基于 antd `Popconfirm`, `Modal`
>
> 按钮或 a 标签元素触发的操作需要用户进一步的确认时, 在元素附近弹出浮层提示, 或弹出模态框, 询问用户。
>
> 点击“确认”按钮时, 需返回 `Promise`, 自动添加 `loading` 状态。

## Demo

### 🌵 popover

```tsx
import React from 'react';
import { ConfirmBtn } from 'ant-design-kit';
import { Space } from 'antd';

const handleOk = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1300);
  });
};
export default () => (
  <>
    <p>mode = 'popover'</p>
    <Space size={24}>
      <ConfirmBtn type="button" onOk={handleOk} title="确定此操作吗?">
        操作
      </ConfirmBtn>
      <ConfirmBtn onOk={handleOk}>删除</ConfirmBtn>
    </Space>
  </>
);
```

### 🌵 modal

```tsx
import React from 'react';
import { ConfirmBtn } from 'ant-design-kit';
import { Space } from 'antd';

const handleOk = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1300);
  });
};
export default () => (
  <>
    <p>mode = 'modal'</p>
    <Space size={24}>
      <ConfirmBtn
        onOk={handleOk}
        mode="modal"
        type="button"
        title="确认删除第一行吗?"
        content="删除后不可恢复"
      >
        删除
      </ConfirmBtn>
      <ConfirmBtn
        onOk={handleOk}
        mode="modal"
        title="确认删除第一行吗?"
        content="删除后不可恢复"
      >
        删除
      </ConfirmBtn>
    </Space>
  </>
);
```

### 🌵 带有 icon

```tsx
import React from 'react';
import { ConfirmBtn } from 'ant-design-kit';
import { Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const handleOk = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1300);
  });
};
export default () => (
  <ConfirmBtn type="button" onOk={handleOk} icon={<ClockCircleOutlined />}>
    操作
  </ConfirmBtn>
);
```

## API

| 属性名         | 说明                                                               | 默认值         |
| -------------- | ------------------------------------------------------------------ | -------------- |
| type           | 按钮类型 a 或 button                                               | 'a'            |
| mode           | 确认类型 popover 或 modal                                          | 'popover'      |
| pop            | 只对 mode='popover'有效, 是否显示 Popconfirm                       | true           |
| children       | a 或 button 内容, 如果 button 需要图标, 请使用 button 的 icon 属性 | '删除'         |
| text           | 兼容旧版本, 默认取 children                                        | -              |
| title          | Popconfirm / Modal 的标题                                          | '确定删除吗？' |
| content        | Modal 的 content                                                   | -              |
| disabled       | 布尔值                                                             | false          |
| onOk           | function, 点击确认触发, 需返回 promise                             | -              |
| onCancel       | 点击取消触发                                                       | -              |
| okText         | 确认按钮文字                                                       | '确定'         |
| cancelText     | 取消按钮文字                                                       | '取消'         |
| style          | 放在 a 或 button 上                                                | -              |
| className      | 放在 a 或 button 上                                                | -              |
| successMessage | 为 false 时, 不显示提示                                            | text + '成功'  |
| buttonProps    | button 属性                                                        | type='primary' |

**列出的属性之外的将放在 a 或 button 上**
