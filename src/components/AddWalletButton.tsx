import React from 'react';

import Button from './base/Button';

import { useAppDispatch } from '../store/hooks';
import { generateRandomWallet } from '../utils/wallet';
import { addWallet } from '../store/features/wallet/walletSlice';

const AddWalletButton = React.memo(() => {
  const dispatch = useAppDispatch();

  const onAddWallet = () => {
    const wallet = generateRandomWallet();
    dispatch(addWallet(wallet));
  };

  return <Button onClick={onAddWallet} text="Add wallet" />;
});

export default AddWalletButton;
