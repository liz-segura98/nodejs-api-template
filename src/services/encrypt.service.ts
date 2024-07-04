
import * as CryptoJS from 'crypto-js';
import { config } from '../config';
import { BadRequestError } from '../shared/errors';

export class EncryptService {
  public encrypt(txt: string): string {
    try {
      const secretKey: string = config.hash.password;
      return CryptoJS.AES.encrypt(txt, secretKey).toString();
    } catch (e) {
      throw new BadRequestError({ message: 'Error en encriptado' });
    }
  }

  public decrypt(txtToDecrypt: string) {
    try {
      const secretKey: string = config.hash.password;
      return CryptoJS.AES.decrypt(txtToDecrypt, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      throw new BadRequestError({ message: 'Error en encriptado' });
    }
  }
}

export const userService = new EncryptService()