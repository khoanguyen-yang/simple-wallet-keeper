import { Address } from 'viem';

export type PrivateKey = `0x${string}`;
export interface Wallet {
  address: Address;
  privateKey: PrivateKey;
}
