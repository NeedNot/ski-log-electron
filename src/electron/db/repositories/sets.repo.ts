import { db } from '..';
import type { SetsQuery } from '../../../shared/types';
import { NewSet } from '../types';

const ITEMS_PER_PAGE = 100;

export function addSet(newSet: NewSet) {
  return db.insertInto('sets').values(newSet).returning('id').executeTakeFirst();
}

export async function getSets({ page, range }: SetsQuery) {
  const safePage = Number.isInteger(page) && page! >= 0 ? page! : 0;
  const startDate = normalizeDate(range?.start);
  const endDate = normalizeDate(range?.end);

  let dbQuery = db.selectFrom('sets').selectAll();
  if (startDate && endDate) {
    dbQuery = dbQuery.where('date', '>=', startDate).where('date', '<=', endDate);
  }
  const items = dbQuery
    .orderBy('date', 'desc')
    .orderBy('id', 'desc')
    .limit(ITEMS_PER_PAGE)
    .offset(safePage * ITEMS_PER_PAGE);

  return items.execute();
}

export async function getSetsMeta({ range }: SetsQuery) {
  const startDate = normalizeDate(range?.start);
  const endDate = normalizeDate(range?.end);

  let dbQuery = db.selectFrom('sets').select((eb) => [eb.fn.count('id').as('count')]);
  if (startDate && endDate) {
    dbQuery = dbQuery.where('date', '>=', startDate).where('date', '<=', endDate);
  }

  const res = await dbQuery.executeTakeFirst();
  const count = Number(res ?? 0);
  return {
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
  };
}

function normalizeDate(value: unknown): string | null {
  if (!value) return null;

  const d = new Date(value as any);
  if (Number.isNaN(d.getTime())) return null;

  // Use ISO string so lexical ordering works correctly
  return d.toISOString();
}
