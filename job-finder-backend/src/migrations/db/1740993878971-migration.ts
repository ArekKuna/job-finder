import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1740956670526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TYPE role_enum AS ENUM ('EMPLOYEE', 'EMPLOYER');

        CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR NOT NULL UNIQUE,
          password VARCHAR NOT NULL,
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
      `);
  }
}
