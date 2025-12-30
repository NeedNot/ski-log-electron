import { ColumnType, Generated, Insertable, JSONColumnType, Selectable, Updateable } from 'kysely';

export interface Database {
  locations: LocationsTable;
  sets: SetsTable;
}

export interface LocationsTable {
  id: Generated<number>;
  name: string;
}

export interface SetsTable {
  id: Generated<number>;
  location_id: number;
  date: string;
  best_pass: string;
  is_tournament: number;
  comments: ColumnType<string | undefined>;
  score: number;
  passes: string;
}

export type Location = Selectable<LocationsTable>;
export type NewLocation = Insertable<LocationsTable>;
export type LocationUpdate = Updateable<LocationsTable>;

export type Set = Selectable<SetsTable>;
export type NewSet = Insertable<SetsTable>;
export type SetUpdate = Updateable<SetsTable>;
