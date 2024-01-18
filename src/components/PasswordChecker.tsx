import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import PasswordInput from './PasswordInput';
import Button from './base/Button';

import { walletController } from '../features/WalletController';

interface PasswordCheckerProps {
  onPasswordCheckSuccess: () => void;
  buttonText: string;
  type?: 'login' | 'check_only';
}

const PasswordChecker = React.memo((props: PasswordCheckerProps) => {
  const { onPasswordCheckSuccess, buttonText, type = 'check_only' } = props;

  const [password, setPassword] = useState('');

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onLogin = useCallback(() => {
    if (
      walletController.checkPassword(password, {
        overridePassword: type === 'login',
      })
    ) {
      onPasswordCheckSuccess();
    } else {
      toast.error('Incorrect password');
    }
  }, [password, type, onPasswordCheckSuccess]);

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
