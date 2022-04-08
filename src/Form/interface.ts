import * as React from 'react';
import { FormProps } from 'antd/lib/Form';

export type MounseFnType = React.MouseEventHandler<HTMLElement>;

type FieldTypes =
  | 'text'
  | 'email'
  | 'textarea'
  | 'select'
  | 'int'
  | 'number'
  | 'radio'
  | 'checkbox'
  | 'url'
  | 'group';

type FormAttrType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'select'
  | 'int'
  | 'number'
  | 'radio'
  | 'checkbox'
  | 'url'
  | 'group'
  | 'onlyLabel';

type FormLayoutType = 'horizontal' | 'inline' | 'vertical';

interface FType {
  formProps?: Object;
  fieldProps?: Object;
  label?: any;
  name?: string | number | (string | number)[];
  key?: string | number | (string | number)[];
  fieldKey?: any;
  rules?: Array<any>;
  component?: any;
  required?: boolean;
  message?: string;
  shouldUpdate?: any;
  editable?: boolean;
  viewComponent?: any;
  shouldRender?: boolean;
}

export interface CreateFieldType extends FType {
  type?: FieldTypes;
  children?: any;
}

export interface FormAttrFieldType extends FType {
  type: FormAttrType;
  children?: FormAttrFieldType[];
}

export interface ColType {
  span?: Number | string;
  offset?: Number | string;
  xs?: Object;
  sm?: Object;
  md?: Object;
  lg?: Object;
  xl?: Object;
  xxl?: Object;
  prefixCls?: string;
}

export interface FormProp extends FormProps {
  data?: Object;
  editable?: boolean;
  layout?: FormLayoutType;
  formAttr?: FormAttrFieldType[];
  scrollToFirstError?: boolean;
  showAction?: boolean;
  wrapperCol?: Object;
  labelCol?: Object;
  onCancel?: MounseFnType;
  cancelText?: any;
  onSubmit?: Function;
  submitText?: any;
  cancelAction?: any;
  submitAction?: any;
  submitButtonProps?: object;
  cancelButtonProps?: object;
  loading?: boolean;
  children?: any;
  actionCol?: Object;
  className?: string;
  extra?: any;
  // onFinishFailed?: Function;
}

export interface ConfigOptionsType {
  labelCol?: ColType;
  wrapperCol?: ColType;
  onCancel?: MounseFnType;
  cancelText?: any;
  submitText?: any;
  submitButtonProps?: object;
  cancelButtonProps?: object;
}
