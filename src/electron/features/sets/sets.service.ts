import * as repo from '../../db/repositories/sets.repo';
import type { SetsQuery, SkiSetsResponse } from '../../../shared/types';
import { NewSet } from '../../db/types';

export async function listSets(query: SetsQuery): Promise<SkiSetsResponse> {
  const [sets, meta] = await Promise.all([repo.getSets(query), repo.getSetsMeta(query)]);
  return {
    ...meta,
    sets: sets.map((set) => ({
      ...set,
      locationId: set.location_id,
      bestIndex: set.best_index,
      isTournament: set.is_tournament === 1,
      passes: JSON.parse(set.passes),
      date: new Date(set.date),
    })),
  };
}

export function createSet(newSet: NewSet) {
  return repo.addSet(newSet);
}
