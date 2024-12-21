import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Descriptions, Skeleton, Link, Divider, Message } from '@arco-design/web-react';
import { IconCopy, IconLink, IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import dayjs from 'dayjs';
import styles from './style/header.module.less';
import { formatAddressString, getAddressUrl, humanReadable, isMobile, MudPrecision, UsdtPrecision } from '@/utils/tools';

export default function Info({ userInfo = {}, userReward = {}, loading }: { userInfo: any; userReward: any; loading: boolean }) {
  const t = useLocale(locale);

  const [avatar, setAvatar] = useState('https://black-unnecessary-koi-219.mypinata.cloud/ipfs/QmYDxbHvxCLpKQk1G9a9KzAJjZryUC7v5dXDEk9xR685KX');

  useEffect(() => {
    // setAvatar(userInfo.avatar);
  }, [userInfo]);

  console.log(userReward);

  const loadingImg = <Skeleton text={{ rows: 0 }} style={{ width: '100px', height: '100px' }} animation />;

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['info-wrapper']}>
      <div className={styles.title}>
        <Skeleton loading={loading} text={{ rows: 1 }} animation></Skeleton>
        <span>{isMobile() ? formatAddressString(userInfo.address) : userInfo.address}</span>
        <span
          className={styles.copy}
          onClick={() => {
            navigator.clipboard.writeText(userInfo.address);
            Message.success('复制成功');
          }}
        >
          <IconCopy />
        </span>
        <span className={styles.link} onClick={() => window.open(getAddressUrl(userInfo.address), '_blank')}>
          <IconLink />
        </span>
      </div>
      <Divider />
      <Descriptions
        className={styles['info-content']}
        column={1}
        colon="："
        // labelStyle={{ textAlign: 'right' }}
        data={[
          // {
          //   label: '用户地址',
          //   span: 24,
          //   value: loading ? loadingNode : <Link onClick={() => window.open(getAddressUrl(userInfo.address), '_blank')}>{userInfo.address}</Link>,
          // },
          {
            label: '推荐人地址',
            span: 24,
            value: loading ? (
              loadingNode
            ) : (
              <Link onClick={() => window.open(getAddressUrl(userInfo.parent), '_blank')}>{isMobile() ? formatAddressString(userInfo.parent) : userInfo.parent}</Link>
            ),
          },
          {
            label: '团队星级',
            value: loading ? loadingNode : userInfo.star,
          },
          {
            label: '最小团队星级',
            value: loading ? loadingNode : userInfo.min_star,
          },
          {
            label: '推荐码',
            value: loading ? loadingNode : userInfo.ref,
          },
          {
            label: '父节点的推荐码',
            value: loading ? loadingNode : userInfo.parent_ref,
          },
          {
            label: '创建时间',
            value: loading ? loadingNode : dayjs.unix(userInfo.create_time).format('YYYY-MM-DD HH:mm:ss'),
          },
        ]}
      ></Descriptions>
      <Divider />
      <div className={styles.card}>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>总收益 MUD/USDT </div>
          <div className={styles.cardValue}>
            {humanReadable(userReward.mud, MudPrecision)} / {humanReadable(userReward.usdt, UsdtPrecision)}
          </div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>质押MUD/USDT </div>
          <div className={styles.cardValue}>
            {humanReadable(userInfo.mud, MudPrecision)} / {humanReadable(userInfo.usdt, UsdtPrecision)}
          </div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>直推MUD/USDT</div>
          <div className={styles.cardValue}>
            {humanReadable(userInfo.sub_mud, MudPrecision)} / {humanReadable(userInfo.sub_usdt, UsdtPrecision)}
          </div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>团队MUD/USDT</div>
          <div className={styles.cardValue}>
            {humanReadable(userInfo.team_mud, MudPrecision)} / {humanReadable(userInfo.team_usdt, UsdtPrecision)}
          </div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>领取奖励MUD/USDT</div>
          <div className={styles.cardValue}>
            {humanReadable(userInfo.claim_mud, MudPrecision)} / {humanReadable(userInfo.claim_usdt, UsdtPrecision)}
          </div>
        </div>
      </div>
    </div>
  );
}
