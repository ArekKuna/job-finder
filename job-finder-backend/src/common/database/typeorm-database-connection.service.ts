import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { DatabaseConnectionService } from 'common/database/database-connection.service';

@Injectable()
export class TypeormDatabaseConnectionService
  implements DatabaseConnectionService
{
  constructor(private entityManager: EntityManager) {}

  async insert(tableName: string, object: object): Promise<void> {
    await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(tableName)
      .values(object)
      .execute();
  }

  async truncateTable(tableNames: string[]): Promise<void> {
    for (const table of tableNames) {
      await this.entityManager.query(
        `TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`,
      );
    }
  }

  async closeConnection(): Promise<void> {
    await this.entityManager.connection.destroy();
  }

  createQueryBuilder(): SelectQueryBuilder<any> {
    return this.entityManager.connection.createQueryBuilder();
  }

  getEntityManager(): EntityManager {
    return this.entityManager;
  }
}
