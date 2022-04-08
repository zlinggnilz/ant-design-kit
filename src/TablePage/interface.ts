type ListType = 'list' | 'table';

export interface TablePageProp {
  columns?: Array<any>;
  dispatch?: Function;
  rowKey?: any;
  pagination?: any;
  payload?: Object;
  params?: Object;
  pageData?: Object;
  needPage?: boolean;
  renderItem?: Function;
  loading?: boolean;
  dataSource?: Array<any>;
  type?: string;
  listType?: ListType;
  currentName?: string;
  sizeName?: string;
  totalName?: string;
  dispatchSizeName?: string;
  dispatchCurrentName?: string;
  onChange?: Function;
  rowSelection?: any;
  childrenColumnName?: any;
  [propertys: string]: any;
}

export interface ConfigOpionType {
  currentName?: string;
  sizeName?: string;
  totalName?: string;
  dispatchSizeName?: string;
  dispatchCurrentName?: string;
  size?: number;
}
