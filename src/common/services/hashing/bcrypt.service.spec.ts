import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should hash a string', async () => {
    const plainString = 'password';
    const hashedString = await service.hash(plainString);
    expect(hashedString).not.toEqual(plainString);
  });

  describe('Should compare two strings', () => {
    it('should return true if the strings match', async () => {
      const plainString = 'password';
      const hashedString = await service.hash(plainString);
      const isMatch = await service.compare(plainString, hashedString);
      expect(isMatch).toBe(true);
    });

    it('should return false if the strings do not match', async () => {
      const plainString = 'password';
      const hashedString = await service.hash(plainString);
      const isMatch = await service.compare('wrongPassword', hashedString);
      expect(isMatch).toBe(false);
    });
  });
});
