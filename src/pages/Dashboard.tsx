import React, { useCallback } from 'react';

import PasswordSetup from '../components/PasswordSetup';
import AddWalletButton from '../components/AddWalletButton';
import WalletList from '../components/WalletList';

import {
  selectIsLoggedIn,
  selectHasPassword,
} from '../store/features/app/appSelectorts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import PasswordChecker from '../components/PasswordChecker';
import { selectActiveAddress } from '../store/features/wallet/walletSelectors';
import { wagmiConfig } from '../wagmiConfig';
import NativeBalance from '../components/NativeBalance';
import { loginSuccess } from '../store/features/app/appSlice';
import PrivateKeyDisplay from '../components/PrivateKeyDisplay';

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
      {activeAddress ? (
        <>
          <div>Current active wallet: {activeAddress}</div>
          {wagmiConfig.chains.map((chain) => (
            <NativeBalance key={chain.id} chain={chain} />
          ))}
          <div>
            <PrivateKeyDisplay key={activeAddress} />
          </div>
        </>
      ) : (
        <div>No wallet yet</div>
      )}
      <AddWalletButton />
      <WalletList />
    </div>
  );
});

export default Dashboard;
