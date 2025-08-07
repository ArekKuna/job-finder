import { ApiProperty } from '@nestjs/swagger';

export class BooleanResponseDto {
  @ApiProperty({ description: 'Response result' })
  success: boolean;
}
