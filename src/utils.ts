import { BoatSpeed, RopeLength } from './types';

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
