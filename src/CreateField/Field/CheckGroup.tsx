import React from 'react';
import { Checkbox } from 'antd';
// import 'antd/es/checkbox/style';

const CustomCheck = ({ dataSource, ...rest }: any) => {
  return <Checkbox.Group options={dataSource} {...rest} />;
};

export default React.memo(CustomCheck);
