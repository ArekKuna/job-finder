import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'modules/auth/shared/interfaces/authenticated-request.interface';
import { JwtPayload } from 'modules/auth/shared/interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token);

    if (!tokenPayload) {
      throw new UnauthorizedException();
    }

    request.user = {
      id: tokenPayload.sub,
      role: tokenPayload.role,
    };

    return true;
  }
}
