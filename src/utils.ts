import { RopeLength } from './types';

const ropeLengths = Object.values(RopeLength);

export function getRopeIndex(rope: RopeLength) {
  return ropeLengths.findIndex((v) => v === rope);
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
