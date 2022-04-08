---
order: 105
nav:
  title: CreateField
---

## CreateField

> 基于 antd Form.Item
>
> 内置了一些常用控件, 用于生成 `Form.Item`
>
> 主要为 ant-design-kit `Form` 服务, 也可单独使用

## Demo

请查看 `Form`

## API

| 属性名        | 说明                                                                                                       | 默认值 |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| label         | label 标签的文本, 同 antd Form.Item                                                                        | -      |
| name          | 字段名, 同 antd Form.Item                                                                                  | -      |
| type          | 内置控件类型 `'text', 'email', 'textarea', 'select', 'int', 'number', 'radio', 'checkbox', 'url', 'group'` | 'text' |
| component     | 自定义组件, 同时 `type` 属性失效。 `CreateField` 单独使用时, 优先用 `children` 作为自定义组件              | -      |
| fieldProps    | 将放在控件上                                                                                               | -      |
| formProps     | 将放在 `Form.Item` 上                                                                                      | -      |
| rules         | 自定义 `rules`, 同 antd Form.Item                                                                          | -      |
| required      | 是否为必填项                                                                                               | false  |
| message       | 如果 `required` 为 `true`, 与 `message` 生成第一条 `rule`, 与自定义 `rules` 拼接                           | -      |
| shouldUpdate  | 同 antd Form.Item, 同时使用 `children` 或 `component` 自定义控件                                           | -      |
| editable      | 布尔值, 是否可编辑, 如果不可编辑, 将在控件上添加 `disabled` 为 `true`                                      | true   |
| viewComponent | `editable` 为 `false` 时的自定义控件                                                                       | -      |
| fieldKey      | 同 antd Form.Item                                                                                          | -      |
