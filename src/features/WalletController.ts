import { Address } from 'viem';

import { PrivateKey, Wallet } from '../constants/types';
import { decrypt, encrypt } from '../utils/crypto';
import localStorage from '../utils/localStorage';

interface Address2PrivateKey {
  [address: Address]: PrivateKey;
}

let walletController: WalletController;

class WalletController {
  private address2PrivateKey: Address2PrivateKey = {};
  private encryptedWalletData: string;
  private walletPassword: string = '';

  constructor() {
    this.encryptedWalletData = localStorage.getEncryptedWalletData();
  }

  tryDecryptWalletData(password: string): boolean {
    try {
      if (!this.encryptedWalletData) {
        return false;
      }

      const address2PrivateKey = JSON.parse(
        decrypt(this.encryptedWalletData, password)
      ) as Address2PrivateKey;
      this.address2PrivateKey = address2PrivateKey;

      return true;
    } catch {
      return false;
    }
  }

  updateWalletPassword(password: string) {
    this.walletPassword = password;
  }

  checkPassword(
    password: string,
    options?: { overridePassword?: boolean }
  ): boolean {
    const isDecryptSucessful = this.tryDecryptWalletData(password);

    if (isDecryptSucessful && options?.overridePassword) {
      this.updateWalletPassword(password);
    }

    return isDecryptSucessful;
  }

  encryptWalletData() {
    const encrypted = encrypt(
      JSON.stringify(this.address2PrivateKey),
      this.walletPassword
    );
    this.encryptedWalletData = encrypted;
    localStorage.storeEncryptedWalletData(encrypted);

    return encrypted;
  }

  addWallet(wallet: Wallet) {
    this.address2PrivateKey[wallet.address] = wallet.privateKey;
    this.encryptWalletData();
  }

  getPrivateKeyOfAddress(address: Address) {
    return this.address2PrivateKey[address] || '';
  }

  public static init() {
    if (!walletController) {
      walletController = new WalletController();
    }
  }
}

WalletController.init();

export { walletController };

export default WalletController;
