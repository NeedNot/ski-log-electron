import * as repo from '../../db/repositories/sets.repo';
import { NewSet } from './sets.types';

export function listSets() {
  return repo.getSets();
}

export function createSet({ locationId, date, setting, comments, score }: NewSet) {
  repo.addSet(locationId, date, setting, comments, score);
}
