import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserCredentials } from 'src/common/interfaces/user-credentials.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signUpEmployee(input: UserCredentials) {
    const { email, password } = input;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Invalid data');
    }

    const hashedPassword = await this.authService.securePassword(
      input.password,
    );

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.EMPLOYEE,
    });

    await this.usersRepository.save(newUser);

    return await this.authService.authenticateUser({ ...newUser, password });
  }

  async signUpEmployer(input: UserCredentials) {
    const { email, password } = input;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Invalid data');
    }

    const hashedPassword = await this.authService.securePassword(password);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.EMPLOYER,
    });

    await this.usersRepository.save(newUser);

    return await this.authService.authenticateUser({ ...newUser, password });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.usersRepository.findOneBy({ email });

    return user;
  }
}
