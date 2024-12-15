import React from 'react';
import { Link, Card, Typography, Button, Message, Modal, Input } from '@arco-design/web-react';
import styles from './style/docs.module.less';
import { ADDRESS_CONFIG } from '@/utils/wagmi';
import delaneyAbi from '@/assets/delaney.json';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { useEffect } from 'react';
import { parseEther } from 'viem';

export const enum TxType {
  Pause = 0,
  Unpause = 1,
  PauseBusiness = 2,
  UnpauseBusiness = 3,
  Pay = 4,
  Withdraw = 5,
  Deposit = 6,
  Profit = 7,
}

function QuickOperation() {
  const { data: hash, writeContract, isPending, isError, status } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [txType, setTxType] = useState(TxType.Pause);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'profit'>(null);
  const [inputValue, setInputValue] = useState('');

  const { data: isPaused } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'paused',
  });

  const { data: isBusinessPaused } = useReadContract({
    address: ADDRESS_CONFIG.delaney,
    abi: delaneyAbi,
    functionName: 'pausedBusiness',
  });

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

  const handleModalOk = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      Message.error('请输入有效的数字');
      return;
    }

    try {
      const valueInWei = parseEther(inputValue);

      if (modalType === 'deposit') {
        writeContract({
          address: ADDRESS_CONFIG.delaney,
          abi: delaneyAbi,
          functionName: 'deposit',
          args: [],
          value: valueInWei,
        });
        setTxType(TxType.Deposit);
      } else if (modalType === 'profit') {
        writeContract({
          address: ADDRESS_CONFIG.delaney,
          abi: delaneyAbi,
          functionName: 'profit',
          args: [valueInWei],
        });
        setTxType(TxType.Profit);
      }

      setIsModalVisible(false);
      setInputValue('');
    } catch (error) {
      Message.error('输入格式错误');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setInputValue('');
  };

  const showModal = (type: 'deposit' | 'profit') => {
    setModalType(type);
    setIsModalVisible(true);
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>操作</Typography.Title>
      </div>
      <div className={styles.docs}>
        {isPaused ? (
          <Button loading={isPending && txType === TxType.Unpause} onClick={handleUnpause}>
            取消暂停
          </Button>
        ) : (
          <Button loading={isPending && txType === TxType.Pause} onClick={handlePause}>
            暂停
          </Button>
        )}
        {isBusinessPaused ? (
          <Button loading={isPending && txType === TxType.UnpauseBusiness} onClick={handleUnpauseBusiness}>
            重启业务
          </Button>
        ) : (
          <Button loading={isPending && txType === TxType.PauseBusiness} onClick={handlePauseBusiness}>
            暂停业务
          </Button>
        )}
        <Button loading={isPending && txType === TxType.Deposit} onClick={() => showModal('deposit')}>
          赔付
        </Button>
        <Button loading={isPending && txType === TxType.Profit} onClick={() => showModal('profit')}>
          取回利润
        </Button>
      </div>

      <Modal
        title={modalType === 'deposit' ? '存入 MUD' : '设置利润'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        autoFocus={false}
        focusLock={true}
      >
        <Input placeholder="请输入 MUD 数量" value={inputValue} onChange={(value) => setInputValue(value)} type="number" step="any" />
      </Modal>
    </Card>
  );
}

export default QuickOperation;
