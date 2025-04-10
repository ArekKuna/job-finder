import { ApiProperty } from '@nestjs/swagger';

export class UserAuthenticationResponseDto {
  @ApiProperty({ description: 'User JWT token' })
  jwtToken: string;
}
