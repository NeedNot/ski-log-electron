import { db } from '..';

export function addSet(
  locationId: number,
  date: string,
  isTournament: number,
  comments: string,
  score: number,
  passes: string
) {
  return db
    .prepare(
      'INSERT INTO sets (date, location_id, is_tournament, comments, score, passes) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(date, locationId, isTournament, comments, score, passes).lastInsertRowid;
}

export function getSets(params?: { start: string; end: string }): any[] {
  if (params?.start && params.end) {
    return db
      .prepare(`SELECT * FROM sets WHERE date BETWEEN ? AND ? ORDER BY date DESC, id DESC`)
      .all(params.start, params.end);
  } else {
    return db.prepare(`SELECT * FROM sets ORDER BY date DESC, id DESC`).all();
  }
}
