import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/iam/authorization/decorators/role.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
