import React, { useEffect, useState } from 'react';
import { Typography } from '@arco-design/web-react';
import { getAddressUrl, getHashUrl } from '@/utils/tools';

const { Text } = Typography;

export const AddressText = ({ address, type }: { address: string; type?: string }) => {
  const [formatAddress, setFormatAddress] = useState('');
  useEffect(() => {
    const formatAddressString = (address: string) => {
      if (address.length <= 8) {
        return address;
      } else {
        const firstPart = address.substring(0, 8);
        const lastPart = address.substring(address.length - 6);
        return `${firstPart}...${lastPart}`;
      }
    };
    setFormatAddress(formatAddressString(address));
  }, [address]);

  return (
    <Text
      onClick={() => {
        if (type === 'hash') {
          window.open(getHashUrl(address), '_blank');
          return;
        }
        window.open(getAddressUrl(address), '_blank');
      }}
      style={{ color: 'rgb(22, 93, 255)', cursor: 'pointer' }}
      copyable={{
        text: address,
        onCopy(text, e) {
          e.stopPropagation();
        },
      }}
    >
      {formatAddress}
    </Text>
  );
};
