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

    CREATE TABLE IF NOT EXISTS "sets" (
      "id"	INTEGER,
      "location_id"	INTEGER NOT NULL,
      "date"	TEXT NOT NULL,
      "is_tournament"	INTEGER NOT NULL DEFAULT 0,
      "comments"	TEXT,
      "score"	REAL NOT NULL,
      "passes"	TEXT NOT NULL,
      "best_index"	INTEGER NOT NULL DEFAULT 0,
      "best_score"	REAL NOT NULL DEFAULT 0,
      "opening_pass"	REAL NOT NULL DEFAULT 0,
      PRIMARY KEY("id" AUTOINCREMENT),
      FOREIGN KEY("location_id") REFERENCES "locations"("id")
    );
  `);
}
