import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';
import { UserCredentialsDto } from 'common/dtos/user-credentials.dto';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/employee/signup')
  @ApiOperation({ summary: 'Create a new employee user' })
  @ApiBody({ type: UserCredentialsDto })
  @ApiResponse({
    status: 201,
    description: 'Employee user has been successfully created',
    type: UserAuthenticationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  async createEmployee(
    @Body() body: UserCredentialsDto,
  ): Promise<UserAuthenticationResponseDto> {
    return await this.usersService.signUpEmployee(body);
  }

  @Post('/employer/signup')
  @ApiOperation({ summary: 'Create a new employer user' })
  @ApiBody({ type: UserCredentialsDto })
  @ApiResponse({
    status: 201,
    description: 'Employer user has been successfully created',
    type: UserAuthenticationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  async createEmployer(@Body() body: UserCredentialsDto) {
    return await this.usersService.signUpEmployer(body);
  }
}
