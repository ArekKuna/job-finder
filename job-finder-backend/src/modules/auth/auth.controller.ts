import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'modules/auth/auth.service';
import { UserDto } from 'modules/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  logIn(@Body() body: UserDto) {
    return this.authService.authenticateUser(body);
  }
}
