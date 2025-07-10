import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SignupService } from './signup.service';
import { SigninDto } from './DTOs/signin.dto';
import { SignupDto } from './DTOs/signup.dto';
import { AuthTypeEnum } from './enums/auth-types.enums';
import { RefreshTokenDto } from './DTOs/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private signinService: SigninService,
    private signupService: SignupService,
  ) {}

  @Auth(AuthTypeEnum.None)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() userData: SigninDto) {
    return this.signinService.signin(userData);

    // If you want to use cookies
    // const accessToken = await this.signinService.signin(userData);

    // response.cookie('access_token', accessToken, {
    //   httpOnly: true,
    //   sameSite: true,
    //   secure: true,
    // });
  }

  @Auth(AuthTypeEnum.None)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() data: RefreshTokenDto) {
    return this.signinService.refreshTokens(data);
  }

  @Auth(AuthTypeEnum.None)
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() userData: SignupDto) {
    return this.signupService.signup(userData);
  }
}
