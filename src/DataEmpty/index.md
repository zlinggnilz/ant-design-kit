---
order: 200
nav:
  title: DataEmpty
---

## DataEmpty

> 基于 antd `Empty`
>
> 根据数据显示 "暂无数据" 或 "数据出错"
>
> antd 的 `Table, List` 已经自带了 loading 和 "暂无数据", `Card` 组件自带了 loading
>
> 自定义的列表或其他展示内容中, 如果不需要显示 "暂无数据" 或 "数据出错", 不需要使用该 `DataEmpty` 组件

## Demo

### 🌵 基础

```tsx
import React, { useState, useEffect } from 'react';
import { DataEmpty } from 'ant-design-kit';

const list = ['aaa', 'bbb', 'ccc', 'ddd'];

const getData = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(list);
    }, 1000),
  );

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <DataEmpty loading={loading} data={data} type="spin">
      {data.map(item => (
        <div
          style={{ border: '1px solid #eee', marginBottom: 10, padding: 8 }}
          key={item}
        >
          {item}
        </div>
      ))}
    </DataEmpty>
  );
};
```

### 🌵 列表

```tsx
import React, { useState, useEffect } from 'react';
import { ConfigProvider, Radio, Space, Switch } from 'antd';
import { DataEmpty } from 'ant-design-kit';

const list = ['aaa', 'bbb', 'ccc', 'ddd'];

const sleep = (timeout = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('block');
  const [dataError, setDataError] = useState(false);

  const getData = async v => {
    setLoading(true);
    await sleep();
    setLoading(false);
    setData(list);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = e => {
    const v = e.target.value;
    setType(v);
    getData();
  };

  const handleSwitchChange = v => {
    setDataError(v);
    getData();
  };

  return (
    <ConfigProvider locale={{ Empty: { description: '暂无数据' } }}>
      <Space align="center" size={16} style={{ marginBottom: 16 }}>
        数据错误:
        <Switch checked={dataError} onChange={handleSwitchChange} />
        Loading Type:
        <Radio.Group value={type} onChange={handleChange}>
          <Radio.Button value="block">block</Radio.Button>
          <Radio.Button value="spin">spin</Radio.Button>
        </Radio.Group>
      </Space>

      <DataEmpty loading={loading} data={data} type={type} error={dataError}>
        {data.map(item => (
          <div
            style={{ border: '1px solid #eee', marginBottom: 10, padding: 8 }}
            key={item}
          >
            {item}
          </div>
        ))}
      </DataEmpty>
    </ConfigProvider>
  );
};
```

### 🌵 对象

```tsx
import React, { useState, useEffect } from 'react';
import { ConfigProvider, Radio, Space, Switch } from 'antd';
import { DataEmpty } from 'ant-design-kit';

const detail = {
  title: 'Cool',
  content:
    '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
};

const sleep = (timeout = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));

export default () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('block');
  const [dataError, setDataError] = useState(false);

  const getData = async v => {
    setLoading(true);
    await sleep();
    setLoading(false);
    setData(detail);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = e => {
    const v = e.target.value;
    setType(v);
    getData();
  };

  const handleSwitchChange = v => {
    setDataError(v);
    getData();
  };

  return (
    <ConfigProvider locale={{ Empty: { description: '暂无数据' } }}>
      <Space align="center" size={16} style={{ marginBottom: 16 }}>
        数据错误:
        <Switch checked={dataError} onChange={handleSwitchChange} />
        Loading Type:
        <Radio.Group value={type} onChange={handleChange}>
          <Radio.Button value="block">block</Radio.Button>
          <Radio.Button value="spin">spin</Radio.Button>
        </Radio.Group>
      </Space>

      <DataEmpty loading={loading} data={data} type={type} error={dataError}>
        <h2>标题: {data.title}</h2>
        <p>内容: {data.content}</p>
      </DataEmpty>
    </ConfigProvider>
  );
};
```

### 🌵 Size

```tsx
import React, { useState } from 'react';
import { Radio } from 'antd';
import { DataEmpty } from 'ant-design-kit';

export default () => {
  const [size, setSize] = useState('default');

  const handleChange = e => {
    const v = e.target.value;
    setSize(v);
  };

  return (
    <>
      <Radio.Group
        value={size}
        onChange={handleChange}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>

      <DataEmpty error size={size}>
        something
      </DataEmpty>
    </>
  );
};
```

## API

| 属性名           | 说明                                                                                 | 默认值                       |
| ---------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| loading          | 是否在加载数据                                                                       | false                        |
| data             | 用来判断是否需要显示'暂无数据'或'数据错误'                                           | -                            |
| showEmpty        | data 为空时, 是否需要显示 '暂无数据'                                                 | true                         |
| error            | 当前数据加载是否出错                                                                 | -                            |
| type             | loading 加载时的类型, 'block' 或 'spin'                                              | 'block'                      |
| size             | data 出错时的显示的错误状态 size                                                     | 'default'                    |
| reRender         | loading 完成后, 是够重新 render children                                             | false                        |
| errorProps       | data 出错时放在 antd `Empty` 上的属性                                                | -                            |
| emptyProps       | data 为空时放在 antd `Empty` 上的属性                                                | -                            |
| errorDescription | data 出错时放在 antd `Empty` 上的 description                                        | '获取数据出错了, 请稍后重试' |
| emptydescription | data 为空时放在 antd `Empty` 上的 description                                        | -                            |
| errorFallback    | data 出错时的显示的内容, 如果设置该属性, `size, errorDescription, errorProps` 则无效 | -                            |
| emptyFallback    | data 为空时的显示的内容, 如果设置该属性, `size, emptydescription, errorProps` 则无效 | -                            |

## DataEmpty.config

**全局设置 DataEmpty 默认属性**, 可设置 `errorFallback, emptyFallback, errorProps, emptyProps, errorDescription, emptyDescription`

```ts
DataEmpty.config({
  errorDescription: '加载出错了', // 默认为 '获取数据出错了, 请稍后重试'
  // emptyDescription
  // errorFallback
  // emptyFallback
  // errorProps
  // emptyProps
});
```
