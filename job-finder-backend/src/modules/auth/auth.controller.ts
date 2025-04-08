import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'modules/auth/auth.service';
import { AuthUserResponseDto } from 'modules/auth/dtos/auth-user-response.dto';
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
    status: 200,
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

  @Get('/authorize')
  @ApiOperation({ summary: 'Authorize user token' })
  @ApiResponse({
    status: 200,
    description: 'User authorized',
    type: AuthUserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'User not authorized',
  })
  authorizeUser(@Req() request: Request) {
    const authHeader = request.headers['authorization'] as string;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    return this.authService.authorizeUser(authHeader);
  }
}
