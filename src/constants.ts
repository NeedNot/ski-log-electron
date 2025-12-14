import { BoatSpeed, RopeLength } from './types';

export const RopeLengthLabel: Record<RopeLength, string> = {
  [RopeLength.L_0_OFF]: 'Long line',
  [RopeLength.L_15_OFF]: "15' off",
  [RopeLength.L_22_OFF]: "22' off",
  [RopeLength.L_28_OFF]: "28' off",
  [RopeLength.L_32_OFF]: "32' off",
  [RopeLength.L_35_OFF]: "35' off",
  [RopeLength.L_38_OFF]: "38' off",
  [RopeLength.L_39_OFF]: "39.5' off",
  [RopeLength.L_41_OFF]: "41' off",
  [RopeLength.L_43_OFF]: "43' off",
  [RopeLength.L_44_OFF]: "44' off",
  [RopeLength.L_45_OFF]: "45' off",
};

export const RopeLengthColors: Record<RopeLength, string> = {
  [RopeLength.L_0_OFF]: 'bg-neutral-50 text-neutral-500 border-neutral-50',
  [RopeLength.L_15_OFF]: 'bg-red-50 text-red-500 border-red-500',
  [RopeLength.L_22_OFF]: 'bg-orange-50 text-orange-500 border-orange-500',
  [RopeLength.L_28_OFF]: 'bg-yellow-50 text-yellow-500 border-yellow-500',
  [RopeLength.L_32_OFF]: 'bg-green-50 text-green-500 border-green-500',
  [RopeLength.L_35_OFF]: 'bg-blue-50 text-blue-500 border-blue-500',
  [RopeLength.L_38_OFF]: 'bg-violet-50 text-violet-500 border-violet-500',
  [RopeLength.L_39_OFF]: 'bg-neutral-50 text-neutral-500 border-neutral-50',
  [RopeLength.L_41_OFF]: 'bg-pink-50 text-pink-500 border-pink-500',
  [RopeLength.L_43_OFF]: 'bg-neutral-900 text-neutral-50 border-neutral-900',
  [RopeLength.L_44_OFF]: 'bg-red-50 text-red-500 border-red-500',
  [RopeLength.L_45_OFF]: 'bg-neutral-50 text-neutral-500 border-neutral-50',
};

export const BoatSpeedLabel: Record<BoatSpeed, string> = {
  [BoatSpeed.MPH_15]: '15 mph',
  [BoatSpeed.MPH_17]: '17 mph',
  [BoatSpeed.MPH_19]: '19 mph',
  [BoatSpeed.MPH_21]: '21 mph',
  [BoatSpeed.MPH_23]: '23 mph',
  [BoatSpeed.MPH_25]: '25 mph',
  [BoatSpeed.MPH_26]: '26 mph',
  [BoatSpeed.MPH_28]: '28 mph',
  [BoatSpeed.MPH_30]: '30 mph',
  [BoatSpeed.MPH_32]: '32 mph',
  [BoatSpeed.MPH_34]: '34 mph',
  [BoatSpeed.MPH_36]: '36 mph',
};
