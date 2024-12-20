import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Descriptions, Skeleton, Tag, Link, Divider } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import dayjs from 'dayjs';
import styles from './style/header.module.less';
import { formatAddressString, getAddressUrl, getHashUrl, humanReadable, isMobile, MudPrecision, UsdtPrecision } from '@/utils/tools';

export default function Info({ userInfo = {}, loading }: { userInfo: any; loading: boolean }) {
  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['info-wrapper']}>
      <Descriptions
        className={styles['info-content']}
        column={isMobile() ? 1 : 2}
        colon="："
        labelStyle={isMobile() ? { textAlign: 'left', width: 120, whiteSpace: 'wrap' } : {}}
        data={[
          {
            label: '用户地址',
            span: 24,
            value: loading ? (
              loadingNode
            ) : (
              <Link onClick={() => window.open(getAddressUrl(userInfo.address), '_blank')}>{isMobile() ? formatAddressString(userInfo.address) : userInfo.address}</Link>
            ),
          },
          {
            label: '交易哈希',
            span: 24,
            value: loading ? (
              loadingNode
            ) : (
              <Link onClick={() => window.open(getHashUrl(userInfo.hash), '_blank')}>{isMobile() ? formatAddressString(userInfo.hash) : userInfo.hash}</Link>
            ),
          },
          {
            label: '取消质押hash',
            span: 24,
            value: loading ? (
              loadingNode
            ) : (
              <Link onClick={() => window.open(getHashUrl(userInfo.undelegate_hash), '_blank')}>
                {isMobile() ? formatAddressString(userInfo.undelegate_hash) : userInfo.undelegate_hash}
              </Link>
            ),
          },
          {
            label: 'id',
            value: loading ? loadingNode : userInfo.id,
          },
          {
            label: '每期多久',
            value: loading ? loadingNode : userInfo.period_duration,
          },
          {
            label: '一共多少期',
            value: loading ? loadingNode : userInfo.period_num,
          },
          {
            label: '每期奖励百分比率',
            value: loading ? loadingNode : userInfo.period_reward_ratio + '%',
          },
          {
            label: '质押状态',
            value: loading ? (
              loadingNode
            ) : (
              <>
                {userInfo.status === 0 && <Tag color="gray">质押中</Tag>}
                {userInfo.status === 1 && <Tag color="green">成功</Tag>}
                {userInfo.status === 2 && <Tag color="red">失败</Tag>}
                {userInfo.status === 3 && <Tag color="cyan">撤回中</Tag>}
                {userInfo.status === 4 && <Tag color="magenta">已撤回</Tag>}
              </>
            ),
          },
          {
            label: '质押解锁日期',
            value: loading ? loadingNode : dayjs.unix(userInfo.unlock_time).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            label: '取消质押日期',
            value: loading ? loadingNode : dayjs.unix(userInfo.undelegate_time).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            label: '创建时间',
            value: loading ? loadingNode : dayjs.unix(userInfo.create_time).format('YYYY-MM-DD HH:mm:ss'),
          },
        ]}
      ></Descriptions>
      <Divider />
      <div className={styles.card}>
        <div className={styles.cardItem}>
          <div className={styles.cardItemTitle}>质押数量</div>
          <div className={styles.cardItemContent}>{humanReadable(userInfo.mud, MudPrecision)}</div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.cardItemTitle}>希望得到最小的USDT价值</div>
          <div className={styles.cardItemContent}>{humanReadable(userInfo.min_usdt, UsdtPrecision)}</div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.cardItemTitle}>质押得到USDT数量</div>
          <div className={styles.cardItemContent}>{humanReadable(userInfo.usdt, UsdtPrecision)}</div>
        </div>
        {userInfo.status === 4 && (
          <>
            <div className={styles.cardItem}>
              <div className={styles.cardItemTitle}>取消质押希望返回最小MUD</div>
              <div className={styles.cardItemContent}>{humanReadable(userInfo.back_min_mud, MudPrecision)}</div>
            </div>
            <div className={styles.cardItem}>
              <div className={styles.cardItemTitle}>取消质押实际返回的MUD</div>
              <div className={styles.cardItemContent}>{humanReadable(userInfo.back_mud, MudPrecision)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
