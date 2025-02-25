import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import { UserDto } from 'modules/users/dtos/user.dto';

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
