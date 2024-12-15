import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Descriptions, Skeleton, Tag, Link, Divider, Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import dayjs from 'dayjs';
import styles from './style/header.module.less';
import { formatAddressString, getAddressUrl, getHashUrl, humanReadable, isMobile, UsdtPrecision } from '@/utils/tools';

export default function Info({ userInfo = {}, loading }: { userInfo: any; loading: boolean }) {
  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['info-wrapper']}>
      <Descriptions
        className={styles['info-content']}
        column={1}
        colon="："
        labelStyle={isMobile() ? { textAlign: 'left', width: 120, whiteSpace: 'wrap' } : {}}
        data={[
          {
            label: '用户地址',
            span: 24,
            value: loading ? (
              loadingNode
            ) : (
              <Link onClick={() => window.open(getAddressUrl(userInfo?.address), '_blank')}>{isMobile() ? formatAddressString(userInfo.address) : userInfo.address}</Link>
            ),
          },
          {
            label: 'id',
            value: loading ? loadingNode : userInfo.id,
          },
          {
            label: '管理员签名',
            value: loading ? (
              loadingNode
            ) : (
              <Typography.Text ellipsis style={{ marginBottom: 0 }}>
                {userInfo.signature}
              </Typography.Text>
            ),
          },
          {
            label: '状态',
            value: loading ? (
              loadingNode
            ) : (
              <>
                {userInfo.status === 0 && <Tag color="gray">领取中</Tag>}
                {userInfo.status === 1 && <Tag color="green">已领取</Tag>}
                {userInfo.status === 2 && <Tag color="red">领取失败</Tag>}
              </>
            ),
          },
          {
            label: '奖励上链截止时间',
            value: loading ? loadingNode : dayjs.unix(userInfo.deadline).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            label: '领取时间',
            value: loading ? loadingNode : userInfo.claim_time ? dayjs.unix(userInfo.claim_time).format('YYYY-MM-DD HH:mm:ss') : '-',
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
          <div className={styles.cardItemTitle}>USDT</div>
          <div className={styles.cardItemContent}>{humanReadable(userInfo?.usdt, UsdtPrecision)}</div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.cardItemTitle}>希望领取到的最小mud数量</div>
          <div className={styles.cardItemContent}>{humanReadable(userInfo?.min_mud, UsdtPrecision)}</div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.cardItemTitle}>实际接收到的MUD</div>
          <div className={styles.cardItemContent}>{humanReadable(userInfo?.mud, UsdtPrecision)}</div>
        </div>
      </div>
    </div>
  );
}
