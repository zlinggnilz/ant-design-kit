import React, { memo } from 'react';
import { Row, Col } from 'antd';

const block = <div className="cool-loading-block" />;

const loadingBlock = (
  <>
    <Row gutter={8}>
      <Col span={22}>{block}</Col>
    </Row>
    <Row gutter={8}>
      <Col span={8}>{block}</Col>
      <Col span={15}>{block}</Col>
    </Row>
    <Row gutter={8}>
      <Col span={6}>{block}</Col>
      <Col span={18}>{block}</Col>
    </Row>
    <Row gutter={8}>
      <Col span={13}>{block}</Col>
      <Col span={9}>{block}</Col>
    </Row>
    <Row gutter={8}>
      <Col span={4}>{block}</Col>
      <Col span={3}>{block}</Col>
      <Col span={16}>{block}</Col>
    </Row>
  </>
);
const Block = () => {
  return loadingBlock;
};

export default memo(Block);
