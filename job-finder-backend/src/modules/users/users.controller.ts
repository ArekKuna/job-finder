import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';
import { UserCredentialsDto } from 'common/dtos/user-credentials.dto';
import { GetMeResponseDto } from 'modules/users/dtos/get-me-response.dto';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { UserId } from 'common/decorators/user-id.decorator';
import { instanceToPlain } from 'class-transformer';
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

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get logged in user data' })
  @ApiResponse({
    status: 200,
    description: 'User data sent correctly',
    type: GetMeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'User not authorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getMe(@UserId() id: string): Promise<Record<string, any> | null> {
    const user = await this.usersService.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return instanceToPlain(user);
  }
}
