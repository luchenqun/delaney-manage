import React from 'react';
import { Link, Card, Typography, Button, Message, Spin } from '@arco-design/web-react';
import styles from './style/docs.module.less';
import { ADDRESS_CONFIG } from '@/utils/wagmi';
import delaneyAbi from '@/assets/delaney.json';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { useEffect } from 'react';

function Config() {
  const { data: hash, writeContract, isPending, status } = useWriteContract();
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash });
  const [index, setIndex] = useState(0);
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
    if (isSuccess) {
      Message.success('配置成功');
    }
    refetch();
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    if (!isLoadingConfigs) {
      setData(configs);
    }
  }, [configs, isLoadingConfigs]);

  const handleChangeFee = (value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: ['fee', BigInt(value)],
    });
  };

  const handleChangePeriodDuration = (value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: ['period_duration', BigInt(value)],
    });
  };

  const handleChangePeriodNum = (value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: ['period_num', BigInt(value)],
    });
  };

  const handleChangePeriodRewardRatio = (value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: ['period_reward_ratio', BigInt(value)],
    });
  };

  const handleChangePersonRewardLevel1 = (type: number, value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: [`person_reward_level${type}`, BigInt(value)],
    });
  };

  const handleChangeTeamRewardLevel = (type: number, value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: [`team_reward_level${type}`, BigInt(value)],
    });
  };

  const handleChangePersonInvestMinUsdt = (value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: ['person_invest_min_usdt', BigInt(value * 100000)],
    });
  };

  const handleChangePersonRewardMinUsdt = (value: string) => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'setConfig',
      args: ['person_reward_min_usdt', BigInt(value * 100000)],
    });
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title heading={6}>配置</Typography.Title>
      </div>
      <Spin loading={isLoading || isPending} style={{ width: '100%' }}>
        <div className={styles.configs}>
          <div className={styles.item}>
            <div>手续费</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 0 ? value : item)));
                  },
                  onEnd: handleChangeFee,
                }}
              >
                {data?.[0].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>质押周期时长</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 1 ? value : item)));
                  },
                  onEnd: handleChangePeriodDuration,
                }}
              >
                {data?.[1].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>质押周期数量</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 2 ? value : item)));
                  },
                  onEnd: handleChangePeriodNum,
                }}
              >
                {data?.[2].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>每期收益率</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 3 ? value : item)));
                  },
                  onEnd: handleChangePeriodRewardRatio,
                }}
              >
                {data?.[3].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>个人奖励1-5(%)</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 4 ? value : item)));
                  },
                  onEnd: (value) => handleChangePersonRewardLevel1(1, value),
                }}
              >
                {data?.[4].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 5 ? value : item)));
                  },
                  onEnd: (value) => handleChangePersonRewardLevel1(2, value),
                }}
              >
                {data?.[5].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 6 ? value : item)));
                  },
                  onEnd: (value) => handleChangePersonRewardLevel1(3, value),
                }}
              >
                {data?.[6].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 7 ? value : item)));
                  },
                  onEnd: (value) => handleChangePersonRewardLevel1(4, value),
                }}
              >
                {data?.[7].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 8 ? value : item)));
                  },
                  onEnd: (value) => handleChangePersonRewardLevel1(5, value),
                }}
              >
                {data?.[8].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>团队奖励1-5(%)</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 9 ? value : item)));
                  },
                  onEnd: (value) => handleChangeTeamRewardLevel(1, value),
                }}
              >
                {data?.[9].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 10 ? value : item)));
                  },
                  onEnd: (value) => handleChangeTeamRewardLevel(2, value),
                }}
              >
                {data?.[10].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 11 ? value : item)));
                  },
                  onEnd: (value) => handleChangeTeamRewardLevel(3, value),
                }}
              >
                {data?.[11].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 12 ? value : item)));
                  },
                  onEnd: (value) => handleChangeTeamRewardLevel(4, value),
                }}
              >
                {data?.[12].toString()}
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 13 ? value : item)));
                  },
                  onEnd: (value) => handleChangeTeamRewardLevel(5, value),
                }}
              >
                {data?.[13].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>个人投资最小USDT金额</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 14 ? value : item)));
                  },
                  onEnd: handleChangePersonInvestMinUsdt,
                }}
              >
                {data?.[14].toString()}
              </Typography.Paragraph>
            </div>
          </div>
          <div className={styles.item}>
            <div>个人奖励最小USDT金额</div>
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (value) => {
                    setData(data.map((item: any, index: number) => (index === 15 ? value : item)));
                  },
                  onEnd: handleChangePersonRewardMinUsdt,
                }}
              >
                {data?.[15].toString()}
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </Spin>
    </Card>
  );
}

export default Config;
