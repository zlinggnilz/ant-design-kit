import React from 'react';
import { Select } from 'antd';
// import 'antd/es/select/style';

const CustomSelect = ({
  dataSource = [],
  labelSearch = true,
  valueSearch = false,
  ...rest
}) => {
  const filterOption = (v: any, option: any): boolean => {
    const { label, value } = option;
    const keyword = (v || '').trim().toLowerCase();
    if (!keyword) {
      return true;
    }
    const vv = `${value}`.toLowerCase();
    const labelV = label == null ? '' : `${label}`;
    return (
      labelV.toLowerCase().includes(keyword) ||
      (valueSearch && vv.includes(keyword))
    );
  };
  return (
    <Select
      allowClear
      options={dataSource}
      showSearch
      {...rest}
      filterOption={filterOption}
    />
  );
};

export default React.memo(CustomSelect);
