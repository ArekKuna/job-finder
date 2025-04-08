import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ description: 'User JWT token' })
  jwtToken: string;
}
