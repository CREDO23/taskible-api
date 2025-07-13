import { Reflector } from '@nestjs/core';
import { AuthenticationTypeEnum } from '../enums/auth-types.enums';
import { AuthenticationType } from './auth.decorator';
import { AUTHENTICATION_TYPE } from '../constant';

describe('AuthenticationType Decorator', () => {
  const reflector = new Reflector();

  it('should set metadata on the method', () => {
    class TestController {
      @AuthenticationType(AuthenticationTypeEnum.ApiKey)
      someHandler() {}
    }

    const metadata = reflector.get<AuthenticationTypeEnum[]>(
      AUTHENTICATION_TYPE,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      TestController.prototype.someHandler,
    );

    expect(metadata[0]).toBe(AuthenticationTypeEnum.ApiKey);
  });

  it('should set metadata on the class if applied at class level', () => {
    @AuthenticationType(AuthenticationTypeEnum.Bearer)
    class TestController {}

    const metadata = reflector.get<AuthenticationTypeEnum[]>(
      AUTHENTICATION_TYPE,
      TestController,
    );

    expect(metadata[0]).toBe(AuthenticationTypeEnum.Bearer);
  });
});
