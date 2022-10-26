import type { ModalProps } from 'antd/lib/modal';
import type { FormAttrFieldType } from '../Form/interface';

export interface ModalProp extends ModalProps {
  // onCancel?: Function;
  onSubmit: Function;
  successMessage?: boolean | string;
  cancelMessage?: boolean | string;
  title?: any;
  formAttr?: FormAttrFieldType[];
  formData?: any;
  okText?: string;
  cancelText?: string;
  formProps?: Object;
  modalProps?: Object;
  children?: any;
  formDataLoading?: boolean;
}

export interface ConfigOptionsType {
  formProps?: object;
  modalProps?: object;
}
