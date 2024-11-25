import React, { useEffect, useState } from 'react';
import { Typography } from '@arco-design/web-react';

const { Text } = Typography;

export const AddressText = ({ address }: { address: string }) => {
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

  return <Text copyable={{ text: address }}>{formatAddress}</Text>;
};
