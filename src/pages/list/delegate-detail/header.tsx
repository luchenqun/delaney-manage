import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Descriptions, Skeleton, Tag, Link } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import dayjs from 'dayjs';
import styles from './style/header.module.less';
import { getAddressUrl, getHashUrl, humanReadable, UsdtPrecision } from '@/utils/tools';

export default function Info({ userInfo = {}, loading }: { userInfo: any; loading: boolean }) {
  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['info-wrapper']}>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: '用户地址',
            span: 24,
            value: loading ? loadingNode : <Link onClick={() => window.open(getAddressUrl(userInfo.address), '_blank')}>{userInfo.address}</Link>,
          },
          {
            label: '交易哈希',
            span: 24,
            value: loading ? loadingNode : <Link onClick={() => window.open(getHashUrl(userInfo.hash), '_blank')}>{userInfo.hash}</Link>,
          },
          {
            label: '取消质押hash',
            span: 24,
            value: loading ? loadingNode : <Link onClick={() => window.open(getHashUrl(userInfo.undelegate_hash), '_blank')}>{userInfo.undelegate_hash}</Link>,
          },
          {
            label: 'id',
            value: loading ? loadingNode : userInfo.id,
          },
          {
            label: '质押id',
            value: loading ? loadingNode : userInfo.cid,
          },
          {
            label: '质押数量',
            value: loading ? loadingNode : humanReadable(userInfo.mud),
          },
          {
            label: '希望得到最小的usdt价值',
            value: loading ? loadingNode : humanReadable(userInfo.min_usdt, UsdtPrecision),
          },
          {
            label: '质押的对应usdt数量',
            value: loading ? loadingNode : humanReadable(userInfo.usdt, UsdtPrecision),
          },
          {
            label: '取消质押希望返回最小mud',
            value: loading ? loadingNode : humanReadable(userInfo.back_min_mud),
          },
          {
            label: '取消质押返回的mud',
            value: loading ? loadingNode : humanReadable(userInfo.back_mud),
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
    </div>
  );
}
