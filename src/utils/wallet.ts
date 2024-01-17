import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts';

export const generateRandomWallet = () => {
  const privateKey = generatePrivateKey();
  const address = privateKeyToAddress(privateKey);

  return {
    address,
    privateKey,
  };
};
