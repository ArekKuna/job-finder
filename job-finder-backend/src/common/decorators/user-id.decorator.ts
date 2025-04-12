import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const jwtService = new JwtService();

    const request = context.switchToHttp().getRequest<Request>();

    const authHeaders = request.headers['authorization'] as string;

    if (!authHeaders) {
      return new UnauthorizedException();
    }

    const [, jwtToken] = authHeaders.split(' ');

    if (!jwtToken) {
      return new UnauthorizedException();
    }

    const decodedToken = jwtService.decode<JwtPayload>(jwtToken);

    return decodedToken.sub;
  },
);
