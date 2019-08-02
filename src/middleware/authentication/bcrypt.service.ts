import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async getHashForSecret(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async getHashPassword(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
