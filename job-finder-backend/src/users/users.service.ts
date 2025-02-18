import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'src/common/value-object/user-role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signUpEmployee(email: string, password: string) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Invalid data');
    }

    const hashedPassword = await this.authService.securePassword(password);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.EMPLOYEE,
    });

    await this.usersRepository.save(newUser);

    return instanceToPlain(newUser);
  }

  async signUpEmployer(email: string, password: string) {
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

    return instanceToPlain(newUser);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.usersRepository.findOneBy({ email });

    return user;
  }
}
