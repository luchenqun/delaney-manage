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
import { useBalance, useReadContract } from 'wagmi';
import delaneyAbi from '@/assets/delaney.json';
import { humanReadable, MudPrecision, UsdtPrecision } from '@/utils/tools';

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

  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address: ADDRESS_CONFIG.delaney,
  });

  return (
    <Card className={styles.card}>
      <Typography.Title heading={5}>统计数据</Typography.Title>
      <Divider />
      <Row gutter={10} style={{ marginBottom: 10 }}>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="质押笔数" count={`${data?.[0]}`} loading={loading} />
        </Col>
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title="质押MUD/USDT"
            count={`${humanReadable(data?.[2], MudPrecision)} / ${humanReadable(data?.[1], UsdtPrecision)}`}
            loading={loading}
          />
        </Col>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="奖励笔数" count={`${data?.[3]}`} loading={loading} />
        </Col>
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title="奖励MUD/USDT"
            count={`${humanReadable(data?.[5], MudPrecision)} / ${humanReadable(data?.[4], UsdtPrecision)}`}
            loading={loading}
          />
        </Col>
      </Row>
      <Row gutter={10} style={{ marginBottom: 10 }}>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="取回笔数" count={`${data?.[6]}`} loading={loading} />
        </Col>
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title="取回MUD/USDT"
            count={`${humanReadable(data?.[8], MudPrecision)} / ${humanReadable(data?.[7], UsdtPrecision)}`}
            loading={loading}
          />
        </Col>
        <Col flex={1}>
          <StatisticItem icon={<IconCalendar />} title="赔付MUD" count={humanReadable(data?.[9], MudPrecision)} loading={loading} />
        </Col>
        <Col flex={1}>
          <div>
            <StatisticItem icon={<IconContent />} title="利润MUD" count={humanReadable(data?.[10], MudPrecision)} loading={loading} />
          </div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col flex={1}>
          <div>
            <StatisticItem icon={<IconContent />} title="合约MUD余额" count={humanReadable(balanceData?.value, MudPrecision)} loading={balanceLoading} />
          </div>
        </Col>
        <Col flex={1}></Col>
        <Col flex={1}></Col>
        <Col flex={1}></Col>
      </Row>
    </Card>
  );
}

export default Overview;
