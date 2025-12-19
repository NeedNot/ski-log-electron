import Database from 'better-sqlite3';

export let db: Database.Database;

export function initDB(dbPath: string) {
  db = new Database(dbPath);

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL COLLATE NOCASE UNIQUE
    );

  `
  ).run();
}
