import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CompanySize } from 'modules/users/enums/company-size.enum';

export class RegisterEmployerDto {
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

  @ApiProperty({ description: 'User company name' })
  @IsString()
  @MinLength(1, { message: 'Company name is required' })
  companyName: string;

  @ApiProperty({
    description: 'User company size',
    enum: CompanySize,
    example: CompanySize.SMALL,
  })
  @IsEnum(CompanySize, {
    message: 'Company size must be one of the defined values',
  })
  companySize: CompanySize;

  @ApiProperty({ description: 'User company main industry' })
  @IsString()
  @MinLength(1, { message: 'Company industry is required' })
  industry: string;

  @ApiProperty({ description: 'User company main website address' })
  @IsString()
  @MinLength(1, { message: 'Company website address is required' })
  companyWebsite: string;

  @ApiProperty({ description: 'User phone number' })
  @IsString()
  @MinLength(1, { message: 'Phone number is required' })
  phoneNumber: string;

  @ApiProperty({ description: 'User company location' })
  @IsString()
  @MinLength(1, { message: 'Company location is required' })
  location: string;

  @ApiProperty({
    description: 'User company description',
    type: String,
    required: false,
    nullable: true,
    default: null,
  })
  @IsString()
  @IsOptional()
  description: string | null;
}
