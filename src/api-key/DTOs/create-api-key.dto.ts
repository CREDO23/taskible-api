import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateApiKeyDto {
  @IsUUID()
  @ApiProperty({
    description: 'The uuid of the user to create an api key for',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;
}
