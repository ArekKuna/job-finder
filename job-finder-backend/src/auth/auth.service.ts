import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare, genSalt, hash } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid data');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid data');
    }

    return instanceToPlain(user);
  }

  async securePassword(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
