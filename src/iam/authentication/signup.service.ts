import { Inject, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/iam/authentication/DTOs/signup.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignupService {
  constructor(
    private userService: UserService,
    private hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
