import { Injectable } from '@angular/core';
import { calculatePassScore } from '../../utils';
import { SkiPass } from '../../types';
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
    date: Date;
    isTournament: boolean;
    comments: string;
    passes: SkiPass[];
  }) {
    let maxScore = 0;
    for (const pass of set.passes) {
      maxScore = Math.max(calculatePassScore(pass, set.isTournament), maxScore);
    }
    const id = await (window as any).api.sets.add({
      ...set,
      score: maxScore,
      date: set.date.toISOString(),
      passes: JSON.stringify(set.passes),
    });
    this.monthSetsSubject.next([
      {
        ...set,
        id,
        score: maxScore,
        passes: set.passes,
      },
      ...this.monthSetsSubject.value,
    ]);
  }

  async loadMonthSets() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    const sets = (await (window as any).api.sets.list({
      start: start.toISOString(),
      end: end.toISOString(),
    })) as any[];
    this.monthSetsSubject.next(sets);
  }
}
