import { UserRole } from 'common/enums/user-role.enum';

export interface UserValidationResult {
  userId: string;
  email: string;
  role: UserRole;
}
