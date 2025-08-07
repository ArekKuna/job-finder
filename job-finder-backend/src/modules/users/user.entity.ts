import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'common/enums/user-role.enum';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole;

  @Expose({ name: 'avatarUrl' })
  @Column({ type: 'varchar', nullable: true })
  avatar_url: string | null;

  @Expose({ name: 'createdAt' })
  @Column()
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  @Column()
  updated_at: Date;
}
