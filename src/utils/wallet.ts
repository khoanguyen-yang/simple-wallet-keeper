import {
  Address,
  generatePrivateKey,
  privateKeyToAddress,
} from 'viem/accounts';
import { PrivateKey } from '../constants/types';

export const generateRandomWallet = (): {
  address: Address;
  privateKey: PrivateKey;
} => {
  const privateKey = generatePrivateKey();
  const address = privateKeyToAddress(privateKey);

  return {
    address,
    privateKey,
  };
};
