import { Injectable, signal } from '@angular/core';
import { BoatSpeed, RopeLength, SkiPass } from '../../../types';
import { getRopeByIndex, getRopeIndex, makeid } from '../../../utils';

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
      id: makeid(6),
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

  deletePass(id: string) {
    this._passes.update((passes) => passes.filter((p) => p.id !== id));
  }

  movePassUp(id: string) {
    this._passes.update((passes) => {
      const index = passes.findIndex((p) => p.id === id);
      if (index <= 0) return passes;
      const [pass] = passes.splice(index, 1);
      passes.splice(index - 1, 0, pass);
      return passes;
    });
  }

  movePassDown(id: string) {
    this._passes.update((passes) => {
      const index = passes.findIndex((p) => p.id === id);
      if (index === -1 || index >= passes.length - 1) return passes;
      const [pass] = passes.splice(index, 1);
      passes.splice(index + 1, 0, pass);
      return passes;
    });
  }
}
