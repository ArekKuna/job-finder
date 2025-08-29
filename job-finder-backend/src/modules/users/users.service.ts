import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'common/enums/user-role.enum';
import { AuthService } from 'modules/auth/auth.service';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';
import { RegisterEmployeeDto } from 'modules/users/dtos/register-emplyee.dto';
import { User } from 'modules/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signUpEmployee(
    input: RegisterEmployeeDto,
  ): Promise<UserAuthenticationResponseDto> {
    const { email, password } = input;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException();
    }

    const newEmployee = await this.createEmployee(input);

    await this.usersRepository.save(newEmployee);

    return await this.authService.authenticateUser({ email, password });
  }

  // async signUpEmployer(
  //   input: UserCredentialsDto,
  // ): Promise<UserAuthenticationResponseDto> {
  //   const { email, password } = input;

  //   const existingUser = await this.findUserByEmail(email);

  //   if (existingUser) {
  //     throw new BadRequestException();
  //   }

  //   const hashedPassword = await this.authService.securePassword(password);

  //   const newUser = this.usersRepository.create({
  //     email,
  //     password: hashedPassword,
  //     role: UserRole.EMPLOYER,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   });

  //   await this.usersRepository.save(newUser);

  //   return await this.authService.authenticateUser({ ...newUser, password });
  // }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(id: string, attrs: Partial<User>) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  private async createEmployee(user: RegisterEmployeeDto): Promise<User> {
    const hashedPassword = await this.authService.securePassword(user.password);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.EMPLOYEE,
    });

    return newUser;
  }
}
