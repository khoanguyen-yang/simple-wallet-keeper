import React from 'react';
import { Address } from 'viem';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectWallets } from '../store/features/wallet/walletSelectors';
import { changeActiveAddress } from '../store/features/wallet/walletSlice';

const WalletList = React.memo(() => {
  const dispatch = useAppDispatch();
  const wallets = useAppSelector(selectWallets);

  const changeWallet = (walletAddress: Address) => {
    dispatch(changeActiveAddress(walletAddress));
  };

  return (
    <div className="flex flex-col divide-y">
      {wallets.map((wallet) => (
        <div key={wallet} onClick={() => changeWallet(wallet)}>
          {wallet}
        </div>
      ))}
    </div>
  );
});

export default WalletList;
