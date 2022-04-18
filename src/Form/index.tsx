import React, {
  useMemo,
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  memo,
} from 'react';
import { Button, Form } from 'antd';
import { formTrim } from '../_utils';
import CreateField from '../CreateField';
import { messages } from './data';
import classnames from 'classnames';
import get from 'lodash.get';
import {
  FormAttrFieldType,
  MounseFnType,
  ColType,
  FormProp,
  ConfigOptionsType,
} from './interface';
import './style/index.less';

/**
 *
 * formAttr 元素说明:
 * { label, key, type, fieldProps, formProps, rules, required, message }
 * 如果 required 为 true, 与 message 生成第一条 rule, message 有默认值, 将拼接 rules
 * fieldProps 将放在控件上
 * formProps 将放在 FormItem 上
 */

let defaultLabelCol: ColType = {
  xs: { span: 24 },
  sm: { span: 5 },
};
let defaultWrapperCol: ColType = {
  xs: { span: 24 },
  sm: { span: 15 },
};

let defaultOnCancel: MounseFnType;
let defaultCancelText = '重置';
let defaultSubmitText = '提交';
let defaultSubmitButtonProps = {};
let defaultCancelButtonProps = {};

const getCol = (wrapperCol: ColType = {}, labelCol: ColType = {}) => {
  const obj: ColType = {};

  const getOffset = (k: string) => {
    const v = get(labelCol[k], 'span', 0);
    return v === 24 ? 0 : v;
  };

  if (wrapperCol.span) {
    const span = wrapperCol.span;
    obj.span = span;
    obj.offset = span === 24 ? 0 : labelCol.span || 0;
  } else {
    const keys = Object.keys(wrapperCol);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      obj[k] = { span: get(wrapperCol[k], 'span', 24), offset: getOffset(k) };
    }
  }
  return { wrapperCol: obj };
};

const CoolForm = forwardRef((props: FormProp, ref) => {
  const {
    data = {},
    editable = true,
    layout = 'horizontal',
    formAttr = [],
    scrollToFirstError = true,
    showAction = true,
    wrapperCol = defaultWrapperCol,
    labelCol = defaultLabelCol,
    cancelText = defaultCancelText,
    submitText = defaultSubmitText,
    submitButtonProps,
    cancelButtonProps,
    loading,
    onSubmit,
    cancelAction,
    submitAction,
    children,
    actionCol,
    className,
    extra,
    onCancel,
    onFinishFailed,
    ...rest
  } = props;

  const wrapRef = useRef<any>();

  const [form] = Form.useForm();

  const { this_tailLayout, this_wrapperCol, this_labelCol } = useMemo(() => {
    const this_tailLayout =
      layout !== 'horizontal' || 'actionCol' in props
        ? actionCol
        : getCol(wrapperCol, labelCol);
    const this_wrapperCol = layout !== 'horizontal' ? {} : wrapperCol;
    const this_labelCol = layout !== 'horizontal' ? {} : labelCol;
    return {
      this_tailLayout,
      this_wrapperCol,
      this_labelCol,
    };
  }, [wrapperCol, labelCol, layout, actionCol]);

  const formSubmitAction = useMemo(
    () =>
      'submitAction' in props ? (
        submitAction
      ) : (
        <Button
          htmlType="submit"
          type="primary"
          className="cool-form-btn"
          loading={loading}
          {...defaultSubmitButtonProps}
          {...submitButtonProps}
        >
          {submitText}
        </Button>
      ),
    [submitAction, loading, submitText],
  );

  const resetFields = useCallback(() => {
    console.log('reset');
    form.resetFields();
  }, []);

  const formCancelAction = useMemo(
    () =>
      'cancelAction' in props ? (
        cancelAction
      ) : (
        <Button
          // type='primary'
          // ghost
          onClick={onCancel || defaultOnCancel || resetFields}
          className="cool-form-btn"
          disabled={loading}
          {...defaultCancelButtonProps}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
      ),
    [cancelAction, loading, cancelText],
  );

  // const submit = useCallback(() => {
  //   form.submit();
  // }, []);

  useImperativeHandle(ref, () => form, []);

  const onFinish = useCallback(values => {
    if (editable) {
      onSubmit && onSubmit(formTrim(values));
    }
  }, []);

  const handleFinishFailed = useCallback(datas => {
    const { values, errorFields, outOfDate } = datas;
    const nameId = errorFields[0].name.join('_');

    if (scrollToFirstError) {
      const errIdEl = wrapRef.current.querySelector(`#${nameId}`);
      if (errIdEl) {
        // form.scrollToField(errorFields[0].name);
        errIdEl.scrollIntoViewIfNeeded({
          scrollMode: 'if-needed',
          block: 'center',
        });
      } else {
        setTimeout(() => {
          const errEl = wrapRef.current.querySelector(
            '.ant-form-item-explain-error',
          );
          if (!errEl) {
            return;
          }
          errEl.scrollIntoViewIfNeeded({
            scrollMode: 'if-needed',
            block: 'center',
          });
        }, 60);
      }
    }

    onFinishFailed && onFinishFailed(datas);
  }, []);

  const wrap = memo(({ children, ...rest }) => (
    <form ref={wrapRef} {...rest}>
      {children}
    </form>
  ));

  return (
    <Form
      className={classnames('cool-form', className, {
        'cool-form-view': !editable,
        'cool-form-inline': layout === 'inline',
      })}
      form={form}
      layout={layout}
      onFinish={onFinish}
      labelCol={this_labelCol}
      wrapperCol={this_wrapperCol}
      initialValues={data}
      validateMessages={messages}
      onFinishFailed={handleFinishFailed}
      {...rest}
      component={wrap}
    >
      {getFormFields(formAttr, editable)}
      {children}
      {showAction && editable && (
        <Form.Item {...this_tailLayout} className="cool-form-action">
          {formSubmitAction}
          {formCancelAction}
        </Form.Item>
      )}
      {extra}
    </Form>
  );
});

function getFormFields(arr: FormAttrFieldType[], editable: boolean = true) {
  if (!Array.isArray(arr)) {
    console.error('>> Form getField << arguement should be Array.');
    return null;
  }

  return arr.map((item, index) => getFormItem(item, index, editable));
}
function getFormItem(
  item: FormAttrFieldType,
  index: number,
  editable: boolean,
) {
  if ('shouldRender' in item && !item.shouldRender) {
    return null;
  }
  const itemName = item.name || item.key;
  const itemKey = itemName ? JSON.stringify(itemName) : '';

  if ('shouldUpdate' in item) {
    return (
      <Form.Item
        noStyle
        key={itemKey || `should-update-${index}`}
        shouldUpdate={item.shouldUpdate}
      >
        {item.component}
      </Form.Item>
    );
  }
  if (item.type === 'group') {
    return React.cloneElement(item.component, {
      key: itemKey || `group-${index}`,
    });
  }
  if (item.type === 'onlyLabel') {
    return (
      <div
        className="cool-form-only-label"
        key={itemKey || `only-label-${index}`}
      >
        {item.label}
      </div>
    );
  }

  if (item.children) {
    return (
      <div className="cool-form-block" key={itemKey || `block-${index}`}>
        <div className="cool-form-block-title">{item.label}</div>
        {getFormFields(item.children, editable)}
      </div>
    );
  }

  const { shouldRender, children, type, ...restItem } = item;

  return (
    <CreateField
      type={type}
      editable={editable}
      {...restItem}
      key={itemKey || `form-field-${index}`}
      name={itemName}
    />
  );
}

function setFormConfig(options: ConfigOptionsType) {
  if (options.labelCol !== undefined) {
    defaultLabelCol = options.labelCol;
  }
  if (options.wrapperCol !== undefined) {
    defaultWrapperCol = options.wrapperCol;
  }
  if (options.onCancel !== undefined) {
    defaultOnCancel = options.onCancel;
  }
  if (options.cancelText !== undefined) {
    defaultCancelText = options.cancelText;
  }
  if (options.submitText !== undefined) {
    defaultSubmitText = options.submitText;
  }
  if (options.cancelText !== undefined) {
    defaultCancelText = options.cancelText;
  }
  if (options.submitButtonProps !== undefined) {
    defaultSubmitButtonProps = options.submitButtonProps;
  }
}

// @ts-ignore
CoolForm.getField = getFormFields;
// @ts-ignore
CoolForm.config = setFormConfig;

// @ts-ignore
CoolForm.List = Form.List;
// @ts-ignore
CoolForm.Item = Form.Item;
// @ts-ignore
CoolForm.ErrorList = Form.ErrorList;
// @ts-ignore
CoolForm.Provider = Form.Provider;

CoolForm.displayName = 'CoolForm';

export default memo(CoolForm);
