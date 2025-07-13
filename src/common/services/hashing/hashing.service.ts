import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(plantText: string | Buffer): Promise<string>;

  abstract compare(
    plantText: string | Buffer,
    hashedText: string,
  ): Promise<boolean>;
}
