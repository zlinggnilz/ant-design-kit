---
order: 5
nav:
  title: PromiseBtn
---

## PromiseBtn

> 基于 ant-design-kit `ConfirmBtn`, 去掉了 `popover`
>
> 按钮或 a 标签元素触发的操作不需要用户进一步确认时使用。
>
> 点击元素, 需返回 `Promise` , 自动添加 `loading` 状态。

## Demo

### 🌵 有无 message

```tsx
import React from 'react';
import { PromiseBtn } from 'ant-design-kit';
import { Space } from 'antd';

const handleOk = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};
export default () => (
  <>
    <p>有 message 提示</p>
    <Space size={24}>
      <PromiseBtn type="button" onClick={handleOk}>
        点击
      </PromiseBtn>
      <PromiseBtn type="a" onClick={handleOk} successMessage="操作成功啦">
        点击
      </PromiseBtn>
    </Space>

    <p style={{ marginTop: 24 }}>无 message 提示</p>
    <PromiseBtn type="button" onClick={handleOk} successMessage={false}>
      点击
    </PromiseBtn>
  </>
);
```

### 🌵 带有 icon

```tsx
import React from 'react';
import { PromiseBtn } from 'ant-design-kit';
import { ClockCircleOutlined } from '@ant-design/icons';

const handleOk = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};
export default () => (
  <>
    <PromiseBtn type="button" onClick={handleOk} icon={<ClockCircleOutlined />}>
      操作
    </PromiseBtn>
  </>
);
```

## API

| 属性名    | 说明                                   | 默认值   |
| --------- | -------------------------------------- | -------- |
| type      | 按钮类型 a 或 button                   | 'button' |
| onClick   | function, 点击确认触发, 需返回 promise | -        |
| style     | 放在 a 或 button 上                    | -        |
| className | 放在 a 或 button 上                    | -        |

**其他属性可参考 ConfirmBtn**
