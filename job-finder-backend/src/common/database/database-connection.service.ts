export interface DatabaseConnectionService {
  insert(tableName: string, object: object): Promise<void>;
  truncateTable(tableNames: string[]): Promise<void>;
  closeConnection(): Promise<void>;
}
