import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'common/enums/user-role.enum';
import { CompanySize } from 'modules/users/enums/company-size.enum';
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

  @Expose({ name: 'companyName' })
  @Column({
    name: 'company_name',
    type: String,
    nullable: true,
    default: null,
  })
  companyName: string | null;

  @Expose({ name: 'companySize' })
  @Column({
    name: 'company_size',
    type: 'enum',
    enum: CompanySize,
    nullable: true,
    default: null,
  })
  companySize: CompanySize | null;

  @Column({
    name: 'industry',
    type: String,
    nullable: true,
    default: null,
  })
  industry: string | null;

  @Expose({ name: 'companyWebsite' })
  @Column({
    name: 'company_website',
    type: String,
    nullable: true,
    default: null,
  })
  companyWebsite: string | null;

  @Expose({ name: 'phoneNumber' })
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  location: string;

  @Expose({ name: 'professionalTitle' })
  @Column({
    name: 'professional_title',
    type: String,
    nullable: true,
    default: null,
  })
  professionalTitle: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  description: string | null;

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
