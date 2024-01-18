import React, { useCallback, useMemo, useState } from 'react';

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

  const privateKey = useMemo(() => {
    if (displayState === 'show' && activeAddress) {
      return walletController.getPrivateKeyOfAddress(activeAddress);
    }
    return '';
  }, [displayState, activeAddress]);

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

  return <div>Private key: {privateKey}</div>;
});

export default PrivateKeyDisplay;
