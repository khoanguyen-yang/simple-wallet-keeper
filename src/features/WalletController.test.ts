import { expect, test, describe, beforeEach } from 'vitest';
import store from 'store';

import WalletController from './WalletController';
import { generateRandomWallet } from '../utils/wallet';
import localStorage from '../utils/localStorage';

const WALLET_PASSWORD = '123';
const WRONG_WALLET_PASSWORD = '456';

describe('WalletController', () => {
  let walletController: WalletController;

  /**
   * Before each test
   *  1. clear all local storage data
   *  2. create new WalletController instance and set a password for it
   */
  beforeEach(() => {
    store.clearAll();

    walletController = new WalletController();
    walletController.setPassword(WALLET_PASSWORD);
  });

  test('WalletController.setPassword should work', () => {
    const tempPassword = 'tempPassword';
    walletController.setPassword(tempPassword);
    expect(walletController.checkPassword(tempPassword)).toBe(true);
  });

  test('add wallet results in wallet entry in WalletController and encrypted wallet data stored to local storage', () => {
    const wallet = generateRandomWallet();
    walletController.addWallet(wallet);

    expect(walletController.getPrivateKeyOfAddress(wallet.address)).eq(
      wallet.privateKey
    );
    expect(localStorage.getEncryptedWalletData()).not.toBe('');
  });

  describe('wallet data encryption', () => {
    describe('WalletController.checkPassword', () => {
      beforeEach(() => {
        walletController.addWallet(generateRandomWallet());
      });

      test('pass if provide correct password', () => {
        expect(walletController.checkPassword(WALLET_PASSWORD)).toBe(true);
      });

      test('fail if provide incorrect password', () => {
        expect(walletController.checkPassword(WRONG_WALLET_PASSWORD)).toBe(
          false
        );
      });
    });

    describe('WalletController hydration', () => {
      const wallets = [generateRandomWallet(), generateRandomWallet()];

      beforeEach(() => {
        // add wallet before reset the WalletController
        walletController.addWallet(wallets[0]);
        walletController.addWallet(wallets[1]);

        // reset WalletController
        walletController = new WalletController();
      });

      test('able to hydrate with correct password', () => {
        // walletController.checkPassword is triggered for internal wallet hydration
        walletController.checkPassword(WALLET_PASSWORD);

        expect(walletController.getPrivateKeyOfAddress(wallets[0].address)).eq(
          wallets[0].privateKey
        );
        expect(walletController.getPrivateKeyOfAddress(wallets[1].address)).eq(
          wallets[1].privateKey
        );
      });

      test('able to hydrate with correct password during login', () => {
        // walletController.checkPassword is triggered for internal wallet hydration
        walletController.checkPasswordLogin(WALLET_PASSWORD);

        expect(walletController.getPrivateKeyOfAddress(wallets[0].address)).eq(
          wallets[0].privateKey
        );
        expect(walletController.getPrivateKeyOfAddress(wallets[1].address)).eq(
          wallets[1].privateKey
        );
      });

      test('not able to hydrate with incorrect password', () => {
        // walletController.checkPassword is triggered for internal wallet hydration
        walletController.checkPassword(WRONG_WALLET_PASSWORD);

        expect(
          walletController.getPrivateKeyOfAddress(wallets[0].address)
        ).toBe('');
        expect(
          walletController.getPrivateKeyOfAddress(wallets[1].address)
        ).toBe('');
      });
    });
  });
});
