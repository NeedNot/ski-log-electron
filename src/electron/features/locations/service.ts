import * as repo from '../../db/repositories/locations.repo';

export function listLocations() {
  return repo.getLocations();
}

export function createLocation(name: string) {
  if (!name.trim()) throw new Error('Invalid name');
  return repo.addLocation(name);
}

export function deleteLocation(id: number) {
  return repo.deleteLocation(id);
}
