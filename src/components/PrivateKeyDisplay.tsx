import React, { useCallback, useState } from 'react';

import Button from './base/Button';
import PasswordChecker from './PasswordChecker';

import { useAppSelector } from '../store/hooks';
import { selectActiveAddress } from '../store/features/wallet/walletSelectors';
import { walletController } from '../features/WalletController';

type PrivateKeyDisplayState = 'hidden' | 'request_password' | 'show';

const PrivateKeyDisplay = React.memo(() => {
  const [displayState, setDisplayState] =
    useState<PrivateKeyDisplayState>('hidden');

  const activeAddress = useAppSelector(selectActiveAddress);

  const onShowPrivateKey = useCallback(() => {
    setDisplayState('request_password');
  }, []);

  const onPasswordCheckSuccess = useCallback(() => {
    setDisplayState('show');
  }, []);

  if (displayState === 'hidden') {
    return <Button text="Show private key" onClick={onShowPrivateKey} />;
  }

  if (displayState === 'request_password') {
    return (
      <PasswordChecker
        onPasswordCheckSuccess={onPasswordCheckSuccess}
        buttonText="Show private key"
      />
    );
  }

  const privateKey =
    displayState === 'show' && activeAddress
      ? walletController.getPrivateKeyOfAddress(activeAddress)
      : '';

  return <div>Private key: {privateKey}</div>;
});

export default PrivateKeyDisplay;
