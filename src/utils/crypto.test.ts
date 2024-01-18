import { describe, expect, test } from 'vitest';
import { decrypt, encrypt } from './crypto';

describe('crypto utils', () => {
  test('encryption and decryption should work', () => {
    const data = 'data';
    const password = 'password';

    const encrypted = encrypt(data, password);
    const decrypted = decrypt(encrypted, password);

    expect(decrypted).eq(data);
  });
});
