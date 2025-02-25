import { Exclude } from 'class-transformer';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
}
