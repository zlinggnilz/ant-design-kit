import { TablePageProp } from '../TablePage/interface';
import { FormAttrFieldType } from '../Form/interface';

export interface ContentTableProp extends TablePageProp {
  searchValueFn?: Function;
  searchQueryFn?: Function;
  formAttr?: FormAttrFieldType[];
  extra?: any;
  tableProps?: Object;
  listProps?: Object;
  formProps?: { data?: any };
  children?: any;
  replaceLocation?: boolean;
  showReset?: boolean;
  formClassName?: string;
}

export type rowKeyType = string | number;

export interface ResultAllProp extends ContentTableProp {
  showSelect?: boolean;
  showSelectInfo?: boolean;
  showResultAll?: boolean;
  rowDisable?: any;
  onTableSelectChange?: Function;
  columnTitle?: any;
  selected?: rowKeyType[];
}

export interface ConfigOpionType {
  submitText?: string;
  cancelText?: string;
  showReset?: boolean;
  formProps?: Object;
}
