import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiKeyService } from './api-keys.service';
import { CreateApiKeyDto } from './DTOs/create-api-key.dto';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { AuthenticationType } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthenticationTypeEnum } from 'src/iam/authentication/enums/auth-types.enums';
import { ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @AuthenticationType(AuthenticationTypeEnum.Bearer)
  @HttpCode(HttpStatus.CREATED)
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async createApiKey(
    @Body() createApiKeyDto: CreateApiKeyDto,
    @ActiveUser('sub') userId: number,
  ) {
    const { uuid } = createApiKeyDto;

    return this.apiKeyService.createApiKey(uuid, userId);
  }

  @Get('/me')
  @AuthenticationType(AuthenticationTypeEnum.Bearer)
  @HttpCode(HttpStatus.OK)
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getMyApiKeys(@ActiveUser('sub') userId: number) {
    return this.apiKeyService.getApiKeysByUserId(userId);
  }
}
