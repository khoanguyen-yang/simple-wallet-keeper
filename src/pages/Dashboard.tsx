import React, { useCallback } from 'react';

import PasswordSetup from '../components/PasswordSetup';
import AddWalletButton from '../components/AddWalletButton';
import WalletList from '../components/WalletList';
import PasswordChecker from '../components/PasswordChecker';
import ActiveWalletDisplay from '../components/ActiveWalletDisplay';

import {
  selectIsLoggedIn,
  selectHasPassword,
} from '../store/features/app/appSelectorts';
import { selectActiveAddress } from '../store/features/wallet/walletSelectors';
import { loginSuccess } from '../store/features/app/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Dashboard = React.memo(() => {
  const dispatch = useAppDispatch();

  const hasPassword = useAppSelector(selectHasPassword);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const activeAddress = useAppSelector(selectActiveAddress);

  const onPasswordCheckSuccess = useCallback(() => {
    dispatch(loginSuccess());
  }, [dispatch]);

  if (!hasPassword) {
    return <PasswordSetup />;
  }

  if (!isLoggedIn) {
    return (
      <PasswordChecker
        type="login"
        onPasswordCheckSuccess={onPasswordCheckSuccess}
        buttonText="Log in"
      />
    );
  }

  return (
    <div>
      <div className="mb-5">
        {activeAddress ? <ActiveWalletDisplay /> : <div>No wallet yet</div>}
      </div>

      <div className="mb-5">
        <AddWalletButton />
      </div>

      <WalletList />
    </div>
  );
});

export default Dashboard;
