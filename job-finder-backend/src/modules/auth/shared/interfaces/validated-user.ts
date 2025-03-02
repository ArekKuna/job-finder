import { UserRole } from 'common/enums/user-role.enum';

export interface ValidatedUser {
  userId: string;
  userRole: UserRole;
}
