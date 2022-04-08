import React, { useState, memo } from 'react';
import { Switch, message } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

interface ConfirmSwitchTypes extends Omit<SwitchProps, 'onChange'> {
  onChange: Function;
  checked?: boolean;
  enableMessage?: string;
  disableMessage?: string;
}

const ConfirmSwitch = ({
  onChange,
  checked,
  enableMessage = '启用',
  disableMessage = '禁用',
  ...rest
}: ConfirmSwitchTypes) => {
  const [loading, setloading] = useState(false);
  const [checkedValue, setcheckedValue] = useState(checked || false);

  const handleChange = (...v: any) => {
    if (loading) {
      return;
    }

    if (!onChange) {
      return;
    }

    const handle = onChange(...v);

    if (!(handle && handle.then)) {
      console.error('ConfirmSwitch onChange should return Promise');
      return;
    }

    setloading(true);

    return handle.then(
      function() {
        const v = !checkedValue;
        setcheckedValue(v);
        if (v) {
          enableMessage && message.success(enableMessage + '成功');
        } else {
          enableMessage && message.success(disableMessage + '成功');
        }
        setloading(false);
      },
      function(err: any) {
        // console.log(err);
        setloading(false);
      },
    );
  };

  return (
    <Switch
      {...rest}
      checked={checkedValue}
      loading={loading}
      onChange={handleChange}
    />
  );
};
ConfirmSwitch.displayName = 'CoolConfirmSwitch';

export default memo(ConfirmSwitch);
