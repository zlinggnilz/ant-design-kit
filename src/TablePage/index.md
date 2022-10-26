---
order: 150
nav:
  title: TablePage
---

## TablePage

> 基于 antd `Table`, `List`, 已封装分页相关

## Demo

### 🌵 表格 Table

**demo 中没有接口请求, 实际项目是页面打开时, `TablePage` 自动请求。**

```tsx
import React from 'react';
import { TablePage } from 'ant-design-kit';

const list = [
  { id: '1', name: 'test1', email: 'test1@test.com' },
  { id: '2', name: 'test2', email: 'test2@test.com' },
  { id: '3', name: 'test3', email: 'test3@test.com' },
  { id: '4', name: 'test4', email: 'test4@test.com' },
];
const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
];
export default () => (
  <TablePage
    // dispatch={dispatch}
    // type="demo/list"
    // pageData={}
    dataSource={list}
    columns={columns}
    rowKey="id"
  />
);
```

### 🌵 列表 List

**demo 中没有接口请求, 实际项目是页面打开时, `TablePage` 自动请求。**

```tsx
import React from 'react';
import { TablePage } from 'ant-design-kit';

const list = [
  { id: '1', name: 'test1', email: 'test1@test.com' },
  { id: '2', name: 'test2', email: 'test2@test.com' },
  { id: '3', name: 'test3', email: 'test3@test.com' },
  { id: '4', name: 'test4', email: 'test4@test.com' },
];
const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
];
const renderItem = item => (
  <div className="list-item" style={{ border: '1px solid #eee', padding: 8 }}>
    <p>{item.name}</p>
    <p>{item.email}</p>
  </div>
);
export default () => (
  <TablePage
    listType="list"
    // dispatch={dispatch}
    // type="demo/list"
    // pageData={}
    grid={{ gutter: 32, column: 4 }}
    dataSource={list}
    columns={columns}
    renderItem={renderItem}
    rowKey="id"
  />
);
```

## API

<Alert type="info">
其他属性与 antd Table 一致
</Alert>

| 属性名              | 说明                                                             | 默认值        |
| ------------------- | ---------------------------------------------------------------- | ------------- |
| listType            | table 或 list                                                    | 'table'       |
| dispatch            | dispatch                                                         | -             |
| type                | dispatch 的 type                                                 | -             |
| columns             | 同 antd Table                                                    | []            |
| rowKey              | 同 antd Table                                                    | []            |
| dataSource          | 用来渲染的数据                                                   | []            |
| pageData            | 页码相关数据                                                     | []            |
| loading             | 请求接口时的 loading                                             | -             |
| needPage            | 是否需要页码                                                     | true          |
| onChange            | 翻页等时的回调, 一般不需要处理, **暂未支持 `Table filter` 条件** | -             |
| renderItem          | 给 List 使用                                                     | -             |
| payload             | 获取数据时, 放入接口参数, 调用 getList 的参数将覆盖 payload      | -             |
| params              | 获取数据时, 放入接口参数, **不会被覆盖**                         | -             |
| pagination          | 同 antd Table                                                    | -             |
| currentName         | pageData 中 current page 的 key                                  | 'currentPage' |
| sizeName            | pageData 中 size 的 key                                          | 'pageSize'    |
| totalName           | pageData 中 total 的 key                                         | 'totalRows'   |
| dispatchSizeName    | 提供给接口 current page 的 key                                   | 'size'        |
| dispatchCurrentName | 提供给接口 size 的 key                                           | 'current'     |

## Method

| 属性名     | 说明                                                  | 默认值                          |
| ---------- | ----------------------------------------------------- | ------------------------------- |
| getList    | 获取某页内容                                          | getList(p = 1, payload = {}){ } |
| reloadPage | 重新获取某页内容,默认是当前页,-1 为前一页, 1 为后一页 | reloadPage(v=0)                 |  |

## TablePage.config

**全局设置 TablePage 默认属性**, 可设置 `currentName, sizeName, totalName, dispatchSizeName, dispatchCurrentName, size`

```ts
ContentTable.config({
  size: 10, // 默认为20
  // currentName
  // sizeName
  // totalName
  // dispatchSizeName
  // dispatchCurrentName
});
```
