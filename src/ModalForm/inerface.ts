import { FormAttrFieldType } from '../Form/interface';
import { ModalProps } from 'antd/lib/modal';

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
