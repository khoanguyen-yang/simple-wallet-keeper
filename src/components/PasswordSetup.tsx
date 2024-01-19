import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import PasswordInput from './PasswordInput';
import Button from './base/Button';

import { useAppDispatch } from '../store/hooks';
import { finishPasswordSetup } from '../store/features/app/appSlice';
import { walletController } from '../features/WalletController';

const PasswordSetup = React.memo(() => {
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onConfirmPasswordChange = useCallback((value: string) => {
    setConfirmPassword(value);
  }, []);

  const onSubmit = useCallback(() => {
    if (password === '' && confirmPassword === '') {
      toast.info('You should input passwords');
    } else if (password === confirmPassword) {
      walletController.setPassword(password);
      dispatch(finishPasswordSetup());
    } else {
      toast.error('Passwords do not match');
    }
  }, [password, confirmPassword, dispatch]);

  return (
    <div>
      <p className="text-xl mb-4">
        You are a new user. Please setup your wallet password
      </p>
      <div className="mb-3">
        <PasswordInput
          data-testid="password"
          label="Password"
          value={password}
          onValueChange={onPasswordChange}
        />
      </div>
      <div className="mb-6">
        <PasswordInput
          data-testid="confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onValueChange={onConfirmPasswordChange}
        />
      </div>
      <Button onClick={onSubmit} text="Submit" />
    </div>
  );
});

export default PasswordSetup;
