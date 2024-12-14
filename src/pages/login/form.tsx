import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';
import { Button, Link, Message } from '@arco-design/web-react';
import { injected, useAccount, useConnect, useSignMessage, useSwitchChain } from 'wagmi';
import { authorizationCheck, authorizationSignMessage, formatAddressString, getAddressUrl, setAuthorizationValue } from '@/utils/tools';

export const enum ActionType {
  Connect = 0,
  Switch = 1,
  Sign = 2,
}

const message = authorizationSignMessage();

export default function LoginForm() {
  const { connect, isError: isErrorConnect, isSuccess: isSuccessConnect, failureReason } = useConnect();
  const { switchChain, isError: isErrorSwitchChain, isSuccess: isSuccessSwitchChain } = useSwitchChain();
  const { signMessage, data: signature, isError: isErrorSignMessage, isSuccess: isSuccessSignMessage } = useSignMessage();
  const { isConnected, address, chainId } = useAccount();

  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(ActionType.Connect);
  const [actionText, setActionText] = useState('连接钱包');

  function afterLoginSuccess() {
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = '/';
  }

  useEffect(() => {
    if (isSuccessSwitchChain) {
      Message.success('钱包连接成功');
    }
    if (isErrorSwitchChain) {
      Message.error('钱包连接失败，请重试');
    }
    if (isSuccessSwitchChain) {
      Message.success('切换链成功');
    }
    if (isErrorSwitchChain) {
      Message.error('切换链失败，请重试');
    }
    setLoading(false);

    if (isSuccessSignMessage && address && signature) {
      setAuthorizationValue(address, message, signature);
      afterLoginSuccess();
      setLoading(false);
    }

    setLoading(false);
  }, [isSuccessSwitchChain, isErrorSwitchChain, isErrorConnect, isSuccessConnect, isErrorSignMessage, isSuccessSignMessage, failureReason]);

  useEffect(() => {
    console.log('wallet --------->', { isConnected, chainId, address });
    if (!isConnected || !address) {
      setAction(ActionType.Connect);
      setLoading(false);
      return;
    }

    if (chainId !== Number(import.meta.env.VITE_APP_CHAIN_ID)) {
      setAction(ActionType.Switch);
      setLoading(false);
      return;
    }

    authorizationCheck(address)
      .then((valid) => {
        if (valid) {
          window.location.href = '/';
        } else {
          setAction(ActionType.Sign);
        }
      })
      .catch((err) => {
        console.log('authorizationCheck error', err);
        setAction(ActionType.Sign);
        setLoading(false);
      });
  }, [isConnected, chainId, address]);

  const handleConnect = async () => {
    setLoading(true);
    if (action === ActionType.Connect) {
      connect({ connector: injected() });
    } else if (action === ActionType.Switch) {
      switchChain({ chainId: Number(import.meta.env.VITE_APP_CHAIN_ID) });
    } else {
      signMessage({ message });
    }
  };

  useEffect(() => {
    if (loading) {
      setActionText('处理中...');
      return;
    }
    if (action == ActionType.Connect) setActionText('连接钱包');
    if (action == ActionType.Switch) setActionText('切换网络');
    if (action == ActionType.Sign) setActionText('登录');
  }, [action]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>Delaney</div>
      <div className={styles['login-form-sub-title']}>登录Delaney管理后台</div>
      <div>
        <Button loading={loading} onClick={handleConnect} type="primary" style={{ width: '100%', marginTop: 20 }}>
          {actionText}
        </Button>
        {address && (
          <div>
            目前连接的钱包地址：<Link onClick={() => window.open(getAddressUrl(address))}>{formatAddressString(address)}</Link>
          </div>
        )}
      </div>
    </div>
  );
}
