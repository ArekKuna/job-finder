import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

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
}
