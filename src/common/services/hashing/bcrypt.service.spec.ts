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

  it('should hash a password', async () => {
    const password = 'password';
    const hashedPassword = await service.hash(password);
    expect(hashedPassword).not.toEqual(password);
  });

  it('should compare a password', async () => {
    const password = 'password';
    const hashedPassword = await service.hash(password);
    const isMatch = await service.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
