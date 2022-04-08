import React, { useState, memo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm, Button, Modal, message } from 'antd';
import classnames from 'classnames';
import { ConfirmTypes } from './interface';
import './style/index.less';

/**
 * Comfirm Pop
 * onOk 点击确认触发, 需返回 promise
 * onCancel 点击取消触发
 * text:  a 或 button 的文字
 * title: Pop 显示的标题
 * type: a | button
 * mode: popover | modal
 */

const ConfirmBtn = ({
  onOk,
  onCancel,
  children = '删除',
  text,
  title = '确定删除吗？',
  type = 'a',
  mode = 'popover',
  buttonProps = {},
  disabled = false,
  okText = '确定',
  cancelText = '取消',
  content,
  pop = true,
  style,
  className,
  onClick,
  successMessage,
  ...rest
}: ConfirmTypes) => {
  const [loading, setloading] = useState(false);

  const handleConfirm = () => {
    if (loading) {
      return;
    }

    if (typeof onOk !== 'function') {
      console.error('ConfirmBtn Props: onOk is not a function');
      return;
    }

    const handle: Promise<any> = onOk();

    if (!(handle && handle.then)) {
      console.error('ConfirmBtn onOk should return Promise');
      return;
    }

    setloading(true);

    return handle.then(
      function() {
        // if (pop) {
        successMessage !== false &&
          message.success(successMessage || (children || text) + '成功');
        // }
        setloading(false);
      },
      function(err: any) {
        // console.log(err);
        setloading(false);
      },
    );
  };

  const handleConfirmClick = () => {
    onClick && onClick();

    Modal.confirm({
      title,
      content,
      onOk: handleConfirm,
      okText,
      cancelText,
      onCancel,
    });
  };

  const handleVisibleChange = (v: boolean) => {
    if (v) {
      onClick && onClick();
    }
  };

  const btnOnlyHandleConfirm = () => {
    onClick && onClick();

    handleConfirm();
  };

  if (mode === 'modal') {
    return type === 'a' ? (
      <a
        {...rest}
        onClick={handleConfirmClick}
        style={style}
        className={className}
      >
        {children || text}
      </a>
    ) : (
      <Button
        type="primary"
        {...buttonProps}
        {...rest}
        disabled={disabled}
        onClick={handleConfirmClick}
        style={style}
        className={className}
      >
        {children || text}
      </Button>
    );
  }

  const btn =
    type === 'a' ? (
      <a
        {...rest}
        onClick={!pop ? btnOnlyHandleConfirm : undefined}
        className={classnames('cool-confirm-btn', className, {
          'cool-confirm-btn-loading': loading,
        })}
        style={style}
      >
        <span className="cool-confirm-btn-text">{children || text}</span>
        {loading && (
          <span className="cool-confirm-btn-icon">
            <LoadingOutlined />
          </span>
        )}
      </a>
    ) : (
      <Button
        type="primary"
        {...buttonProps}
        {...rest}
        onClick={!pop ? btnOnlyHandleConfirm : undefined}
        className={className}
        style={style}
        loading={loading}
        disabled={disabled}
      >
        {children || text}
      </Button>
    );

  if (!pop) {
    return btn;
  }

  return (
    <Popconfirm
      title={title}
      disabled={loading || disabled}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      onVisibleChange={handleVisibleChange}
    >
      {btn}
    </Popconfirm>
  );
};

ConfirmBtn.displayName = 'CoolConfirmBtn';

export default memo(ConfirmBtn);
