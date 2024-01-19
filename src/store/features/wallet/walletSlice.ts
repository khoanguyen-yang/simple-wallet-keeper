import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Address } from 'viem';

import { Wallet } from '../../../constants/types';

export interface WalletState {
  activeAddress: Address | null;
  wallets: Address[];
}

export const initialState: WalletState = {
  activeAddress: null,
  wallets: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<Wallet>) => {
      if (!state.activeAddress) {
        state.activeAddress = action.payload.address;
      }
      state.wallets.push(action.payload.address);
    },
    changeActiveAddress: (state, action: PayloadAction<Address>) => {
      state.activeAddress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWallet, changeActiveAddress } = walletSlice.actions;

export default walletSlice.reducer;
