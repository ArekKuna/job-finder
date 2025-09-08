import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1740956670526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TYPE role_enum AS ENUM ('EMPLOYEE', 'EMPLOYER');
        
        CREATE TYPE company_size_enum AS ENUM ('MIKRO', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE', 'CORPORATE');

        CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          first_name VARCHAR NOT NULL,
          last_name VARCHAR NOT NULL,
          email VARCHAR NOT NULL UNIQUE,
          password VARCHAR NOT NULL,
          company_name VARCHAR DEFAULT NULL,
          company_size company_size_enum DEFAULT NULL,
          industry VARCHAR DEFAULT NULL,
          company_website VARCHAR DEFAULT NULL,
          phone_number VARCHAR NOT NULL,
          location VARCHAR NOT NULL,
          professional_title VARCHAR DEFAULT NULL,
          description VARCHAR DEFAULT NULL,
          avatar_url VARCHAR DEFAULT NULL,
          role role_enum NOT NULL DEFAULT 'EMPLOYEE',
          created_at TIMESTAMP NOT NULL,
          updated_at TIMESTAMP NOT NULL
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS users;

        DROP TYPE IF EXISTS role_enum;

        DROP TYPE IF EXISTS company_size;
      `);
  }
}
