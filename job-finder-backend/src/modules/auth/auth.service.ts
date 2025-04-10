import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from 'modules/users/users.service';
import { UserAuthenticationResponseDto } from 'modules/auth/dtos/user-authentication-response.dto';
import { ValidatedUser } from 'modules/auth/interfaces/validated-user';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';
import { UserCredentialsDto } from 'common/dtos/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(
    input: UserCredentialsDto,
  ): Promise<UserAuthenticationResponseDto> {
    const validatedUser = await this.validateUser(input);

    if (!validatedUser) {
      throw new BadRequestException();
    }

    return await this.signIn(validatedUser);
  }

  async validateUser(input: UserCredentialsDto): Promise<ValidatedUser> {
    const user = await this.usersService.findUserByEmail(input.email);

    if (!user) {
      throw new BadRequestException();
    }

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException();
    }

    return { userId: user.id, userRole: user.role };
  }

  async signIn(
    validatedUser: ValidatedUser,
  ): Promise<UserAuthenticationResponseDto> {
    const tokenPayload = {
      sub: validatedUser.userId,
      userRole: validatedUser.userRole,
    };

    const jwtToken = await this.jwtService.signAsync(tokenPayload, {
      algorithm: 'HS256',
    });

    return { jwtToken };
  }

  authorizeUser(authHeader: string) {
    const [, jwt] = authHeader.split(' ');

    const decoded = this.jwtService.verify<JwtPayload>(jwt, {
      algorithms: ['HS256'],
    });

    if (!decoded) {
      throw new UnauthorizedException();
    }

    return { authorized: true };
  }

  async securePassword(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
