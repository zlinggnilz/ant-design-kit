import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import { Modal, message, Skeleton } from 'antd';
import Form from '../Form';
import { ModalProp, ConfigOptionsType } from './inerface';

/**
 * ///// Props: /////
 * title: 标题
 * formData: 默认{}, 表单初始数据
 * formDataLoading: 异步获取表单数据时的loading
 * formAttr: [], 表单项属性
 * payload: 默认{}, 表单提交时放入data中一起提交
 * onSubmit: function 表单提交，需返回Promise
 * onCancel
 * okText '保存' 按钮文字
 * cancelText '取消'  按钮文字
 * modalProps Modal 上的其他属性
 * cancelMessage
 * successMessage
 * formProps Form 上的其他属性
 *
 * ---------------------------------------
 *
 * ///// Method: /////
 * open: 打开modal,【通过 ref 来调用】
 * close: 关闭modal,一般情况下,不需要主动调用
 *
 */

let defaultFormProps: Object = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
};

let defaultModalProps = {};

const ModalForm = forwardRef((props: ModalProp, ref) => {
  const {
    onCancel,
    onSubmit,
    successMessage,
    cancelMessage = false,
    title,
    formAttr,
    formData = {},
    okText,
    cancelText,
    formProps,
    modalProps,
    children,
    formDataLoading,
  } = props;

  const [visible, setvisible] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);
  const formRef = useRef<any>();

  const open = () => {
    setvisible(true);
  };

  const close = (e?: any) => {
    setvisible(false);

    onCancel && onCancel(e);
  };

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
      ...formRef.current,
    }),
    [],
  );

  const handleOk = () => {
    formRef.current.submit();
  };

  const handleSubmit = (data: any) => {
    const handleAction = onSubmit(data);

    if (!(handleAction && handleAction.then)) {
      close();
      console.error(`ModalForm onSubmit should return Promise`);
      return;
    }

    setsubmitLoading(true);

    handleAction.then(
      function() {
        successMessage !== false &&
          message.success(successMessage || title + '成功');
        close();
        setsubmitLoading(false);
      },
      function(err: any) {
        console.log(err);
        cancelMessage !== false &&
          message.error(cancelMessage || title + '失败');
        setsubmitLoading(false);
      },
    );
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={close}
      onOk={handleOk}
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      confirmLoading={submitLoading}
      okText={okText}
      cancelText={cancelText}
      {...defaultModalProps}
      {...modalProps}
    >
      {children}
      <Skeleton active loading={formDataLoading}>
        <Form
          preserve={false}
          ref={formRef}
          data={formData}
          formAttr={formAttr}
          onSubmit={handleSubmit}
          showAction={false}
          {...defaultFormProps}
          {...formProps}
        />
      </Skeleton>
    </Modal>
  );
});

function setConfig(options: ConfigOptionsType) {
  if (options.formProps != null) {
    defaultFormProps = options.formProps;
  }
  if (options.modalProps != null) {
    defaultModalProps = options.modalProps;
  }
}
// @ts-ignore
ModalForm.config = setConfig;
ModalForm.displayName = 'CoolModalForm';

export default ModalForm;
