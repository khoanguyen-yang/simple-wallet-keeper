import { createListenerMiddleware } from '@reduxjs/toolkit';

import { addWallet } from '../features/wallet/walletSlice';
import { walletController } from '../../features/WalletController';

export const listenerMiddleware = createListenerMiddleware();

/**
 * Add wallet to WalletController on every addWallet action
 */
listenerMiddleware.startListening({
  actionCreator: addWallet,
  effect: async (action) => {
    walletController.addWallet(action.payload);
  },
});
