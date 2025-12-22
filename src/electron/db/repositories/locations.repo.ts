import { db } from '..';

export function getLocations() {
  return db.prepare('SELECT * FROM locations ORDER BY id DESC').all();
}

export function addLocation(name: string) {
  return db.prepare('INSERT INTO locations (name) VALUES (?)').run(name).lastInsertRowid;
}

export function deleteLocation(id: number) {
  return db.prepare('DELETE FROM locations WHERE id = ?').run(id);
}
