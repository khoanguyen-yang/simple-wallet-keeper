import { describe, expect, test } from 'vitest';

import reducer, {
  addWallet,
  changeActiveAddress,
  initialState,
} from './walletSlice';
import { generateRandomWallet } from '../../../utils/wallet';

describe('[redux] walletSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should handle addWallet properly', () => {
    const wallet = generateRandomWallet();
    const state1 = {
      activeAddress: wallet.address,
      wallets: [wallet.address],
    };
    expect(reducer(undefined, addWallet(wallet))).toEqual(state1);

    const wallet2 = generateRandomWallet();
    expect(reducer(state1, addWallet(wallet2))).toEqual({
      activeAddress: wallet.address,
      wallets: [wallet.address, wallet2.address],
    });
  });

  test('should handle changeActiveAddress properly', () => {
    const address = '0x33e374A77F70F3b51f51Ac2c394316E171363364';
    expect(
      reducer(undefined, changeActiveAddress(address)).activeAddress
    ).toEqual(address);
  });
});
