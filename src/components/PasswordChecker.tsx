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
    const isValidPassword =
      type === 'login'
        ? walletController.checkPasswordLogin(password)
        : walletController.checkPassword(password);

    if (isValidPassword) {
      onPasswordCheckSuccess();
    } else {
      toast.error('Incorrect password');
    }
  }, [type, password, onPasswordCheckSuccess]);

  return (
    <div>
      <div className="mb-5">
        <PasswordInput
          data-testid="password"
          label="Password"
          value={password}
          onValueChange={onPasswordChange}
        />
      </div>
      <Button onClick={onLogin} text={buttonText} />
    </div>
  );
});

export default PasswordChecker;
