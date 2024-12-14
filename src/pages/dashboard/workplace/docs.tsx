import React from 'react';
import { Link, Card, Typography, Button, Message } from '@arco-design/web-react';
import styles from './style/docs.module.less';
import { ADDRESS_CONFIG } from '@/utils/wagmi';
import delaneyAbi from '@/assets/delaney.json';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { useEffect } from 'react';

export const enum TxType {
  Pause = 0,
  Unpause = 1,
  PauseBusiness = 2,
  UnpauseBusiness = 3,
  Pay = 4,
  Withdraw = 5,
}

function QuickOperation() {
  const { data: hash, writeContract, isPending, isError, status } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [txType, setTxType] = useState(TxType.Pause);

  const handlePause = () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'pause',
      args: [],
    });
    setTxType(TxType.Pause);
  };

  const handleUnpause = () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'unpause',
      args: [],
    });
    setTxType(TxType.Unpause);
  };

  const handlePauseBusiness = () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'pauseBusiness',
      args: [],
    });
    setTxType(TxType.PauseBusiness);
  };

  const handleUnpauseBusiness = () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'unpauseBusiness',
      args: [],
    });
    setTxType(TxType.UnpauseBusiness);
  };

  useEffect(() => {
    if (isSuccess) {
      Message.success('操作成功');
    }
    if (isError) {
      Message.error('操作失败');
    }
  }, [isSuccess, isError]);

  const handlePay = () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'pay',
      args: [],
    });
    setTxType(TxType.Pay);
  };

  const handleWithdraw = () => {
    writeContract({
      address: ADDRESS_CONFIG.delaney,
      abi: delaneyAbi,
      functionName: 'withdraw',
      args: [],
    });
    setTxType(TxType.Withdraw);
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>操作</Typography.Title>
      </div>
      <div className={styles.docs}>
        <Button loading={isPending && txType === TxType.Pause} onClick={handlePause}>
          暂停
        </Button>
        <Button loading={isPending && txType === TxType.Unpause} onClick={handleUnpause}>
          取消暂停
        </Button>
        <Button loading={isPending && txType === TxType.PauseBusiness} onClick={handlePauseBusiness}>
          暂停业务
        </Button>
        <Button loading={isPending && txType === TxType.UnpauseBusiness} onClick={handleUnpauseBusiness}>
          重启业务
        </Button>
        <Button loading={isPending && txType === TxType.Pay} onClick={handlePay}>
          赔付
        </Button>
        <Button loading={isPending && txType === TxType.Withdraw} onClick={handleWithdraw}>
          取回利润
        </Button>
      </div>
    </Card>
  );
}

export default QuickOperation;
