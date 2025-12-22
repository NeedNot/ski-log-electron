import { db } from '..';

export function addSet(
  locationId: number,
  date: string,
  setting: string,
  comments: string,
  score: number
) {
  return db
    .prepare(
      'INSERT INTO sets (date, location_id, setting, comments, score) VALUES (?, ?, ?, ?, ?)'
    )
    .run(date, locationId, setting, comments, score).lastInsertRowid;
}

export function getSets() {
  return db.prepare('SELECT * FROM sets ORDER BY id DESC').all();
}
