import { db } from '..';
import { NewLocation } from '../types';

export function getLocations() {
  return db.selectFrom('locations').selectAll().orderBy('id', 'desc').execute();
}

export function addLocation(location: NewLocation) {
  return db.insertInto('locations').values(location).returning('id').executeTakeFirst();
}

export function deleteLocation(id: number) {
  return db.deleteFrom('locations').where('locations.id', '=', id).execute();
}
