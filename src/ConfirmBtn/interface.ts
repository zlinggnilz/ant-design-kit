declare type BtnType = 'a' | 'button';
declare type ModeType = 'popover' | 'modal';

export interface ConfirmTypes {
  onOk?: Function;
  onCancel?: any;
  children?: any;
  text?: any;
  title?: any;
  content?: any;
  type?: BtnType;
  mode?: ModeType;
  okText?: string;
  cancelText?: string;
  buttonProps?: Object;
  disabled?: boolean;
  pop?: boolean;
  style?: any;
  className?: string;
  // onClick?: Function;
  successMessage?: string | boolean;
  [propertys: string]: any;
}
