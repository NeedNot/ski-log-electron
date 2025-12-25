import * as repo from '../../db/repositories/sets.repo';
import { NewSet } from './sets.types';

export function listSets() {
  return repo.getSets().map((set) => ({
    ...set,
    locationId: set.location_id,
    isTournament: set.is_tournament === 1,
    passes: JSON.parse(set.passes),
    date: new Date(set.date),
  }));
}

export function createSet({ locationId, date, isTournament, comments, score, passes }: NewSet) {
  return repo.addSet(locationId, date, isTournament ? 1 : 0, comments, score, passes);
}
