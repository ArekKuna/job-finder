import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterEmployeeDto {
  @ApiProperty({ description: 'User first name' })
  @IsString()
  @MinLength(1, { message: 'First name is required' })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  @MinLength(1, { message: 'Last name is required' })
  lastName: string;

  @ApiProperty({ description: 'User e-mail' })
  @IsEmail()
  @MinLength(1, { message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase character',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase character',
  })
  @Matches(/[\W_]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @ApiProperty({ description: 'User phone number' })
  @IsString()
  @MinLength(1, { message: 'Phone number is required' })
  phoneNumber: string;

  @ApiProperty({ description: 'User location' })
  @IsString()
  @MinLength(1, { message: 'Location is required' })
  location: string;

  @ApiProperty({ description: 'User professional title' })
  @IsString()
  @MinLength(1, { message: 'Professional title is required' })
  professionalTitle: string;

  @ApiProperty({
    description: 'User short description',
    type: String,
    required: false,
    nullable: true,
    default: null,
  })
  @IsString()
  @IsOptional()
  description: string | null;
}
