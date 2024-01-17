import AES from 'crypto-js/aes';
import Utf8Enc from 'crypto-js/enc-utf8';

export const encrypt = (data: string, password: string) => {
  return AES.encrypt(data, password).toString();
};

export const decrypt = (encryptedData: string, password: string) => {
  return AES.decrypt(encryptedData, password).toString(Utf8Enc);
};
