import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Descriptions, Skeleton } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import dayjs from 'dayjs';
import styles from './style/header.module.less';
import { divideByMillionAndRound } from '@/utils/tools';

export default function Info({
  userInfo = {},
  loading,
}: {
  userInfo: any;
  loading: boolean;
}) {
  const t = useLocale(locale);

  const [avatar, setAvatar] = useState(
    'https://black-unnecessary-koi-219.mypinata.cloud/ipfs/QmYDxbHvxCLpKQk1G9a9KzAJjZryUC7v5dXDEk9xR685KX'
  );

  useEffect(() => {
    // setAvatar(userInfo.avatar);
  }, [userInfo]);

  const loadingImg = (
    <Skeleton
      text={{ rows: 0 }}
      style={{ width: '100px', height: '100px' }}
      animation
    />
  );

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;

  return (
    <div className={styles['info-wrapper']}>
      <Upload showUploadList={false}>
        {loading ? (
          loadingImg
        ) : (
          <Avatar size={100} className={styles['info-avatar']}>
            {avatar ? <img src={avatar} /> : <IconPlus />}
          </Avatar>
        )}
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: '用户地址',
            span: 24,
            value: loading ? loadingNode : userInfo.address,
          },
          {
            label: '推荐人地址',
            span: 24,
            value: loading ? loadingNode : userInfo.parent,
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
            label: '个人质押mud数量',
            value: loading
              ? loadingNode
              : divideByMillionAndRound(userInfo.mud),
          },
          {
            label: '个人质押usdt数量',
            value: loading
              ? loadingNode
              : divideByMillionAndRound(userInfo.usdt),
          },
          {
            label: '直推总额mud数量',
            value: loading
              ? loadingNode
              : divideByMillionAndRound(userInfo.sub_mud),
          },
          {
            label: '直推总额usdt数量',
            value: loading
              ? loadingNode
              : divideByMillionAndRound(userInfo.sub_usdt),
          },
          {
            label: '团队总额mud数量',
            value: loading
              ? loadingNode
              : divideByMillionAndRound(userInfo.team_mud),
          },
          {
            label: '团队总额usdt数量',
            value: loading
              ? loadingNode
              : divideByMillionAndRound(userInfo.team_usdt),
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
            value: loading
              ? loadingNode
              : dayjs(userInfo.created_at).format('YYYY-MM-DD HH:mm:ss'),
          },
        ]}
      ></Descriptions>
    </div>
  );
}
