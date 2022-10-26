---
order: 10
nav:
  title: ConfirmSwitch
---

## ConfirmSwitch

> 基于 antd `Switch`
>
> 需要表示开关状态/两种状态之间的切换时使用, `onChange` 需返回 `Promise`, 自动添加 `loading` 状态。

## Demo

### 🌵 Switch

```tsx
import React from 'react';
import { ConfirmSwitch } from 'ant-design-kit';

const handleChange = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1500);
  });
};
export default () => <ConfirmSwitch onChange={handleChange} checked />;
```

## API

| 属性名         | 说明                     | 默认值 |
| -------------- | ------------------------ | ------ |
| onChange       | function, 应返回 Promise | -      |
| enableMessage  | 启用成功时候的 message   | '启用' |
| disableMessage | 禁用成功时候的 message   | '禁用' |

**其他属性** 同 antd Switch
