import { SelectQueryBuilder } from 'kysely';
import { db } from '..';
import type { SetsQuery } from '../../../shared/types';
import { Database, NewSet } from '../types';

const ITEMS_PER_PAGE = 100;

export function addSet(newSet: NewSet) {
  return db.insertInto('sets').values(newSet).returning('id').executeTakeFirst();
}

export async function getSets(query: SetsQuery) {
  const { page } = query;
  const safePage = Number.isInteger(page) && page! >= 0 ? page! : 0;

  let selectQuery = db.selectFrom('sets').selectAll();
  selectQuery = queryParams(selectQuery, query);

  if (query.sorting) {
    for (const { id, desc } of query.sorting) {
      selectQuery = selectQuery.orderBy(id as any, desc ? 'desc' : 'asc');
    }
  } else {
    selectQuery = selectQuery.orderBy('date', 'desc').orderBy('id', 'desc');
  }

  const items = selectQuery.limit(ITEMS_PER_PAGE).offset(safePage * ITEMS_PER_PAGE);

  return items.execute();
}

export async function getSetsMeta(query: SetsQuery) {
  let selectQuery = db.selectFrom('sets').select((eb) => [eb.fn.count('id').as('count')]);
  selectQuery = queryParams(selectQuery, query);

  const res = await selectQuery.executeTakeFirst();
  const count = Number(res?.count ?? 0);
  return {
    itemsPerPage: ITEMS_PER_PAGE,
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
  };
}

function queryParams(selectQuery: SelectQueryBuilder<Database, any, any>, query: SetsQuery) {
  const { range } = query;
  const startDate = normalizeDate(range?.start);
  const endDate = normalizeDate(range?.end);

  if (startDate && endDate) {
    selectQuery = selectQuery.where('date', '>=', startDate).where('date', '<=', endDate);
  }

  return selectQuery;
}

function normalizeDate(value: unknown): string | null {
  if (!value) return null;

  const d = new Date(value as any);
  if (Number.isNaN(d.getTime())) return null;

  // Use ISO string so lexical ordering works correctly
  return d.toISOString();
}
