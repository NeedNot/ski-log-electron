import { db } from '..';
import type { SetsQuery } from '../../../shared/types';

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

export function getSets({ page, range }: SetsQuery): any[] {
  const safePage = Number.isInteger(page) && page! >= 0 ? page! : 0;
  const startDate = normalizeDate(range?.start);
  const endDate = normalizeDate(range?.end);

  let where = '';
  const params: any[] = [];
  if (startDate && endDate) {
    where = `WHERE date >= ? and date <= ?`;
    params.push(startDate, endDate);
  }
  params.push(safePage * 100);

  return db
    .prepare(
      `
      SELECT *
      FROM sets
      ${where}
      ORDER BY date DESC, id DESC
      LIMIT 100 OFFSET ?
    `
    )
    .all(...params);
}

function normalizeDate(value: unknown): string | null {
  if (!value) return null;

  const d = new Date(value as any);
  if (Number.isNaN(d.getTime())) return null;

  // Use ISO string so lexical ordering works correctly
  return d.toISOString();
}
