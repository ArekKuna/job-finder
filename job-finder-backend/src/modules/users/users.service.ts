import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'modules/users/users.entity';
import { AuthService } from 'modules/auth/auth.service';
import { UserCredentials } from 'common/interfaces/user-credentials.interface';
import { UserRole } from 'common/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signUpEmployee(input: UserCredentials) {
    const { email, password } = input;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Bad user input');
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
      throw new BadRequestException('Bad user input');
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

  async findUserByEmail(email: string): Promise<Users | null> {
    const user = this.usersRepository.findOneBy({ email });

    return user;
  }
}
