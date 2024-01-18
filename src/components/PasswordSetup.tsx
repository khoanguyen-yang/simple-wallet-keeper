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
    if (password === confirmPassword) {
      walletController.setPassword(password);
      dispatch(finishPasswordSetup());
    } else {
      toast.error('Passwords do not match');
    }
  }, [password, confirmPassword, dispatch]);

  return (
    <div>
      <h2>Setup password</h2>
      <PasswordInput
        label="Password"
        value={password}
        onChange={onPasswordChange}
      />
      <PasswordInput
        label="Confirm password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <Button onClick={onSubmit} text="Submit" />
    </div>
  );
});

export default PasswordSetup;
