import React from 'react';
import { Grid, Space } from '@arco-design/web-react';
import Overview from './overview';
import Docs from './docs';
import styles from './style/index.module.less';
import Config from './config';

const { Row, Col } = Grid;

const gutter = 16;

function Workplace() {
  return (
    <div className={styles.wrapper}>
      <Space size={16} direction="vertical" className={styles.left}>
        <Overview />
      </Space>
      <Space className={styles.right} size={16} direction="vertical">
        <Docs />
        <Config />
      </Space>
    </div>
  );
}

export default Workplace;
