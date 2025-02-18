import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/auth/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/employee/signup')
  async createEmployee(@Body() body: UserDto) {
    const user = await this.usersService.signUpEmployee(
      body.email,
      body.password,
    );

    return user;
  }

  @Post('/employer/signup')
  async createEmployer(@Body() body: UserDto) {
    const user = await this.usersService.signUpEmployer(
      body.email,
      body.password,
    );

    return user;
  }
}
