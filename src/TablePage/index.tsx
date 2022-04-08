import React, { PureComponent } from 'react';
import { Table, List } from 'antd';
import get from 'lodash.get';
import { TablePageProp, ConfigOpionType } from './interface';

let defaultCurrentName = 'currentPage';
let defaultSizeName = 'pageSize';
let defaultTotalName = 'totalRows';
let defaultDispatchSizeName = 'size';
let defaultDispatchCurrentName = 'current';
let defaultSize = 20;

const getRowKey = (record: any, index: number, rowKey: any) => {
  if (typeof rowKey === 'function') {
    return rowKey(record, index);
  }

  return record[rowKey];
};

class TablePage extends PureComponent<TablePageProp> {
  static defaultProps = {
    // pagination: {},
    rowKey: 'sid',
    payload: {},
    params: {},
    needPage: true,
    listType: 'table',
    // currentName: 'currentPage',
    // sizeName: 'pageSize',
    // totalName: 'totalRows',
    // dispatchSizeName: 'size',
    // dispatchCurrentName: 'current',
  };

  private payload;
  private page;

  constructor(props: TablePageProp) {
    super(props);

    this.payload = props.payload;
    // this.params = props.params;
    this.page = get(props.pageData, props.currentName || defaultCurrentName, 1);
  }

  componentDidMount() {
    const { params } = this.props;
    this.getList(1, { ...params, ...this.payload });
  }

  // componentWillUnmount() {
  //   this.setState = (state, callback) => {};
  // }

  getList = (p = 1, payload: any = {}) => {
    const {
      dispatch,
      type,
      pageData,
      needPage,
      sizeName = defaultSizeName,
      dispatchSizeName = defaultDispatchSizeName,
      dispatchCurrentName = defaultDispatchCurrentName,
      params,
    } = this.props;
    if (typeof p !== 'number') {
      console.error('page number invalid');
      return;
    }
    if (!dispatch) {
      // console.error('Table page: dispatch is required. ');
      return;
    }
    const page = p < 1 ? 1 : p;
    const size = get(pageData, sizeName, defaultSize);
    if (!type) return;
    const { __pageSize: pSize, ...restPayload } = payload;
    this.payload = restPayload;
    // this.setState({ page });
    this.page = page;

    if (needPage) {
      dispatch({
        type,
        payload: {
          [dispatchSizeName]: pSize || size,
          [dispatchCurrentName]: page,
          ...params,
          ...restPayload,
        },
      });
    } else {
      dispatch({
        type,
        payload: { ...params, ...payload },
      });
    }
  };

  reloadPage = (v = 0, params?: any) => {
    this.getList(this.page + v, { ...this.payload, ...params });
  };

  handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    const { onChange, dispatchSizeName = defaultSizeName, params } = this.props;

    if (pagination.current === this.page) {
      const { order, columnKey } = sorter;
      const payload = { ...params, ...this.payload, order, columnKey };
      this.getList(1, { ...payload, __pageSize: pagination.pageSize });
    } else {
      this.getList(pagination.current, { ...params, ...this.payload });
    }

    onChange && onChange(pagination, filters, sorter, extra);
  };

  handleListChange = (page: number, size: number) => {
    const { onChange, dispatchSizeName = defaultSizeName, params } = this.props;

    if (page === this.page) {
      const payload = { ...params, ...this.payload, [dispatchSizeName]: size };
      this.getList(1, payload);
    } else {
      this.getList(page, { ...params, ...this.payload });
    }

    onChange && onChange(page, size);
  };

  render() {
    const {
      pageData,
      pagination,
      dispatch,
      type,
      columns,
      needPage,
      currentName = defaultCurrentName,
      sizeName = defaultSizeName,
      dispatchSizeName, // render中未使用
      dispatchCurrentName, // render中未使用
      totalName = defaultTotalName,
      listType,
      rowKey,
      renderItem,
      rowSelection,
      childrenColumnName,
      dataSource,
      ...rest
    } = this.props;
    let d = dataSource || [];
    if (!Array.isArray(d)) {
      d = [];
      console.error('Table dataSource should be ARRAY');
    }

    const pageNo = get(pageData, currentName, 1);
    const pageSize = get(pageData, sizeName, defaultSize);
    const total = get(pageData, totalName, d.length);

    const tableColumns = columns && columns.filter(item => !item.hide);

    const pagi = needPage
      ? {
          showSizeChanger: false,
          current: pageNo,
          pageSize,
          total,
          showTotal: (totalNum: number) => `共 ${totalNum} 条`,
          // hideOnSinglePage: true,
          ...pagination,
        }
      : pagination || false;

    return listType === 'table' ? (
      <Table
        className="cool-table"
        columns={tableColumns}
        rowKey={rowKey}
        rowSelection={rowSelection}
        childrenColumnName={childrenColumnName}
        dataSource={d}
        scroll={{ x: 'max-content' }}
        {...rest}
        pagination={pagi}
        onChange={this.handleChange}
      />
    ) : (
      <List
        dataSource={d}
        {...rest}
        pagination={pagi && { onChange: this.handleListChange, ...pagi }}
        renderItem={(item, index) => (
          <List.Item key={getRowKey(item, index, rowKey) || `list-${index}`}>
            {renderItem && renderItem(item)}
          </List.Item>
        )}
      />
    );
  }
}

function setConfig(options: ConfigOpionType) {
  if (options.currentName !== undefined) {
    defaultCurrentName = options.currentName;
  }
  if (options.sizeName !== undefined) {
    defaultSizeName = options.sizeName;
  }
  if (options.totalName !== undefined) {
    defaultTotalName = options.totalName;
  }
  if (options.dispatchSizeName !== undefined) {
    defaultDispatchSizeName = options.dispatchSizeName;
  }
  if (options.dispatchCurrentName !== undefined) {
    defaultDispatchCurrentName = options.dispatchCurrentName;
  }
  if (options.size !== undefined) {
    defaultSize = options.size;
  }
}

// @ts-ignore
TablePage.config = setConfig;
// @ts-ignore
TablePage.displayName = 'CoolTablePage';

export default TablePage;
