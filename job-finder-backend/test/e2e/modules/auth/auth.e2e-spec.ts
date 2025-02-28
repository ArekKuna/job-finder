import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import * as request from 'supertest';
import { AppModule } from 'app.module';
import { UserRole } from 'common/enums/user-role.enum';
import { Users } from 'modules/users/users.entity';
import { TypeormDatabaseConnectionService } from 'common/database/typeorm-database-connection.service';

describe('UsersAuthorization', () => {
  let app: INestApplication<App>;
  let databaseConnectionService: TypeormDatabaseConnectionService;
  const email = 'kuna.arek@gmail.com';
  const password = 'PiesPluto12@';
  const userId = 'fd40cba5-8f97-4afe-be1d-bd951163183f';
  const hashedPassword =
    '$2b$10$Q5cpo5SoA9X0jV8PTMdzZ.i3jiZKUElP9LY0hCBHBbfhmywtb/B1C';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    databaseConnectionService = app.get(TypeormDatabaseConnectionService);

    await databaseConnectionService.truncateTable(['users']);

    await app.init();
  });

  afterAll(async () => {
    await databaseConnectionService.closeConnection();
    await app.close();
  });

  it('it should create employer user from given credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/employer/signup')
      .send({ email, password });

    const result = response.body as {
      jwtToken: string;
      email: string;
      userId: string;
      role: UserRole;
    };

    expect(result).toBeDefined();
    expect(result).toMatchObject({
      jwtToken: result.jwtToken,
      email,
      userId: result.userId,
      role: UserRole.EMPLOYER,
    });
  });

  it('it should fail if email exist in database', async () => {
    const existingUser: Users = {
      email,
      password: hashedPassword,
      id: userId,
      role: UserRole.EMPLOYER,
    };

    await databaseConnectionService.insert('users', existingUser);

    const response: request.Response = await request(app.getHttpServer())
      .post('/users/employer/signup')
      .send({ email, password });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      statusCode: 400,
      message: 'Bad user input',
      error: 'Bad Request',
    });
  });
});
