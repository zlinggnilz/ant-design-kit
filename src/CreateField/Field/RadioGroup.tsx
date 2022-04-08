import React from 'react';
import { Radio } from 'antd';

const CustomRadio = ({ dataSource = [], ...rest }) => {
  return <Radio.Group options={dataSource} {...rest} />;
};

export default React.memo(CustomRadio);
