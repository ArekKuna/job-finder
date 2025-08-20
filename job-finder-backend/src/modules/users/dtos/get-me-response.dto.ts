import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'common/enums/user-role.enum';

export class GetMeResponseDto {
  @ApiProperty({ description: 'User id' })
  id: string;

  @ApiProperty({ description: 'User e-mail' })
  email: string;

  @ApiProperty({ description: 'User role' })
  role: UserRole;

  @ApiProperty({ description: 'User avatar image reference', nullable: true })
  avatarUrl?: string;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  updatedAt: Date;
}
