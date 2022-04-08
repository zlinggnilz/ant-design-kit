import React, { useRef, useMemo, memo } from 'react';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';
import isEmpty from 'lodash.isempty';
import Block from './Block';
import './style/index.less';

type sizeType = 'default' | 'large' | 'small';
type loadingType = 'block' | 'spin';

interface emtpyProp {
  loading?: boolean;
  data?: any;
  showEmpty?: boolean;
  error?: boolean;
  children?: any;
  type?: loadingType;
  size?: sizeType;
  errorFallback?: any;
  emptyFallback?: any;
  errorDescription?: any;
  emptyDescription?: any;
  errorProps?: Object;
  emptyProps?: Object;
  reRender?: boolean;
}

interface ConfigOptionsType {
  errorFallback?: any;
  emptyFallback?: any;
  errorProps?: Object;
  emptyProps?: Object;
  emptyDescription?: any;
  errorDescription?: any;
}

let defaultErrorFallback: any;
let defaultEmptyFallback: any;
let defaultErrorDescription: any = '获取数据出错了, 请稍后重试';
let defaultEmptyDescription: any;
let defaultErrorProps = {};
let defaultEmptyProps = {};

const DataEmptyCont = (props: emtpyProp) => {
  const {
    loading,
    data,
    showEmpty = true,
    error,
    children,
    size = 'default',
    errorFallback = defaultErrorFallback,
    emptyFallback = defaultEmptyFallback,
    errorDescription = defaultErrorDescription,
    emptyDescription = defaultEmptyDescription,
    errorProps = defaultErrorProps,
    emptyProps = defaultEmptyProps,
  } = props;
  const cls = classNames({
    'cool-empty-large': size === 'large',
    'cool-empty-default': size === 'default',
    'cool-empty-small': size === 'small',
  });

  if (error && !loading) {
    return (
      errorFallback || (
        <Empty
          className={cls}
          description={
            <span className="cool-empty-des">{errorDescription}</span>
          }
          {...errorProps}
        />
      )
    );
  }

  if (showEmpty && !loading && isEmpty(data)) {
    return (
      emptyFallback || (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyDescription}
          style={{ margin: '20px 0' }}
          {...emptyProps}
        />
      )
    );
  }

  return children;
};

const DataEmptyWrap: React.MemoExoticComponent<any> = memo(DataEmptyCont);

const DataEmpty = (props: emtpyProp) => {
  const {
    loading,
    children,
    reRender = false,
    type = 'block',
    data,
    ...rest
  } = props;
  const cls = loading ? 'cool-loading-wrap' : undefined;
  const currentIndex = useRef(0);
  const loadkey = useMemo(
    () => (loading ? currentIndex.current : ++currentIndex.current),
    [loading],
  );

  if (type === 'block') {
    return (
      <DataEmptyWrap loading={loading} data={data} {...rest}>
        {loading ? <Block /> : children}
      </DataEmptyWrap>
    );
  }

  return (
    <DataEmptyWrap loading={loading} data={data} {...rest}>
      {children ? (
        <Spin
          spinning={!!loading}
          wrapperClassName={cls}
          key={reRender ? loadkey : undefined}
        >
          {children}
        </Spin>
      ) : (
        <div style={{ textAlign: 'center', padding: 10 }}>
          <Spin spinning={!!loading} />
        </div>
      )}
    </DataEmptyWrap>
  );
};

function setConfig(options: ConfigOptionsType) {
  if (options.errorFallback !== undefined) {
    defaultErrorFallback = options.errorFallback;
  }
  if (options.emptyFallback !== undefined) {
    defaultEmptyFallback = options.emptyFallback;
  }
  if (options.errorProps !== undefined) {
    defaultErrorProps = options.errorProps;
  }
  if (options.emptyProps !== undefined) {
    defaultEmptyProps = options.emptyProps;
  }
  if (options.errorDescription !== undefined) {
    defaultErrorDescription = options.errorDescription;
  }
  if (options.emptyDescription !== undefined) {
    defaultEmptyDescription = options.emptyDescription;
  }
}

DataEmpty.displayName = 'CoolDataEmpty';

DataEmpty.config = setConfig;

export default memo(DataEmpty);
