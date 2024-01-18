import React, { useMemo } from 'react';
import { useBalance } from 'wagmi';
import { Chain, formatUnits } from 'viem';

import { useAppSelector } from '../store/hooks';
import { selectActiveAddress } from '../store/features/wallet/walletSelectors';

interface NativeBalanceProps {
  chain: Chain;
}

const NativeBalance = React.memo((props: NativeBalanceProps) => {
  const { chain } = props;

  const activeAddress = useAppSelector(selectActiveAddress);

  const balance = useBalance({
    address: activeAddress || undefined,
    chainId: chain.id,
  });

  const formattedBalance = useMemo(() => {
    if (!balance.data) {
      return '0';
    }
    return formatUnits(balance.data.value, balance.data.decimals);
  }, [balance]);

  return (
    <div>
      {chain.name}: {formattedBalance} {chain.nativeCurrency.symbol}
    </div>
  );
});

export default NativeBalance;
