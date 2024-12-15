import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Descriptions, Skeleton, Link, Divider, Message } from '@arco-design/web-react';
import { IconCopy, IconLink, IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import dayjs from 'dayjs';
import styles from './style/header.module.less';
import { getAddressUrl, humanReadable, MudPrecision, UsdtPrecision } from '@/utils/tools';

export default function Info({ userInfo = {}, loading }: { userInfo: any; loading: boolean }) {
  const t = useLocale(locale);

  const [avatar, setAvatar] = useState('https://black-unnecessary-koi-219.mypinata.cloud/ipfs/QmYDxbHvxCLpKQk1G9a9KzAJjZryUC7v5dXDEk9xR685KX');

  useEffect(() => {
    // setAvatar(userInfo.avatar);
  }, [userInfo]);

  const loadingImg = <Skeleton text={{ rows: 0 }} style={{ width: '100px', height: '100px' }} animation />;

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['info-wrapper']}>
      <div className={styles.title}>
        <Skeleton loading={loading} text={{ rows: 1 }} animation></Skeleton>
        <span>{userInfo.address}</span>
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
            value: loading ? loadingNode : <Link onClick={() => window.open(getAddressUrl(userInfo.parent), '_blank')}>{userInfo.parent}</Link>,
          },
          {
            label: '团队星级',
            value: loading ? loadingNode : userInfo.star,
          },
          {
            label: '最小团队星级',
            value: loading ? loadingNode : userInfo.min_star,
          },
          // {
          //   label: '个人质押mud数量',
          //   value: loading ? loadingNode : humanReadable(userInfo.mud),
          // },
          // {
          //   label: '个人质押usdt数量',
          //   value: loading ? loadingNode : humanReadable(userInfo.usdt, UsdtPrecision),
          // },
          // {
          //   label: '直推总额mud数量',
          //   value: loading ? loadingNode : humanReadable(userInfo.sub_mud),
          // },
          // {
          //   label: '直推总额usdt数量',
          //   value: loading ? loadingNode : humanReadable(userInfo.sub_usdt, UsdtPrecision),
          // },
          // {
          //   label: '团队总额mud数量',
          //   value: loading ? loadingNode : humanReadable(userInfo.team_mud),
          // },
          // {
          //   label: '团队总额usdt数量',
          //   value: loading ? loadingNode : humanReadable(userInfo.team_usdt, UsdtPrecision),
          // },
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
          <div className={styles.cardTitle}>个人质押mud数量</div>
          <div className={styles.cardValue}>{humanReadable(userInfo.mud, MudPrecision)}</div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>个人质押usdt数量</div>
          <div className={styles.cardValue}>{humanReadable(userInfo.usdt, UsdtPrecision)}</div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>直推总额mud数量</div>
          <div className={styles.cardValue}>{humanReadable(userInfo.sub_mud)}</div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>直推总额usdt数量</div>
          <div className={styles.cardValue}>{humanReadable(userInfo.sub_usdt, UsdtPrecision)}</div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>团队总额mud数量</div>
          <div className={styles.cardValue}>{humanReadable(userInfo.team_mud)}</div>
        </div>
        <div className={styles.Item}>
          <div className={styles.cardTitle}>团队总额usdt数量</div>
          <div className={styles.cardValue}>{humanReadable(userInfo.team_usdt, UsdtPrecision)}</div>
        </div>
      </div>
    </div>
  );
}
