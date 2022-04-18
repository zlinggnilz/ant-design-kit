---
order: 1
nav:
  title: 概览
---

## 概览

如果你已经用了 antd 的 ProComponents 组件, 就没必要再使用我这个了。

这是我从工作项目中抽出的一些用得比较多的组件。后来才看到有 ProComponents 组件, 但自己的用着比较顺手。

## 安装

```js
npm install ant-design-kit -S
```

或

```js
yarn add ant-design-kit -S
```

## 使用

在组件中引入即可, 如：

```js
import { ConfirmBtn } from 'ant-design-kit';
```

## Github

[https://github.com/zlinggnilz/ant-design-kit](https://github.com/zlinggnilz/ant-design-kit)

## 改动

用 typescript 梳理了一下, 个别组件做了些许改动

- 去掉了 Loadimg 组件, 没什么用
- PromiseBtn 改为默认有 message 提示
- 增加 DataEmpty, 用得很少很少, 还是放进来了

😎
