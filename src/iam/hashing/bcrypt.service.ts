import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(password: string | Buffer): Promise<string> {
    const salt = await genSalt();

    return hash(password, salt);
  }

  async compare(
    password: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
