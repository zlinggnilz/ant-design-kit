---
order: 160
nav:
  title: ContentTable
---

## ContentTable

> 基于 ant-design-kit `TablePage, Form`, 在 TablePage 基础上添加搜索表单
>
> 搜索表单提交时, `Content Table` 会带上表单提交的内容去请求接口

## Demo

### 🌵 表格 Table

**demo 中没有接口请求, 实际项目是页面打开时, `ContentTable` 自动请求。**

```tsx
import React from 'react';
import { ContentTable } from 'ant-design-kit';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
];
const formAttr = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
];

const list = [
  { id: '1', name: 'test1', email: 'test1@test.com' },
  { id: '2', name: 'test2', email: 'test2@test.com' },
  { id: '3', name: 'test3', email: 'test3@test.com' },
  { id: '4', name: 'test4', email: 'test4@test.com' },
];

export default () => (
  <ContentTable
    // dispatch={dispatch}
    // type="demo/list"
    // pageData={}
    formAttr={formAttr}
    dataSource={list}
    columns={columns}
    rowKey="id"
  >
    other element
  </ContentTable>
);
```

### 🌵 列表 List

**demo 中没有接口请求, 实际项目是页面打开时, `ContentTable` 自动请求。**

```tsx
import React from 'react';
import { ContentTable } from 'ant-design-kit';

const formAttr = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
];

const list = [
  { id: '1', name: 'test1', email: 'test1@test.com' },
  { id: '2', name: 'test2', email: 'test2@test.com' },
  { id: '3', name: 'test3', email: 'test3@test.com' },
  { id: '4', name: 'test4', email: 'test4@test.com' },
];

const renderItem = item => (
  <div className="list-item" style={{ border: '1px solid #eee', padding: 8 }}>
    <p>{item.name}</p>
    <p>{item.email}</p>
  </div>
);

export default () => (
  <ContentTable
    listType="list"
    // dispatch={dispatch}
    // type="demo/list"
    // pageData={}
    formAttr={formAttr}
    dataSource={list}
    rowKey="id"
    grid={{ gutter: 24, column: 4 }}
    renderItem={renderItem}
  >
    其他内容
  </ContentTable>
);
```

### 🌵 可选择

**在 `ContentTable` 基础上添加 本页全选/结果全选, list 模式下无效**

**demo 中没有接口请求, 实际项目是页面打开时, `ContentTable` 自动请求。**

```tsx
import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { ContentTable } from 'ant-design-kit';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
];
const formAttr = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
];

const list = [
  { id: '1', name: 'test1', email: 'test1@test.com' },
  { id: '2', name: 'test2', email: 'test2@test.com' },
  { id: '3', name: 'test3', email: 'test3@test.com' },
  { id: '4', name: 'test4', email: 'test4@test.com' },
];

export default () => {
  const [selected, setSelected] = useState([]);
  const [selectObj, setSelectObj] = useState({});
  const tableRef = useRef();

  const handleSelectChange = data => {
    console.log('select change >>', data);
    setSelected(data.selectedRowKeys);
    setSelectObj(data);
  };

  const handleView = () => {
    Modal.info({
      title: '查看',
      content: <pre>{JSON.stringify(selectObj, null, 2)}</pre>,
    });
  };

  return (
    <ContentTable
      // dispatch={dispatch}
      // type="demo/list"
      // pageData={}
      selected={selected}
      showSelect
      showResultAll
      ref={tableRef}
      formAttr={formAttr}
      dataSource={list}
      columns={columns}
      rowKey="id"
      extra={
        <Button type="primary" onClick={handleView}>
          查看
        </Button>
      }
      onTableSelectChange={handleSelectChange}
      searchValueFn={data => {
        console.log('App -> data', data);
      }}
    >
      <Button
        onClick={() => {
          setSelected(['1', '2']);
        }}
      >
        选择1, 2
      </Button>
    </ContentTable>
  );
};
```

## API

<Alert type="info">
其他属性与 ant-design-kit `Form`, `TablePage` 相同, 不再列举。 <strong>TablePage 的属性直接写在 ContentTable 上</strong>
</Alert>

| 属性名                 | 说明                                                                                                                                                              | 默认值 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| extra                  | 放置于搜索表单 右侧的内容                                                                                                                                         | -      |
| formWrapClassName      | 搜索表单外层 div 的 class                                                                                                                                         | -      |
| formAttr               | 用于生成搜索表单, 参照 Form                                                                                                                                       | -      |
| replaceLocation        | 搜索时, 是否替换 location query                                                                                                                                   | false  |
| formProps              | 其他放置于搜索表单上的属性                                                                                                                                        | -      |
| showReset              | 默认不显示重置按钮                                                                                                                                                | false  |
| tableProps             | 其他放置于 table 上的属性                                                                                                                                         | -      |
| listProps              | 其他放置于 list 上的属性                                                                                                                                          | -      |
| searchQueryFn          | function 类型, `searchQueryFn(query)` 从 location 取的 query 做处理再赋给 form, 需返回 object                                                                     | -      |
| searchValueFn          | function 类型, `searchValueFn(values)` 搜索表单提交时将 data 处理再去请求接口, 需返回 object。请勿在该 function 中触发 `setState`                                 | -      |
| children               | 放在搜索表单与表格之间的内容                                                                                                                                      | -      |
| **以下为表格选择属性** |                                                                                                                                                                   |        |
| selected               | 当前选择列(需要手动控制选择列时)                                                                                                                                  | -      |
| showSelect             | 显示表格选择                                                                                                                                                      | false  |
| showResultAll          | 显示 本页全选/结果全选                                                                                                                                            | false  |
| showSelectInfo         | 已选择几个文字信息                                                                                                                                                | true   |
| rowDisable             | function(record), 返回布尔值 用在 selections disabled                                                                                                             | -      |
| rowSelection           | 用于 Table 上。当 showSelect=true 时, 将与默认 rowSelection 合并, 再赋给 Table                                                                                    | -      |
| onTableSelectChange    | function({type, selectedRowKeys, selectedRows}), 选择项发生变化的回调。<br/>type 值为 'currentPage' 或 'resultAll' , 本页全选和手动勾选的 type 都是 'currentPage' | -      |
| columnTitle            | showResultAll=true 时, 内置了自定义 columnTitle <br/>设置 columnTitle=false, 可使用 antd table 的默认 columnTitle                                                 |

### 表格传参

> 最终整合用于接口传参, 顺序为 `{ ...params, ...location.query, ...formData, ...payload }`

- `payload`: 赋给表格的 `payload`, 请求时会带上, 再次执行搜索时, 搜索表单提交的 data 会将 payload 重新赋值
- `params`: 赋给表格的 `params`, 请求时会一直带上, 再次执行搜索不会覆盖 params
- `location.query`: 路由上的参数, 开启了 `replaceLocation` 才会执行
- `formData`: 赋给搜索表单的默认值

## Method

> 可使用 `Form` 和 `TablePage` 的 `Method`

## ContentTable.config

**全局设置 ContentTable 默认属性**, 可设置 `submitText, cancelText, showReset, formProps`

**页码相关设置需 TablePage.config**

```ts
ContentTable.config({
  submitText: '搜索', // 默认为 "查询"
  cancelText: '重置', // 默认为 "重置"
  // showReset
  // formProps
});
```
