import React, { ReactNode } from 'react';
import { Grid, Card, Typography, Divider, Skeleton } from '@arco-design/web-react';
import { useSelector } from 'react-redux';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import styles from './style/overview.module.less';
import IconCalendar from './assets/calendar.svg';
import IconComments from './assets/comments.svg';
import IconContent from './assets/content.svg';
import { ADDRESS_CONFIG } from '@/utils/wagmi';
import { useReadContract } from 'wagmi';
import delaneyAbi from '@/assets/delaney.json';
import { humanReadable } from '@/utils/tools';

const { Row, Col } = Grid;

type StatisticItemType = {
  icon?: ReactNode;
  title?: ReactNode;
  count?: ReactNode;
  loading?: boolean;
  unit?: ReactNode;
};

function StatisticItem(props: StatisticItemType) {
  const { icon, title, count, loading, unit } = props;
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <Skeleton loading={loading} text={{ rows: 2, width: 60 }} animation>
          <div className={styles.title}>{title}</div>
          <div className={styles.count}>
            {count}
            <span className={styles.unit}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

function Overview() {
  const t = useLocale(locale);

  const { data, isLoading: loading } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'stat',
    args: [],
  });

  return (
    <Card>
      <Typography.Title heading={5}>统计数据</Typography.Title>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="质押数量" count={`${data?.[0]}`} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconContent />} title="质押Usdt" count={humanReadable(data?.[1])} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconComments />} title="质押Mud" count={humanReadable(data?.[2])} loading={loading} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="奖励数量" count={`${data?.[3]}`} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconContent />} title="奖励Usdt" count={humanReadable(data?.[4])} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconComments />} title="奖励Mud" count={humanReadable(data?.[5])} loading={loading} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="取消质押数量" count={`${data?.[6]}`} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconContent />} title="取消质押Usdt" count={humanReadable(data?.[7])} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconComments />} title="取消质押Mud" count={humanReadable(data?.[8])} loading={loading} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="存款Mud" count={humanReadable(data?.[9])} loading={loading} />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem icon={<IconContent />} title="利润Mud" count={humanReadable(data?.[10])} loading={loading} />
        </Col>
      </Row>
    </Card>
  );
}

export default Overview;
