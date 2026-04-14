export const formatNumberShort = (value: number | null | undefined, decimals: number = 1): string => {
  if (value == null || Number.isNaN(value)) {
    return '0';
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1_000_000_000) {
    const formatted = (absValue / 1_000_000_000).toFixed(decimals);
    return `${sign}${formatted}B`;
  }

  if (absValue >= 1_000_000) {
    const formatted = (absValue / 1_000_000).toFixed(decimals);
    return `${sign}${formatted}M`;
  }

  if (absValue >= 1_000) {
    const formatted = (absValue / 1_000).toFixed(decimals);
    return `${sign}${formatted}K`;
  }

  return `${sign}${absValue.toFixed(0)}`;
};

export const formatNumberVN = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) {
    return '0';
  }
  return value.toLocaleString('vi-VN');
};
