import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export const selectActiveAddress = createSelector(
  (state: RootState) => state,
  (state) => state.wallet.activeAddress
);

export const selectWallets = createSelector(
  (state: RootState) => state,
  (state) => state.wallet.wallets
);
