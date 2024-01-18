import { beforeEach, describe, expect, test } from 'vitest';
import store from 'store';

import localStorage from './localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    store.clearAll();
  });

  test('store and retrieve encrypted wallet data should work', () => {
    const data = new Date().toISOString(); // random data

    localStorage.storeEncryptedWalletData(data);
    const storedData = localStorage.getEncryptedWalletData();

    expect(storedData).eq(data);
  });
});
