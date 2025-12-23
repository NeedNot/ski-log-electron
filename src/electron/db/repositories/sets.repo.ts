import { db } from '..';

export function addSet(
  locationId: number,
  date: string,
  setting: string,
  comments: string,
  score: number,
  passes: string
) {
  return db
    .prepare(
      'INSERT INTO sets (date, location_id, setting, comments, score, passes) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(date, locationId, setting, comments, score, passes).lastInsertRowid;
}

export function getSets(params?: { start: string; end: string }) {
  if (params?.start && params.end) {
    return db
      .prepare(`SELECT * FROM sets WHERE date BETWEEN ? AND ? ORDER BY id DESC`)
      .all(params.start, params.end);
  } else {
    return db.prepare(`SELECT * FROM sets ORDER BY id DESC`).all();
  }
}
