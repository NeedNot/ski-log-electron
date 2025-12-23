import Database from 'better-sqlite3';

export let db: Database.Database;

export function initDB(dbPath: string) {
  db = new Database(dbPath);

  db.exec(`
  CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL COLLATE NOCASE UNIQUE
  );

  CREATE TABLE IF NOT EXISTS sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    setting TEXT NOT NULL,
    comments TEXT,
    score FLOAT NOT NULL,
    passes TEXT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations (id)
  );
`);
}
