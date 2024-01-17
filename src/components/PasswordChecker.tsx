import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import PasswordInput from './PasswordInput';

import Button from './base/Button';
import { walletController } from '../features/WalletController';

interface PasswordCheckerProps {
  type?: 'login' | 'check_only';
  onPasswordCheckSuccess: () => void;
  buttonText: string;
}

const PasswordChecker = React.memo((props: PasswordCheckerProps) => {
  const { onPasswordCheckSuccess, buttonText, type = 'check_only' } = props;

  const [password, setPassword] = useState('');

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onLogin = () => {
    if (
      walletController.checkPassword(password, {
        overridePassword: type === 'login',
      })
    ) {
      onPasswordCheckSuccess();
    } else {
      toast.error('Incorrect password');
    }
  };

  return (
    <div>
      <PasswordInput
        label="Password"
        value={password}
        onChange={onPasswordChange}
      />
      <Button onClick={onLogin} text={buttonText} />
    </div>
  );
});

export default PasswordChecker;
