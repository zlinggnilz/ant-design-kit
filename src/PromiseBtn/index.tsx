import React from 'react';
import ConfirmBtn from '../ConfirmBtn';
import type { ConfirmTypes } from '../ConfirmBtn/interface';

const PromiseBtn = React.memo(
  ({ children, type = 'button', onClick, ...rest }: ConfirmTypes) => {
    return (
      <ConfirmBtn type={type} onOk={onClick} pop={false} {...rest}>
        {children}
      </ConfirmBtn>
    );
  },
);

PromiseBtn.displayName = 'CoolPromiseBtn';

export default PromiseBtn;
