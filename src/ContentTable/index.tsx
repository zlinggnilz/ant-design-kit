import React, { useState, useMemo, useEffect, memo } from 'react';
import { Checkbox, Dropdown, Menu } from 'antd';
import { flattenData } from '../_utils';
import { useCompare } from '../hooks/useMemoCompare';
import CTable, { setConfig } from './CTable';
import { ResultAllProp, rowKeyType } from './interface';

/**
 * showSelect 显示选择
 * showSelectInfo 已选择几个文字信息
 * showResultAll 显示 本页全选/结果全选
 * onTableSelectChange // function 选择发生变化时
 * rowDisable // function 用在 selections disabled
 * columnTitle
 */

const CustomResultAllTable = React.forwardRef((props: ResultAllProp, ref) => {
  const {
    showSelect = false,
    showSelectInfo = true,
    showResultAll = false,
    rowDisable,
    onTableSelectChange,
    columnTitle,
    selected,
    dataSource = [],
    rowKey = 'sid',
    children,
    rowSelection,
    childrenColumnName = 'children',
    ...rest
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<rowKeyType[]>([]);
  const [selectedRows, setSelectedRows] = useState<Array<any>>([]);
  const [resultAllSelect, setResultAllSelect] = useState(false);
  // const hasSelected = useMemo(() => selectedRowKeys.length > 0, [
  //   selectedRowKeys,
  // ]);
  const selectedRowKeysChange = useCompare([], selectedRowKeys);
  const resultAllSelectChange = useCompare(false, resultAllSelect);
  const getRowKey = React.useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: Object) => record[rowKey];
  }, [rowKey]);

  const flattedData = useMemo(() => {
    // if (!Array.isArray(dataSource)) {
    //   console.error('Table dataSource should be ARRAY');
    //   return [];
    // }
    return flattenData(dataSource, childrenColumnName);
  }, [dataSource, childrenColumnName]);

  const recordRows = flattedData.filter(record =>
    rowDisable ? !rowDisable(record) : true,
  );
  const recordKeys: rowKeyType[] = recordRows.map(getRowKey);
  const checkedCurrentAll =
    recordKeys.length > 0 &&
    recordKeys.every(key => selectedRowKeys.includes(key));

  useEffect(() => {
    return () => {
      if (!showSelect) {
        return;
      }

      setSelectedRowKeys([]);

      setSelectedRows([]);

      setResultAllSelect(false);
    };
  }, [dataSource]);

  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(selectedRowKeys)) {
      setSelectedRowKeys(selected || []);
      setResultAllSelect(false);
    }
  }, [selected]);

  // const hasSelected = selectedRowKeys && selectedRowKeys.length > 0;
  const extraContent =
    showSelect &&
    showSelectInfo &&
    (resultAllSelect ? (
      <span className="cool-mr-16">结果全选</span>
    ) : (
      selectedRowKeys &&
      selectedRowKeys.length > 0 && (
        <span className="cool-mr-16">已选择 {selectedRowKeys.length} 项</span>
      )
    ));

  useEffect(() => {
    if (!showSelect) {
      return;
    }
    if (selectedRowKeysChange || resultAllSelectChange) {
      onTableSelectChange &&
        onTableSelectChange({
          type: resultAllSelect ? 'resultAll' : 'currentPage',
          selectedRowKeys,
          selectedRows,
        });
    }
  }, [selectedRowKeys, resultAllSelect]);

  function filerRows(arr: Array<any>) {
    return rowDisable ? arr.filter(item => !rowDisable(item)) : arr;
  }

  if (!showSelect) {
    return (
      <CTable
        ref={ref}
        dataSource={dataSource}
        rowKey={rowKey}
        rowSelection={rowSelection}
        childrenColumnName={childrenColumnName}
        {...rest}
      >
        {children}
      </CTable>
    );
  }

  // function resultAllChange(e) {
  //   const v = e.target.checked;
  //   setResultAllSelect(v);
  //   if (!v) {
  //     setSelectedRowKeys([]);
  //     setSelectedRows([]);
  //   }
  // }

  const onSelectChange = (rowKeys: any, rows: any) => {
    setSelectedRowKeys(rowKeys);
    setSelectedRows(rows);
    setResultAllSelect(false);
  };

  const onSelectResultAll = () => {
    setSelectedRowKeys(recordKeys);
    setSelectedRows([]);
    setResultAllSelect(true);
  };

  const onSelectCurrentPage = () => {
    setSelectedRowKeys(recordKeys);
    setSelectedRows(filerRows(recordRows));
    setResultAllSelect(false);
  };

  const handleSelectAllChange = (e: any) => {
    const checked = e.target.checked;
    if (!checked) {
      setSelectedRowKeys([]);
      setSelectedRows([]);
      setResultAllSelect(false);
    }
  };

  const allDisabled = rowDisable ? flattedData.every(rowDisable) : false;
  const menu = (
    <Menu>
      <Menu.Item onClick={onSelectCurrentPage} key="currentPage">
        本页全选
      </Menu.Item>
      <Menu.Item onClick={onSelectResultAll} key="resultAll">
        结果全选
      </Menu.Item>
    </Menu>
  );

  const allChecked = resultAllSelect || (!allDisabled && checkedCurrentAll);
  const customColumnTitle =
    showResultAll &&
    (allChecked ? (
      <Checkbox
        onChange={handleSelectAllChange}
        // disabled={!dataSource || !dataSource.length}
        checked={allChecked}
      />
    ) : (
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottom"
        arrow
        disabled={!dataSource || !dataSource.length}
      >
        <Checkbox
          checked={allChecked}
          disabled={!dataSource || !dataSource.length}
        />
      </Dropdown>
    ));
  const myColumnTitle =
    'columnTitle' in props ? columnTitle : customColumnTitle;

  const myRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: resultAllSelect || (rowDisable ? rowDisable(record) : false),
    }),
    columnTitle: myColumnTitle,
    columnWidth: 40,
    ...rowSelection,
  };

  return (
    <CTable
      ref={ref}
      dataSource={dataSource}
      rowKey={rowKey}
      childrenColumnName={childrenColumnName}
      {...rest}
      rowSelection={myRowSelection}
    >
      {extraContent}
      {children}
    </CTable>
  );
});

CustomResultAllTable.displayName = 'CoolContentTableSelect';

// @ts-ignore
CustomResultAllTable.config = setConfig;

export default memo(CustomResultAllTable);
