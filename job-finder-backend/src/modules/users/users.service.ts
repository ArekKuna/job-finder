import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'modules/users/user.entity';
import { AuthService } from 'modules/auth/auth.service';
import { UserRole } from 'common/enums/user-role.enum';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';
import { UserCredentialsDto } from 'common/dtos/user-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signUpEmployee(
    input: UserCredentialsDto,
  ): Promise<UserAuthenticationResponseDto> {
    const { email, password } = input;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await this.authService.securePassword(
      input.password,
    );

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.EMPLOYEE,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.usersRepository.save(newUser);

    return await this.authService.authenticateUser({ ...newUser, password });
  }

  async signUpEmployer(
    input: UserCredentialsDto,
  ): Promise<UserAuthenticationResponseDto> {
    const { email, password } = input;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await this.authService.securePassword(password);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.EMPLOYER,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.usersRepository.save(newUser);

    return await this.authService.authenticateUser({ ...newUser, password });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
