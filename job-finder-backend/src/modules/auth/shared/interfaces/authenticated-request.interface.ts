import { Request } from 'express';
import { Users } from 'modules/users/users.entity';

export interface AuthenticatedRequest extends Request {
  user?: Partial<Users>;
}
