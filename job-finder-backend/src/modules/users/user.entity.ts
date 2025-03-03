import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'common/enums/user-role.enum';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Exclude()
  @Column()
  password: string;
}
