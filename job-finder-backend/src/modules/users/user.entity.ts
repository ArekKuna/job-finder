import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'common/enums/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose({ name: 'firstName' })
  @Column({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'lastName' })
  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Expose({ name: 'phoneNumber' })
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  location: string;

  @Expose({ name: 'professionalTitle' })
  @Column({ name: 'professional_title' })
  professionalTitle: string;

  @Column()
  @Column({ type: 'varchar', nullable: true, default: null })
  bio: string | null;

  @Exclude()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole;

  @Expose({ name: 'avatarUrl' })
  @Column({
    name: 'avatar_url',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  avatarUrl: string | null;

  @Expose({ name: 'createdAt' })
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updatedAt' })
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
