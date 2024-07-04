import * as CryptoJS from 'crypto-js';
import { config } from '../../config'

const { secretKey, secretIv } = config.encrypt;

export const unhash = (data: string) => {
  return CryptoJS.AES.decrypt(data, secretKey, { iv: secretIv as any }).toString(CryptoJS.enc.Utf8);
}

export const hash = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey, { iv: secretIv as any }).toString();
}