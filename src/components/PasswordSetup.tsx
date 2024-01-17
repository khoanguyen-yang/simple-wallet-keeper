import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import PasswordInput from './PasswordInput';

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

  const onSubmit = () => {
    if (password === confirmPassword) {
      walletController.updateWalletPassword(password);
      dispatch(finishPasswordSetup());
    } else {
      toast.error('Passwords do not match');
    }
  };

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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
});

export default PasswordSetup;
