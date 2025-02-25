import { UserRole } from 'src/common/enums/user-role.enum';

export interface UserValidationResult {
  userId: string;
  email: string;
  role: UserRole;
}
