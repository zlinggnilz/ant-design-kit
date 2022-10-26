import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  Fragment,
  useMemo,
} from 'react';
import Form from '../Form';
import TablePage from '../TablePage';
import type { ContentTableProp, ConfigOpionType } from './interface';
import classnames from 'classnames';
import './style/index.less';

let defaultSubmitText = '查询';
let defaultCancelText = '重置';
let defaultFormProps = {};
let defaultShowRest = false;

const ContentTable = React.forwardRef((props: ContentTableProp, ref) => {
  const {
    searchValueFn,
    searchQueryFn,
    formAttr,
    extra,
    tableProps = {},
    listProps = {},
    formProps = {},
    children,
    showReset = defaultShowRest,
    formWrapClassName,
    type,
    payload = {},
    listType = 'table',
    ...rest
  } = props;

  const formData = useMemo(() => {
    const d = formProps.data;
    if (!d) {
      return {};
    }
    return searchValueFn ? searchValueFn(d) : d;
  }, []);

  const formRef = useRef<any>();
  const tableRef = useRef<any>();

  const handleSearch = (values: any) => {
    const data = searchValueFn ? searchValueFn(values) : values;

    tableRef.current.getList(1, data);
  };

  useImperativeHandle(ref, () => ({
    ...tableRef.current,
    ...formRef.current,
  }));

  const otherProps = listType === 'table' ? tableProps : listProps;

  const formPropsObj = showReset
    ? formProps
    : { cancelAction: null, ...defaultFormProps, ...formProps };

  const formCls = classnames(
    formWrapClassName,
    'cool-content-search-wrap cool-flex',
  );

  return (
    <Fragment>
      {((formAttr && formAttr.length) || extra) && (
        <div className={formCls}>
          <div className={classnames('cool-flex-box cool-search-form-wrap')}>
            {formAttr && (
              <Form
                className="cool-search-form"
                ref={formRef}
                formAttr={formAttr}
                layout="inline"
                onSubmit={handleSearch}
                submitText={defaultSubmitText}
                cancelText={defaultCancelText}
                {...formPropsObj}
              />
            )}
          </div>
          <div className="cool-nowrap">{extra}</div>
        </div>
      )}

      {children && <div className="cool-content-children">{children}</div>}

      <div className="cool-content-table-wrap">
        <TablePage
          ref={tableRef}
          listType={listType}
          payload={{ ...formData, ...payload }}
          type={type}
          {...rest}
          {...otherProps}
        />
      </div>
    </Fragment>
  );
});

export function setConfig(options: ConfigOpionType) {
  if (options.submitText !== undefined) {
    defaultSubmitText = options.submitText;
  }
  if (options.cancelText !== undefined) {
    defaultCancelText = options.cancelText;
  }
  if (options.formProps !== undefined) {
    defaultFormProps = options.formProps;
  }
  if (options.showReset !== undefined) {
    defaultShowRest = options.showReset;
  }
}

ContentTable.displayName = 'CoolContentTable';

export default React.memo(ContentTable);
