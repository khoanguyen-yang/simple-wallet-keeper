import { http, createConfig } from 'wagmi';
import { sepolia, bscTestnet } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [sepolia, bscTestnet],
  transports: {
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
});
