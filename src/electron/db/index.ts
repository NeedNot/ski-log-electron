import Sqlite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { Database } from './types';

export let db: Kysely<Database>;

export function initDB(dbPath: string) {
  const database = new Sqlite(dbPath);
  const dialect = new SqliteDialect({
    database: database,
  });
  db = new Kysely<Database>({
    dialect,
  });

  database.exec(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL COLLATE NOCASE UNIQUE
    );

    CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      best_pass TEXT NOT NULL,
      is_tournament INTEGER NOT NULL,
      comments TEXT,
      score FLOAT NOT NULL,
      passes TEXT NOT NULL,
      FOREIGN KEY (location_id) REFERENCES locations (id)
    );
  `);
}
