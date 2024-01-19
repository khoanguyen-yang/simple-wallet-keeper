import { beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import store from 'store';
import { Address } from 'viem';

import App from './App';

import { renderWithProviders } from './tests/renderUtils';
import { walletController } from './features/WalletController';

describe('App', () => {
  beforeEach(() => {
    store.clearAll();
  });

  describe('password setup', () => {
    beforeEach(() => {
      renderWithProviders(<App />);
    });

    test('should render password setup', () => {
      expect(
        screen.getByText(
          'You are a new user. Please setup your wallet password'
        )
      ).toBeDefined();
    });

    test('new user should be able to setup password', async () => {
      const passwordInput = screen.getByTestId('password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      const submitButton = screen.getByText('Submit');

      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'password' },
      });
      fireEvent.click(submitButton);

      // succesful password setup, dashboard contents appear
      expect(screen.getByText('No wallet yet')).toBeDefined();
    });

    test('error on non-matching password setup', async () => {
      const passwordInput = screen.getByTestId('password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      const submitButton = screen.getByText('Submit');

      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'not match password' },
      });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Passwords do not match')).toBeDefined();
    });

    test('error on empty password input', async () => {
      const submitButton = screen.getByText('Submit');

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('You should input passwords')
      ).toBeDefined();
    });
  });

  describe('password login', () => {
    const password = 'password';
    const wrongPassword = 'wrongPassword';

    beforeEach(() => {
      walletController.setPassword(password);
      renderWithProviders(<App />, {
        preloadedState: {
          app: {
            hasPassword: true,
            loggedIn: false,
          },
          wallet: undefined,
        },
      });
    });

    test('should render password login', () => {
      expect(screen.getByText('Log in')).toBeDefined();
    });

    test('should be able to login with correct password', () => {
      const passwordInput = screen.getByTestId('password');
      const loginButton = screen.getByText('Log in');

      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(loginButton);

      // succesful login, dashboard contents appear
      expect(screen.getByText('No wallet yet')).toBeDefined();
    });

    test('should not be able to login with wrong password', async () => {
      const passwordInput = screen.getByTestId('password');
      const loginButton = screen.getByText('Log in');

      fireEvent.change(passwordInput, { target: { value: wrongPassword } });
      fireEvent.click(loginButton);

      expect(await screen.findByText('Incorrect password')).toBeDefined();
    });
  });

  describe('wallet management', () => {
    const password = 'password';

    beforeEach(() => {
      walletController.setPassword(password);
      renderWithProviders(<App />, {
        preloadedState: {
          app: {
            hasPassword: true,
            loggedIn: true,
          },
          wallet: undefined,
        },
      });
    });

    test('should be able to add wallet', () => {
      const addWalletButton = screen.getByText('Add wallet');

      fireEvent.click(addWalletButton);

      expect(screen.getByText(/Current active wallet:/)).toBeDefined();
      expect(screen.getByText('Show private key')).toBeDefined();
      expect(screen.getAllByTestId('wallet-item').length).toBe(1);
    });

    test('should be able to change active wallet', () => {
      const addWalletButton = screen.getByText('Add wallet');

      // fire 2 add wallet button clicks so that we will have 2 wallets in the list
      fireEvent.click(addWalletButton);
      fireEvent.click(addWalletButton);

      // since the first wallet will automatically set as the active wallet
      // here we will test clicking on wallet 2 to see if it changes the current active wallet
      const walletItem2 = screen.getAllByTestId('wallet-item')[1];
      const walletItem2Address = walletItem2.textContent ?? '';
      fireEvent.click(walletItem2);

      expect(
        screen.getByText(`Current active wallet: ${walletItem2Address}`)
      ).toBeDefined();
    });

    test('should be able to view wallet private key', () => {
      const addWalletButton = screen.getByText('Add wallet');
      fireEvent.click(addWalletButton);

      let showPrivateKeyButton = screen.getByText('Show private key');
      fireEvent.click(showPrivateKeyButton);

      const passwordInput = screen.getByTestId('password');
      fireEvent.change(passwordInput, { target: { value: password } });

      showPrivateKeyButton = screen.getByText('Show private key');
      fireEvent.click(showPrivateKeyButton);

      const activeWalletAddress = (screen
        .getByText(/Current active wallet:/)
        .textContent?.replace('Current active wallet: ', '') ?? '') as Address;

      expect(
        screen.getByText(
          `Private key: ${walletController.getPrivateKeyOfAddress(activeWalletAddress)}`
        )
      ).toBeDefined();
    });
  });
});
