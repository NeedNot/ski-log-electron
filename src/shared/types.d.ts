export type SetsQuery = {
  range?: {
    start: Date;
    end: Date;
  };
  page?: number;
  sorting?: {
    id: string;
    desc: boolean;
  }[];
};

export type SkiSetsResponse = {
  sets: SkiSet[];
  itemsPerPage: number;
  totalPages: number;
};
