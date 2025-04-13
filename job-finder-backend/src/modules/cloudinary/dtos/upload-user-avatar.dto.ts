import { ApiProperty } from '@nestjs/swagger';

export class UploadUserAvatarDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Avatar file to upload',
  })
  file: any;
}
