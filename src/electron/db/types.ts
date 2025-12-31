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
  best_index: number;
  best_score: number;
  is_tournament: number;
  comments: ColumnType<string | undefined>;
  score: number;
  passes: string;
  opening_pass: number;
}

export type Location = Selectable<LocationsTable>;
export type NewLocation = Insertable<LocationsTable>;
export type LocationUpdate = Updateable<LocationsTable>;

export type SetRow = Selectable<SetsTable>;
export type NewSet = Insertable<SetsTable>;
export type SetUpdate = Updateable<SetsTable>;
