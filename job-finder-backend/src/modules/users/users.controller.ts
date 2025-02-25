import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/employee/signup')
  async createEmployee(@Body() body: UserDto) {
    const user = await this.usersService.signUpEmployee(body);

    return user;
  }

  @Post('/employer/signup')
  async createEmployer(@Body() body: UserDto) {
    const user = await this.usersService.signUpEmployer(body);

    return user;
  }
}
