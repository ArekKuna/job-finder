import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'common/enums/user-role.enum';

export class AuthUserResponseDto {
  @ApiProperty({ description: 'User id' })
  id: string;

  @ApiProperty({ description: 'User role' })
  role: UserRole;
}
