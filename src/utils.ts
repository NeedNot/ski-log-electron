import { BoatSpeedLabel, RopeLengthLabel } from './constants';
import { BoatSpeed, RopeLength, SkiPass } from './types';

const ropeLengths = Object.values(RopeLength);
const boatSpeeds = Object.values(BoatSpeed);

export function getRopeIndex(rope: RopeLength) {
  return ropeLengths.findIndex((v) => v === rope);
}

export function getBoatSpeedIndex(boatSpeed: BoatSpeed) {
  return boatSpeeds.findIndex((v) => v === boatSpeed);
}

export function getRopeByIndex(index: number) {
  return ropeLengths[index];
}

export function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function moveUp(arr: any[], i: number) {
  if (i <= 0 || i >= arr.length) return arr;

  arr.splice(i - 1, 0, arr.splice(i, 1)[0]);
  return arr;
}

export function moveDown(arr: any[], i: number) {
  if (i < 0 || i >= arr.length - 1) return arr;

  arr.splice(i + 1, 0, arr.splice(i, 1)[0]);
  return arr;
}

export function calculatePassScore(pass: SkiPass, isTournament: boolean) {
  // todo calculate tournament score
  if (pass.points === 0) return 0;
  const ropeLength = getRopeIndex(RopeLength[pass.ropeLength as keyof typeof RopeLength]);
  const speed = getBoatSpeedIndex(BoatSpeed[pass.boatSpeed as keyof typeof BoatSpeed]);
  const difficulty = speed + ropeLength; //starts at 0 so it's actually the previous pass difficulty
  return 6 * difficulty + pass.points; //previous pass + current pass points
}

export function calculatePassTitle(pass: SkiPass) {
  //todo use user's max speed to not show speed
  return `${pass.points} @ ${BoatSpeedLabel[pass.boatSpeed]} ${RopeLengthLabel[pass.ropeLength]}`;
}
