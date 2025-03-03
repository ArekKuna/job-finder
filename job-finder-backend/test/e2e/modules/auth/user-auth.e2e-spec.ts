import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { AppModule } from 'app.module';
import { UserRole } from 'common/enums/user-role.enum';
import { User } from 'modules/users/user.entity';
import { TypeormDatabaseConnectionService } from 'common/database/typeorm-database-connection.service';
import { FailRequestBody } from 'e2e/shared/failed-request-body.interface';

describe('UserLogin', () => {
  let app: INestApplication<App>;
  let databaseConnectionService: TypeormDatabaseConnectionService;

  const route = '/auth/login';
  const existingUser: User = {
    email: 'john.doe@gmail.com',
    password: '$2b$10$oEtt4GYh7TCmMle3jqvjdeK5soOxjrhrCBIPim/mDSSMGyfN31rGa',
    id: '3d09c95b-6313-4bbc-acd1-474e55d11c94',
    role: UserRole.EMPLOYEE,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const password = 'StrongPassword12@';

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

  it('it should login an existing user', async () => {
    await databaseConnectionService.insert('users', existingUser);

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email: existingUser.email, password });

    const result = response.body as { jwtToken: string };

    expect(response.status).toBe(201);
    expect(result.jwtToken).toBeDefined();
    expect(typeof result.jwtToken).toBe('string');
  });

  it('it should fail to login user if email does not exist in database', async () => {
    const nonExistingEmail = 'johnDoe@gmail.com';

    await databaseConnectionService.insert('users', existingUser);

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email: nonExistingEmail, password });

    expect(response.status).toBe(400);
  });

  it('it should fail to login user if password does not match given email', async () => {
    const givenPassword = 'Strongpassword123@';

    await databaseConnectionService.insert('users', existingUser);

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email: existingUser.email, password: givenPassword });

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
      .send({ email: existingUser.email, password: tooShortPassowrd });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must be at least 8 characters long',
    );
  });

  it('it should fail if password does not contain lowercase character', async () => {
    const nonLowerCasePassword = 'DEGFHRIS!';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email: existingUser.email, password: nonLowerCasePassword });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must contain at least one lowercase character',
    );
  });

  it('it should fail if password does not contain uppercase character', async () => {
    const nonUpperCasePassword = 'sjdheurk!';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({ email: existingUser.email, password: nonUpperCasePassword });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must contain at least one uppercase character',
    );
  });

  it('it should fail if password does not contain special character', async () => {
    const nonSpecialCharacterPassword = 'sjdheurkASS';

    const response: request.Response = await request(app.getHttpServer())
      .post(route)
      .send({
        email: existingUser.email,
        password: nonSpecialCharacterPassword,
      });

    expect(response.status).toBe(400);
    expect((response.body as FailRequestBody).message).toContain(
      'Password must contain at least one special character',
    );
  });
});
