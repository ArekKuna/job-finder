import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCredentialsDto } from 'common/dtos/user-credentials.dto';
import { AuthService } from 'modules/auth/auth.service';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login user to the app' })
  @ApiBody({ type: UserCredentialsDto })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully logged in',
    type: UserAuthenticationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  logIn(
    @Body() body: UserCredentialsDto,
  ): Promise<UserAuthenticationResponseDto> {
    return this.authService.authenticateUser(body);
  }

  @Get('/authorize')
  @ApiOperation({ summary: 'Authorize user token' })
  @ApiResponse({
    status: 200,
    description: 'User authorized',
    type: UserAuthenticationResponseDto,
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
