import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import { UserDto } from 'modules/users/dtos/user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from 'modules/users/dtos/create-user-response.dto';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/employee/signup')
  @ApiOperation({ summary: 'Create a new employee user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'Employee user has been successfully created',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  async createEmployee(@Body() body: UserDto): Promise<CreateUserResponseDto> {
    const user = await this.usersService.signUpEmployee(body);

    return user;
  }

  @Post('/employer/signup')
  @ApiOperation({ summary: 'Create a new employer user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'Employer user has been successfully created',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad user input',
  })
  async createEmployer(@Body() body: UserDto) {
    const user = await this.usersService.signUpEmployer(body);

    return user;
  }
}
