import { Injectable } from '@nestjs/common';
import { SignupDto } from 'src/iam/authentication/DTOs/signup.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class SignupService {
  constructor(
    private userService: UserService,
    private hashingService: HashingService,
  ) {}

  async signup(user: SignupDto) {
    const hashedPassword = await this.hashingService.hash(user.password);

    const newUser = this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }
}
