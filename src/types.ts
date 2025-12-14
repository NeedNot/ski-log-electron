export enum BoatSpeed {
  MPH_15 = 'MPH_15',
  MPH_17 = 'MPH_17',
  MPH_19 = 'MPH_19',
  MPH_21 = 'MPH_21',
  MPH_23 = 'MPH_23',
  MPH_25 = 'MPH_25', //todo could be 24mph
  MPH_26 = 'MPH_26',
  MPH_28 = 'MPH_28',
  MPH_30 = 'MPH_30',
  MPH_32 = 'MPH_32',
  MPH_34 = 'MPH_34',
  MPH_36 = 'MPH_36',
}

export enum RopeLength {
  L_0_OFF = 'L_0_OFF',
  L_15_OFF = 'L_15_OFF',
  L_22_OFF = 'L_22_OFF',
  L_28_OFF = 'L_28_OFF',
  L_32_OFF = 'L_32_OFF',
  L_35_OFF = 'L_35_OFF',
  L_38_OFF = 'L_38_OFF',
  L_39_OFF = 'L_39_OFF',
  L_41_OFF = 'L_41_OFF',
  L_43_OFF = 'L_43_OFF',
  L_44_OFF = 'L_44_OFF',
  L_45_OFF = 'L_45_OFF',
}

export enum SetType {
  PRACTICE = 'Practice',
  TOURNAMENT = 'Tournament',
}

export type SkiSet = {
  id: string;
  date: string;
  locationId: string;
  type: SetType;
};

export type SkiPass = {
  id: string;
  setId: string;
  speed: BoatSpeed;
  ropeLength: RopeLength;
  score: Number;
};
