import React from 'react';
import { Card, Typography, Message, Spin, Link, Modal, Input } from '@arco-design/web-react';
import styles from './style/config.module.less';
import { ADDRESS_CONFIG } from '@/utils/wagmi';
import delaneyAbi from '@/assets/delaney.json';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { useEffect } from 'react';
import { humanReadable, UsdtPrecision } from '@/utils/tools';
import { IconEdit } from '@arco-design/web-react/icon';

function Config() {
  const [data, setData] = useState<any>(null);

  const {
    data: configs,
    isLoading: isLoadingConfigs,
    refetch,
    isSuccess: isSuccessConfigs,
  } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'getConfigs',
    args: [],
  });

  useEffect(() => {
    if (!isLoadingConfigs) {
      setData(configs);
    }
  }, [configs, isLoadingConfigs]);

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title heading={6}>配置</Typography.Title>
      </div>
      <Spin loading={isLoadingConfigs} style={{ width: '100%' }}>
        <div className={styles.configs}>
          <ConfigItem title="手续费(%)" name="fee" count={data?.[0].toString()} />
          <ConfigItem title="质押周期时长" name="period_duration" count={data?.[1].toString()} />
          <ConfigItem title="质押周期数量" name="period_num" count={data?.[2].toString()} />
          <ConfigItem title="每期收益率" name="period_reward_ratio" count={data?.[3].toString()} />
          <ConfigItem title="个人奖励1(%)" name="person_reward_level1" count={data?.[4].toString()} />
          <ConfigItem title="个人奖励2(%)" name="person_reward_level2" count={data?.[5].toString()} />
          <ConfigItem title="个人奖励3(%)" name="person_reward_level3" count={data?.[6].toString()} />
          <ConfigItem title="个人奖励4(%)" name="person_reward_level4" count={data?.[7].toString()} />
          <ConfigItem title="个人奖励5(%)" name="person_reward_level5" count={data?.[8].toString()} />
          <ConfigItem title="团队奖励1(%)" name="team_reward_level1" count={data?.[9].toString()} />
          <ConfigItem title="团队奖励2(%)" name="team_reward_level2" count={data?.[10].toString()} />
          <ConfigItem title="团队奖励3(%)" name="team_reward_level3" count={data?.[11].toString()} />
          <ConfigItem title="团队奖励4(%)" name="team_reward_level4" count={data?.[12].toString()} />
          <ConfigItem title="团队奖励5(%)" name="team_reward_level5" count={data?.[13].toString()} />
          <ConfigItem title="个人投资最小USDT" name="person_invest_min_usdt" count={humanReadable(data?.[14], UsdtPrecision)} />
          <ConfigItem title="个人奖励最小USDT" name="person_reward_min_usdt" count={humanReadable(data?.[15], UsdtPrecision)} />
          <ConfigItem title="团队奖励最小USDT" name="team_reward_min_usdt" count={humanReadable(data?.[16], UsdtPrecision)} />
          <ConfigItem title="最小可领取USDT" name="claim_min_usdt" count={humanReadable(data?.[17], UsdtPrecision)} />
          <ConfigItem title="最大可领取USDT" name="claim_max_usdt" count={humanReadable(data?.[18], UsdtPrecision)} />
          <ConfigItem title="领取间隔(秒)" name="claim_gap" count={data?.[19].toString()} />
          <ConfigItem title="团队1级减投USDT" name="team_level1_sub_usdt" count={humanReadable(data?.[20], UsdtPrecision)} />
          <ConfigItem title="团队1级团队USDT" name="team_level1_team_usdt" count={humanReadable(data?.[21], UsdtPrecision)} />
        </div>
      </Spin>
    </Card>
  );
}

const ConfigItem = ({ title, name, count }) => {
  const { data: hash, writeContract, isPending, status, isPaused } = useWriteContract();
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash });
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(count);

  const handleChange = () => {
    setVisible(true);
    setValue(count);
  };

  useEffect(() => {
    if (isSuccess) {
      Message.success('配置成功');
      window.location.reload();
    }
  }, [isLoading, isSuccess, isError]);

  const handleOk = () => {
    let valueInput = Number(value);
    if (
      name === 'person_invest_min_usdt' ||
      name === 'person_reward_min_usdt' ||
      name === 'team_reward_min_usdt' ||
      name === 'claim_min_usdt' ||
      name === 'claim_max_usdt' ||
      name === 'team_level1_sub_usdt' ||
      name === 'team_level1_team_usdt'
    ) {
      valueInput = valueInput * 100000;
    }
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: [name, BigInt(valueInput)],
    });
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>{title}</div>
      <div className={styles.itemCount}>{count}</div>
      <Link className={styles.link} onClick={handleChange}>
        <IconEdit />
      </Link>

      <Modal
        title={`修改${title}`}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOk}
        confirmLoading={(isPending || isLoading) && !isPaused}
        hideCancel={isPending || isLoading || isPaused}
        closable={!(isPending || isLoading || isPaused)}
        maskClosable={false}
      >
        <Input value={value} type="number" onChange={(e) => setValue(e)} />
      </Modal>
    </div>
  );
};

export default Config;
