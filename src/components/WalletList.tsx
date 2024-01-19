import React from 'react';
import { Address } from 'viem';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectActiveAddress,
  selectWallets,
} from '../store/features/wallet/walletSelectors';
import { changeActiveAddress } from '../store/features/wallet/walletSlice';

const WalletList = React.memo(() => {
  const dispatch = useAppDispatch();

  const activeAddress = useAppSelector(selectActiveAddress);
  const wallets = useAppSelector(selectWallets);

  const changeWallet = (walletAddress: Address) => {
    dispatch(changeActiveAddress(walletAddress));
  };

  return (
    <div className="flex flex-col">
      {wallets.map((wallet) => (
        <div key={wallet} className="mb-2">
          <button
            data-testid="wallet-item"
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            onClick={() => changeWallet(wallet)}
          >
            {activeAddress === wallet ? '✅ ' : ''}
            {wallet}
          </button>
        </div>
      ))}
    </div>
  );
});

export default WalletList;
