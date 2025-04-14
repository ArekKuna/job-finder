import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadUserAvatarDto {
  @ApiProperty({
    description: 'User ID (UUID)',
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  userId: string;
}
