export const UsdtPrecision = 1000000n;
export const MudPrecision = 1000000000000000000n;

export const humanReadable = (value: number | bigint | string, precision = 1000000000000000000n) => {
  value = BigInt(value);
  if (value === 0n) return '0';

  const result = ((value * 100n) / precision).toString(); // 将结果扩大100倍以保留两位小数
  const integerPart = result.slice(0, -2) || '0'; // 获取整数部分
  const decimalPart = result.slice(-2); // 获取小数部分

  // 如果小数部分以0结尾,则去掉末尾的0
  if (decimalPart === '00') {
    return integerPart;
  } else if (decimalPart.endsWith('0')) {
    return `${integerPart}.${decimalPart[0]}`;
  } else {
    return `${integerPart}.${decimalPart}`;
  }
};
