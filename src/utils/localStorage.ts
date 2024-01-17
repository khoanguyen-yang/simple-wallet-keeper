import store from 'store';

export const LOCAL_STORAGE_KEYS = {
  ENCRYPTED_WALLET_DATA: 'ENCRYPTED_WALLET_DATA',
};

export const storeEncryptedWalletData = (data: string) => {
  store.set(LOCAL_STORAGE_KEYS.ENCRYPTED_WALLET_DATA, data);
};

export const getEncryptedWalletData = () => {
  return store.get(LOCAL_STORAGE_KEYS.ENCRYPTED_WALLET_DATA);
};

export default {
  storeEncryptedWalletData,
  getEncryptedWalletData,
};
