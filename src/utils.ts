import { RopeLength } from './types';

const ropeLengths = Object.values(RopeLength);

export function getRopeIndex(rope: RopeLength) {
  return ropeLengths.findIndex((v) => v === rope);
}

export function getRopeByIndex(index: number) {
  return ropeLengths[index];
}
