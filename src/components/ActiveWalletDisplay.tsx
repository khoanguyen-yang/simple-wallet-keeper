import React from 'react';

import PrivateKeyDisplay from '../components/PrivateKeyDisplay';
import NativeBalance from '../components/NativeBalance';

import { useAppSelector } from '../store/hooks';
import { selectActiveAddress } from '../store/features/wallet/walletSelectors';
import { wagmiConfig } from '../constants/wagmiConfig';

const ActiveWalletDisplay = React.memo(() => {
  const activeAddress = useAppSelector(selectActiveAddress);

  return (
    <>
      <div>Current active wallet: {activeAddress}</div>

      {wagmiConfig.chains.map((chain) => (
        <NativeBalance key={chain.id} chain={chain} />
      ))}

      <div className="mt-5">
        <PrivateKeyDisplay key={activeAddress} />
      </div>
    </>
  );
});

export default ActiveWalletDisplay;
