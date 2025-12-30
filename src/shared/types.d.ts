export type SetsQuery = {
  range?: {
    start: Date;
    end: Date;
  };
  page?: number;
};

export type SkiSetsResponse = {
  sets: SkiSet[];
  itemsPerPage: number;
  totalPages: number;
};
