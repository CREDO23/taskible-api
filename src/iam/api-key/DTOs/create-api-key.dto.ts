import { IsUUID } from 'class-validator';

export class CreateApiKeyDto {
  @IsUUID()
  uuid: string;
}
