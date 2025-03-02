import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from 'modules/users/users.service';
import { UserCredentials } from 'common/interfaces/user-credentials.interface';
import { ValidatedUser } from 'modules/auth/shared/interfaces/validated-user';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(input: UserCredentials) {
    const validatedUser = await this.validateUser(input);

    if (!validatedUser) {
      throw new BadRequestException('Bad user input');
    }

    return await this.signIn(validatedUser);
  }

  async validateUser(input: UserCredentials) {
    const user = await this.usersService.findUserByEmail(input.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return { userId: user.id, userRole: user.role };
  }

  async signIn(validatedUser: ValidatedUser) {
    const tokenPayload = {
      sub: validatedUser.userId,
      userRole: validatedUser.userRole,
    };

    const jwtToken = await this.jwtService.signAsync(tokenPayload);

    return { jwtToken };
  }

  async securePassword(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
