import { Injectable } from '@angular/core';
import { getBoatSpeedIndex, getRopeIndex } from '../../utils';
import { BoatSpeed, RopeLength, SetSetting } from '../../types';
import { BehaviorSubject } from 'rxjs';
import { SkiSet } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  private setsSubject = new BehaviorSubject<SkiSet[]>([]);
  sets$ = this.setsSubject.asObservable();

  async addSet(set: {
    locationId: number;
    date: string;
    setting: string;
    comments: string;
    passes: { ropeLength: string; boatSpeed: string; comments: string; points: number }[];
  }) {
    // todo do tournament scoring

    let maxScore = 0;
    for (const pass of set.passes) {
      const ropeLength = getRopeIndex(RopeLength[pass.ropeLength as keyof typeof RopeLength]);
      const speed = getBoatSpeedIndex(BoatSpeed[pass.boatSpeed as keyof typeof BoatSpeed]);
      const difficulty = speed + ropeLength; //starts at 0 so it's actually the previous pass difficulty
      maxScore = Math.max(6 * difficulty + pass.points, maxScore); //previous pass + current pass points
    }
    const id = await (window as any).api.sets.add({ ...set, score: maxScore });
    this.setsSubject.next([
      {
        ...set,
        id,
        score: maxScore,
        setting: SetSetting[set.setting as keyof typeof SetSetting],
        passes: [],
      },
      ...this.setsSubject.value,
    ]);
  }

  async loadSets() {
    const sets = await (window as any).api.sets.list();
    this.setsSubject.next(sets);
  }
}
