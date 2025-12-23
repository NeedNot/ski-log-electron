import * as repo from '../../db/repositories/sets.repo';
import { NewSet } from './sets.types';

export function listSets(params?: { start: string; end: string }) {
  return repo.getSets(params);
}

export function createSet({ locationId, date, setting, comments, score, passes }: NewSet) {
  return repo.addSet(locationId, date, setting, comments, score, passes);
}
