import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { AppModule } from 'app.module';
import { UserRole } from 'common/enums/user-role.enum';
import { User } from 'modules/users/user.entity';
import { TypeormDatabaseConnectionService } from 'common/database/typeorm-database-connection.service';
import { FailRequestBody } from 'e2e/shared/failed-request-body.interface';

describe('EmployeeSignup', () => {
  let app: INestApplication<App>;
  let databaseConnectionService: TypeormDatabaseConnectionService;

  const route = '/users/employee/signup';
  const email = 'john.doe@gmail.com';
  const password = 'StrongPassword123!';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    databaseConnectionService = await app.get(TypeormDatabaseConnectionService);

    await databaseConnectionService.truncateTable(['users']);
  });

  afterEach(async () => {
    await databaseConnectionService.closeConnection();
  });

  afterAll(async () => {
    await app.close();
  });

  it('it should create an employee from given credentials', async () => {
    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email, password });

    const result = response.body as {
      jwtToken: string;
    };

    expect(response.status).toBe(201);
    expect(result.jwtToken).toBeDefined();
    expect(typeof result.jwtToken).toBe('string');
  });

  it('it should fail if email exist in database', async () => {
    const userId = 'fd40cba5-8f97-4afe-be1d-bd951163183f';
    const hashedPassword =
      '$2b$10$Q5cpo5SoA9X0jV8PTMdzZ.i3jiZKUElP9LY0hCBHBbfhmywtb/B1C';

    const existingUser: User = {
      email,
      password: hashedPassword,
      id: userId,
      role: UserRole.EMPLOYEE,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await databaseConnectionService.insert('users', existingUser);

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email, password });

    expect(response.status).toBe(400);
  });

  it('it should fail if email is not in correct email format', async () => {
    const nonEmailFormat = 'johnDoe123.com';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email: nonEmailFormat, password });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'email must be an email',
    );
  });

  it('it should fail if password is too short', async () => {
    const tooShortPassowrd = 'dcfD1!';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email, password: tooShortPassowrd });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must be at least 8 characters long',
    );
  });

  it('it should fail if password does not contain lowercase character', async () => {
    const nonLowerCasePassword = 'DEGFHRIS!';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email, password: nonLowerCasePassword });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must contain at least one lowercase character',
    );
  });

  it('it should fail if password does not contain uppercase character', async () => {
    const nonUpperCasePassword = 'sjdheurk!';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email, password: nonUpperCasePassword });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must contain at least one uppercase character',
    );
  });

  it('it should fail if password does not contain special character', async () => {
    const nonSpecialCharacterPassword = 'sjdheurkASS';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email, password: nonSpecialCharacterPassword });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must contain at least one special character',
    );
  });
});
