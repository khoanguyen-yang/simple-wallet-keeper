import { Address } from 'viem';

import { decrypt, encrypt } from '../utils/crypto';
import localStorage from '../utils/localStorage';
import { PrivateKey, Wallet } from '../constants/types';

interface Address2PrivateKey {
  [address: Address]: PrivateKey;
}

let walletController: WalletController;

class WalletController {
  private address2PrivateKey: Address2PrivateKey = {};
  private encryptedWalletData: string;
  private password: string = '';

  constructor() {
    this.encryptedWalletData = localStorage.getEncryptedWalletData();
  }

  /**
   * Encrypt wallet data using wallet password
   */
  private encryptWalletData() {
    const encrypted = encrypt(
      JSON.stringify(this.address2PrivateKey),
      this.password
    );

    this.encryptedWalletData = encrypted;
    localStorage.storeEncryptedWalletData(encrypted);

    return encrypted;
  }

  /**
   * Try decrypting the encrypted wallet using the provided password
   * Cache the decrypted data locally if decryption succeeds
   */
  private tryDecryptWalletData(password: string): boolean {
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

  /**
   * Set new password for the wallet
   * And thus the encrypted wallet data must be encrypted with the new password
   */
  setPassword(password: string) {
    this.password = password;
    this.encryptWalletData();
  }

  /**
   * Check if a password is valid or not by trying to decrypt the wallet data
   */
  checkPassword(
    password: string,
    options?: { setPassword?: boolean }
  ): boolean {
    const isDecryptSucessful = this.tryDecryptWalletData(password);

    if (isDecryptSucessful && options?.setPassword) {
      this.setPassword(password);
    }

    return isDecryptSucessful;
  }

  /**
   * When checking password during login, it is important to have setPassword option to be true
   * This is because password needs to be cached locally for future data encryption
   */
  checkPasswordLogin(password: string) {
    return this.checkPassword(password, { setPassword: true });
  }

  addWallet(wallet: Wallet) {
    this.address2PrivateKey[wallet.address] = wallet.privateKey;
    this.encryptWalletData();
  }

  getPrivateKeyOfAddress(address: Address) {
    return this.address2PrivateKey[address] || '';
  }

  static init() {
    if (!walletController) {
      walletController = new WalletController();
    }
  }
}

WalletController.init();

export { walletController };

export default WalletController;
