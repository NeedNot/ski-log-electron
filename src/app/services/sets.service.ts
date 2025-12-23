import { Injectable } from '@angular/core';
import { getBoatSpeedIndex, getRopeIndex } from '../../utils';
import { BoatSpeed, RopeLength, SetSetting, SkiPass } from '../../types';
import { BehaviorSubject } from 'rxjs';
import { SkiSet } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  private monthSetsSubject = new BehaviorSubject<SkiSet[]>([]);
  monthSets$ = this.monthSetsSubject.asObservable();

  async addSet(set: {
    locationId: number;
    date: string;
    setting: string;
    comments: string;
    passes: Omit<SkiPass, 'id'>[];
  }) {
    // todo do tournament scoring

    let maxScore = 0;
    for (const pass of set.passes) {
      const ropeLength = getRopeIndex(RopeLength[pass.ropeLength as keyof typeof RopeLength]);
      const speed = getBoatSpeedIndex(BoatSpeed[pass.boatSpeed as keyof typeof BoatSpeed]);
      const difficulty = speed + ropeLength; //starts at 0 so it's actually the previous pass difficulty
      maxScore = Math.max(6 * difficulty + pass.points, maxScore); //previous pass + current pass points
    }
    const id = await (window as any).api.sets.add({
      ...set,
      score: maxScore,
      passes: JSON.stringify(set.passes),
    });
    this.monthSetsSubject.next([
      {
        ...set,
        id,
        score: maxScore,
        setting: SetSetting[set.setting as keyof typeof SetSetting],
        passes: set.passes.map((p, i) => ({ ...p, id: i })),
      },
      ...this.monthSetsSubject.value,
    ]);
  }

  async loadMonthSets() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    const sets = (await (window as any).api.sets.list({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    })) as any[];
    this.monthSetsSubject.next(sets.map((set) => ({ ...set, passes: JSON.parse(set.passes) })));
  }
}
