import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { UserId } from 'common/decorators/user-id.decorator';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { GetMeResponseDto } from 'modules/users/dtos/get-me-response.dto';
import { RegisterEmployerDto } from 'modules/users/dtos/register-employer.dto';
import { RegisterEmployeeDto } from 'modules/users/dtos/register-emplyee.dto';
import { UsersService } from 'modules/users/users.service';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register/employee')
  @ApiOperation({ summary: 'Create a new employee user' })
  @ApiBody({ type: RegisterEmployeeDto })
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
    @Body() body: RegisterEmployeeDto,
  ): Promise<UserAuthenticationResponseDto> {
    return await this.usersService.signUpEmployee(body);
  }

  @Post('register/employer')
  @ApiOperation({ summary: 'Create a new employer user' })
  @ApiBody({ type: RegisterEmployerDto })
  @ApiResponse({
    status: 201,
    description: 'Employer user has been successfully created',
    type: UserAuthenticationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  async createEmployer(@Body() body: RegisterEmployerDto) {
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
