import React, { useMemo, Fragment, memo } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { urlReg } from '../_utils';
import CheckGroup from './Field/CheckGroup';
import RadioGroup from './Field/RadioGroup';
import Select from './Field/Select';
import { CreateFieldType } from '../Form/interface';

const Textarea = Input.TextArea;

const FormItem = Form.Item;

/**
 * 具体查看 Form/index 说明
 * type 基础组件类型( text, select, int, number, url, textarea,checkbox,radio)
 * name
 * rules
 * fieldProps
 * formProps
 * children, component 作用一样
 * required
 * message
 */

const getItems = (type?: string, label?: any, required?: boolean) => {
  let rule: any[] = [];
  let field: any;
  let message = '请输入';
  switch (type) {
    case 'text':
      field = <Input type="text" allowClear />;
      break;
    case 'email':
      field = <Input type="text" allowClear />;
      rule = [{ type: 'email' }];
      break;
    case 'textarea':
      field = <Textarea rows={3} />;
      break;
    case 'int':
      field = <InputNumber min={0} precision={0} style={{ width: '100%' }} />;
      rule = [
        () => ({
          async validator(_: any, v: any) {
            return new Promise((resolve, reject) => {
              if (!v || Number.isInteger(v)) {
                resolve(true);
              } else {
                reject('请填写整数');
              }
            });
          },
        }),
      ];
      break;
    case 'select':
      field = <Select />;
      message = '请选择';
      break;
    case 'float':
    case 'number':
      field = <InputNumber min={0} style={{ width: '100%' }} />;
      rule = [
        () => ({
          async validator(_: any, v: any) {
            return new Promise((resolve, reject) => {
              if (!v || typeof v === 'number') {
                resolve(true);
              } else {
                reject('请填写数字');
              }
            });
          },
        }),
      ];
      break;
    case 'radio':
      field = <RadioGroup />;
      message = '请选择';
      break;
    case 'checkbox':
      field = <CheckGroup />;
      message = '请选择';
      break;
    case 'url':
      field = <Input type="text" allowClear />;
      rule = [
        () => ({
          async validator(_: any, value: any) {
            return new Promise((resolve, reject) => {
              if (!(value || '').trim() || urlReg.test(value)) {
                resolve(true);
              } else {
                reject('请填写正确的 url 链接');
              }
            });
          },
        }),
      ];
      break;
    default:
      field = <Input type="text" allowClear />;
  }
  const msg =
    typeof label === 'string' ? (
      message + label
    ) : (
      <Fragment>{label}不能为空</Fragment>
    );
  return [rule, field, msg];
};

const CreateField = (props: CreateFieldType) => {
  const {
    formProps = {},
    label,
    name,
    fieldKey,
    type,
    rules = [],
    fieldProps = {},
    children,
    component,
    required,
    message,
    shouldUpdate,
    editable = true,
    viewComponent,
  } = props;
  // let myRule = required ? [{ required: true, message }] : []
  let myRule: any[];
  let myField;
  let rule: any[];
  let msg: any;
  let myType: any = type;

  const customComponent = component || children;

  if ('shouldRender' in props && !props.shouldRender) {
    return null;
  }

  if ('shouldUpdate' in props) {
    return (
      <FormItem noStyle shouldUpdate={shouldUpdate}>
        {customComponent}
      </FormItem>
    );
  }
  if (type === 'group') {
    return React.cloneElement(customComponent, {
      disabled: !editable,
    });
  }

  if (customComponent) {
    myField = customComponent;
    myType = 'custom';
    myRule = useMemo(
      () =>
        required
          ? [
              {
                required: true,
                message: message || <Fragment>{label}不能为空</Fragment>,
              },
            ]
          : [],
      [required],
    );
  } else {
    // [rule, myField, msg] = getItems(type, label, required);
    [rule, myField, msg] = useMemo(() => getItems(type, label, required), [
      type,
      label,
      required,
    ]);
    // myRule = required ? [{ required: true, message: message || msg }] : [];
    myRule = useMemo(
      () =>
        required
          ? [{ required: true, message: message || msg }, ...rule]
          : rule,
      [required, message, msg, rule],
    );
    // myRule = [...myRule, ...rule];
  }

  const rulesArr = useMemo(() => [...myRule, ...rules], [myRule, rules]);
  const c =
    typeof myField === 'function'
      ? myField
      : React.cloneElement(myField, {
          placeholder: label,
          disabled: !editable,
          ...myField.props,
          ...fieldProps,
        });

  if (!editable) {
    return (
      <FormItem
        label={label}
        name={name}
        fieldKey={fieldKey}
        rules={rulesArr}
        {...formProps}
      >
        {React.cloneElement(viewComponent || c, {
          disabled: true,
          type: myType,
        })}
      </FormItem>
    );
  }
  return (
    <FormItem
      validateFirst
      label={label}
      name={name}
      fieldKey={fieldKey}
      rules={rulesArr}
      {...formProps}
    >
      {c}
    </FormItem>
  );
};

CreateField.displayName = 'CreateField';

export default memo(CreateField);
