import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'modules/auth/auth.service';
import { LoginUserResponseDto } from 'modules/auth/dtos/login-user-response.dto';
import { UserDto } from 'modules/users/dtos/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login user to the app' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully logged in',
    type: LoginUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  logIn(@Body() body: UserDto): Promise<LoginUserResponseDto> {
    return this.authService.authenticateUser(body);
  }
}
