import { Injectable, signal } from '@angular/core';
import { BoatSpeed, RopeLength, SkiPass } from '../../../types';
import { getRopeByIndex, getRopeIndex } from '../../../utils';

@Injectable()
export class NewSetStore {
  private readonly _passes = signal<SkiPass[]>([]);
  readonly passes = this._passes.asReadonly();

  passById(id: string) {
    return this.passes().find((pass) => pass.id === id);
  }

  addPass() {
    const lastPass = this.passes().at(-1);
    const didRunLastPass = lastPass?.score === 6;
    const ropeLengthIndex = lastPass ? getRopeIndex(lastPass.ropeLength) : -1;

    const pass: SkiPass = {
      id: `new-${this.passes().length + 1}`,
      ropeLength: didRunLastPass
        ? getRopeByIndex(ropeLengthIndex + 1)
        : lastPass?.ropeLength ?? RopeLength.L_15_OFF,
      speed: lastPass?.speed ?? BoatSpeed.MPH_36,
      score: 0,
      setId: 'other',
    };

    this._passes.set([...this._passes(), pass]);
  }

  updatePass(id: string, changes: Partial<SkiPass>) {
    this._passes.update((passes) => passes.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }
}
