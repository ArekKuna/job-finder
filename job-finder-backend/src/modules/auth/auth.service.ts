import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { UsersService } from 'modules/users/users.service';
import { UserCredentials } from 'common/interfaces/user-credentials.interface';
import { UserValidationResult } from 'modules/auth/shared/interfaces/validation-result.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(input: UserCredentials) {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('');
    }

    return await this.signIn(user);
  }

  async validateUser(
    input: UserCredentials,
  ): Promise<UserValidationResult | null> {
    const user = await this.usersService.findUserByEmail(input.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { email, role } = user;

    return { email, userId: user.id, role };
  }

  async signIn(validatedUser: UserValidationResult) {
    const tokenPayload = {
      sub: validatedUser.userId,
      email: validatedUser.email,
      role: validatedUser.role,
    };

    const jwtToken = await this.jwtService.signAsync(tokenPayload);

    return { jwtToken, ...instanceToPlain(validatedUser) };
  }

  async securePassword(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
